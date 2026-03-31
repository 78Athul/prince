import { NextRequest, NextResponse } from 'next/server'
import getStripe from '@/utils/stripe'
import { createServiceClient } from '@/utils/supabase/service'
import { getResend } from '@/utils/resend'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing webhook secret or signature' }, { status: 400 })
  }

  const stripe = getStripe()
  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    console.error('Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const meta = session.metadata || {}

    try {
      const supabase = createServiceClient()
      const cartItems: any[] = JSON.parse(meta.cart_items || '[]')
      const shippingAddress = JSON.parse(meta.shipping_address || '{}')

      for (const item of cartItems) {
        await supabase.from('orders').insert({
          customer_name: meta.customer_name,
          customer_email: session.customer_email,
          print_id: item.id || null,
          print_size_id: item.print_size_id || null,
          shipping_address: shippingAddress,
          status: 'pending',
          stripe_payment_intent_id: session.payment_intent,
          total_amount: item.price * item.qty,
        })
      }

      // Send confirmation email if Resend is configured
      if (process.env.RESEND_API_KEY && session.customer_email) {
        await getResend().emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: session.customer_email,
          subject: 'Order Confirmed — Gallery Print Shop',
          html: buildOrderEmail(
            meta.customer_name,
            cartItems,
            shippingAddress,
            (session.amount_total || 0) / 100
          ),
        })
      }
    } catch (err) {
      console.error('Order creation failed:', err)
      return NextResponse.json({ error: 'Order creation failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

function buildOrderEmail(
  name: string,
  items: any[],
  shipping: any,
  total: number
): string {
  const rows = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(221,229,220,0.1)">${i.title}</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(221,229,220,0.1);text-align:right">$${(i.price * i.qty).toFixed(2)}</td>
        </tr>`
    )
    .join('')

  const addr = shipping
    ? `${shipping.line1 || ''}${shipping.line2 ? ', ' + shipping.line2 : ''}<br>
       ${shipping.city || ''}, ${shipping.state || ''} ${shipping.postal_code || ''}<br>
       ${shipping.country || ''}`
    : 'Not provided'

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0e1510;color:#dde5dc;padding:48px 40px">
      <h1 style="font-size:28px;letter-spacing:6px;text-transform:uppercase;margin:0 0 8px">ORDER CONFIRMED</h1>
      <p style="color:#aeccd1;margin:0 0 40px;letter-spacing:1px">Thank you, ${name}. Your print is being prepared.</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:0">${rows}</table>
      <div style="text-align:right;padding:16px 0;font-size:18px;border-top:1px solid rgba(221,229,220,0.2);margin-bottom:40px">
        Total: <strong>$${total.toFixed(2)}</strong>
      </div>
      <div style="background:rgba(221,229,220,0.05);padding:20px;margin-bottom:40px">
        <p style="margin:0 0 8px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#aeccd1">SHIPPING TO</p>
        <p style="margin:0;line-height:1.8">${addr}</p>
      </div>
      <p style="color:rgba(221,229,220,0.3);font-size:12px;letter-spacing:1px">Gallery Print Shop — Museum Grade Fine Art Prints</p>
    </div>
  `
}
