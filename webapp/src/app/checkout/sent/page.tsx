import NavBar from '@/components/NavBar'
import Link from 'next/link'

export const metadata = {
  title: 'Inquiry Sent — Gallery Print Shop',
}

export default function InquirySentPage() {
  return (
    <>
      <NavBar />
      <main className="pt-40 pb-40 px-6 max-w-xl mx-auto text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-[#121f1c] border border-[#bbcac6]/20 flex items-center justify-center mx-auto mb-8">
          <span
            className="material-symbols-outlined text-4xl text-[#bbcac6]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            mark_email_read
          </span>
        </div>

        <p className="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-3">Inquiry Sent</p>
        <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight text-[#bbcac6] mb-6">
          Thank You
        </h1>

        <p className="font-body text-base text-white/60 leading-relaxed mb-4">
          Your inquiry is on its way. We&apos;ll be in touch shortly to confirm availability, discuss sizing, and arrange everything.
        </p>
        <p className="font-body text-sm text-white/40 leading-relaxed mb-12">
          Every print is handled with care and ships in protective packaging.
        </p>

        <div className="flex flex-col gap-4 items-center">
          <Link
            href="/shop"
            className="bg-[#bbcac6] text-[#0e1510] font-label uppercase tracking-widest px-12 py-4 text-sm hover:bg-[#dde5dc] transition-colors"
          >
            Continue Browsing
          </Link>
          <Link
            href="/"
            className="font-label text-[10px] uppercase tracking-widest text-white/30 hover:text-[#bbcac6] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  )
}
