import { createClient } from '@/utils/supabase/server'
import { markOrderFulfilled } from './actions'

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      prints ( title, cloudinary_url ),
      print_sizes ( size_label, price )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-4xl uppercase tracking-widest text-[#bbcac6] mb-2">Orders</h1>
      <p className="font-label text-[10px] uppercase tracking-widest text-white/30 mb-12">
        {orders?.length ?? 0} total
      </p>

      {error && <p className="text-red-400 font-body text-sm mb-8">Error: {error.message}</p>}

      {!orders || orders.length === 0 ? (
        <div className="border border-dashed border-white/10 p-16 text-center">
          <p className="text-white/30 font-label text-sm tracking-widest">No orders yet.</p>
          <p className="text-white/20 font-label text-[10px] tracking-wider mt-2">
            Orders appear here automatically after a customer completes checkout.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-px">
          {orders.map((order: any) => {
            const addr = order.shipping_address || {}
            const addrStr = [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code, addr.country]
              .filter(Boolean)
              .join(', ')

            return (
              <div
                key={order.id}
                className="bg-[#111a13] border border-white/5 p-6"
              >
                <div className="flex justify-between items-start gap-6">
                  {/* Left: customer + photo info */}
                  <div className="flex gap-5 items-start flex-1 min-w-0">
                    {order.prints?.cloudinary_url && (
                      <div className="w-16 h-16 shrink-0 overflow-hidden bg-black">
                        <img
                          src={order.prints.cloudinary_url}
                          alt={order.prints.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-body text-sm text-[#bbcac6] font-medium">{order.customer_name}</p>
                      <p className="font-label text-[10px] text-white/40 tracking-wider">{order.customer_email}</p>
                      <div className="mt-2 space-y-0.5">
                        <p className="font-label text-xs text-white/60">
                          {order.prints?.title ?? 'Unknown print'}
                          {order.print_sizes?.size_label ? ` — ${order.print_sizes.size_label}` : ''}
                        </p>
                        {addrStr && (
                          <p className="font-label text-[10px] text-white/30 tracking-wide">{addrStr}</p>
                        )}
                        <p className="font-label text-[10px] text-white/20 tracking-wider">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: amount + status + action */}
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    {order.total_amount && (
                      <span className="font-label text-lg text-[#bbcac6]">
                        ${Number(order.total_amount).toFixed(2)}
                      </span>
                    )}
                    <span
                      className={`font-label text-[10px] uppercase tracking-widest px-3 py-1 ${
                        order.status === 'fulfilled'
                          ? 'bg-emerald-900/30 text-emerald-400'
                          : 'bg-amber-900/30 text-amber-400'
                      }`}
                    >
                      {order.status}
                    </span>

                    {order.status === 'pending' && (
                      <form
                        action={async () => {
                          'use server'
                          await markOrderFulfilled(order.id)
                        }}
                      >
                        <button
                          type="submit"
                          className="font-label text-[10px] uppercase tracking-wider px-4 py-2 bg-emerald-900/30 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-900/50 transition-colors"
                        >
                          Mark as Fulfilled
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Stripe payment intent ID for reference */}
                {order.stripe_payment_intent_id && (
                  <p className="font-label text-[9px] text-white/15 tracking-wider mt-4">
                    Stripe: {order.stripe_payment_intent_id}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
