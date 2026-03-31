import NavBar from '@/components/NavBar'
import Link from 'next/link'

export const metadata = {
  title: 'Order Confirmed — Gallery Print Shop',
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  // Optionally verify the session with Stripe here
  // For now, just show a confirmation since the webhook handles order creation

  return (
    <>
      <NavBar />
      <main className="pt-40 pb-40 px-6 max-w-xl mx-auto text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-4xl text-emerald-400" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>

        <p className="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-3">Order Confirmed</p>
        <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight text-[#bbcac6] mb-6">
          Thank You
        </h1>

        <p className="font-body text-base text-white/60 leading-relaxed mb-4">
          Your order has been placed. A confirmation email with your order details will be sent shortly.
        </p>
        <p className="font-body text-sm text-white/40 leading-relaxed mb-12">
          We take care to hand-inspect every print before shipping. Your artwork will arrive securely packaged in a protective tube.
        </p>

        <div className="flex flex-col gap-4 items-center">
          <Link
            href="/shop"
            className="bg-[#bbcac6] text-[#0e1510] font-label uppercase tracking-widest px-12 py-4 text-sm hover:bg-[#dde5dc] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="font-label text-[10px] uppercase tracking-widest text-white/30 hover:text-[#bbcac6] transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {session_id && (
          <p className="font-label text-[9px] text-white/15 tracking-wider mt-16">
            Session: {session_id}
          </p>
        )}
      </main>
    </>
  )
}
