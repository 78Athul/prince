import { NextRequest, NextResponse } from 'next/server'
import getStripe from '@/utils/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { cartItems, customerName, customerEmail, shippingAddress } = body

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }
    if (!customerName || !customerEmail) {
      return NextResponse.json({ error: 'Customer info required' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: cartItems.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.printSizeLabel
              ? `${item.title} — ${item.printSizeLabel}`
              : item.title,
            images: item.imageUrl ? [item.imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        customer_name: customerName,
        // Stripe metadata values max 500 chars; keep shipping compact
        shipping_address: JSON.stringify(shippingAddress).slice(0, 499),
        cart_items: JSON.stringify(
          cartItems.map((i: any) => ({
            id: i.id,
            print_size_id: i.printSizeId || null,
            qty: i.quantity,
            price: i.price,
            title: i.title.slice(0, 40),
          }))
        ).slice(0, 499),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe session error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
