'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import NavBar from '@/components/NavBar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PHOTOGRAPHER_EMAIL = process.env.NEXT_PUBLIC_PHOTOGRAPHER_EMAIL || 'hello@example.com'
const PHOTOGRAPHER_PHONE = process.env.NEXT_PUBLIC_PHOTOGRAPHER_PHONE || ''

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.totalPrice)
  const clearCart = useCartStore((s) => s.clearCart)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function buildInquiryBody(format: 'email' | 'sms') {
    const sep = format === 'email' ? '\n' : ', '
    const itemList = items
      .map(
        (i) =>
          `• ${i.title}${i.printSizeLabel ? ` (${i.printSizeLabel})` : ''} ×${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`
      )
      .join(sep)

    if (format === 'email') {
      return [
        `Hi,`,
        ``,
        `I'm interested in purchasing the following prints:`,
        ``,
        itemList,
        ``,
        `Estimated total: $${totalPrice().toFixed(2)}`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        message ? `Note: ${message}` : '',
        ``,
        `Please let me know about availability, shipping, and next steps.`,
        ``,
        `Thank you,`,
        name,
      ]
        .filter((l) => l !== null)
        .join('\n')
    }

    return `Hi! I'm ${name} and I'm interested in: ${itemList}. Estimated total: $${totalPrice().toFixed(2)}. My email: ${email}.${message ? ` Note: ${message}` : ''}`
  }

  function handleEmailInquiry() {
    const subject = `Print Inquiry from ${name}`
    const body = buildInquiryBody('email')
    const link = document.createElement('a')
    link.href = `mailto:${PHOTOGRAPHER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    clearCart()
    router.push('/checkout/sent')
  }

  function smsHref() {
    const body = buildInquiryBody('sms')
    return `sms:${PHOTOGRAPHER_PHONE}&body=${encodeURIComponent(body)}`
  }

  const isValid = name.trim().length > 0 && email.trim().length > 0

  if (items.length === 0) {
    return (
      <>
        <NavBar />
        <main className="pt-32 pb-32 px-6 max-w-xl mx-auto text-center">
          <h1 className="font-display text-5xl uppercase tracking-widest text-[#bbcac6] mb-6">Inquire</h1>
          <p className="font-body text-white/40 mb-8">Your selection is empty.</p>
          <Link href="/shop" className="font-label text-xs uppercase tracking-widest text-[#bbcac6] hover:underline">
            ← Browse Prints
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <NavBar />
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-[1100px] mx-auto">
        <h1 className="font-display text-5xl uppercase tracking-widest text-[#bbcac6] mb-3">Inquire</h1>
        <p className="font-body text-sm text-white/40 mb-12">
          Fill in your details and reach out directly. We&apos;ll confirm availability and discuss next steps.
        </p>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form */}
          <div className="flex-1 flex flex-col gap-8">
            <section>
              <h2 className="font-label text-xs uppercase tracking-[0.25em] text-white/40 mb-5">Your Details</h2>
              <div className="flex flex-col gap-4">
                <FormField label="Full Name" required>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="inquiry-input"
                  />
                </FormField>
                <FormField label="Email Address" required>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="inquiry-input"
                  />
                </FormField>
                <FormField label="Message (optional)">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any questions about framing, sizing, or shipping..."
                    rows={3}
                    className="inquiry-input resize-none"
                  />
                </FormField>
              </div>
            </section>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={handleEmailInquiry}
                disabled={!isValid}
                className="bg-[#bbcac6] text-[#0e1510] font-label uppercase tracking-widest py-5 text-sm hover:bg-[#dde5dc] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
                Send Inquiry via Email
              </button>

              {PHOTOGRAPHER_PHONE && (
                <a
                  href={isValid ? smsHref() : undefined}
                  onClick={
                    isValid
                      ? () => {
                          clearCart()
                          router.push('/checkout/sent')
                        }
                      : (e) => e.preventDefault()
                  }
                  className={`border border-white/20 text-[#bbcac6] font-label uppercase tracking-widest py-5 text-sm transition-colors flex items-center justify-center gap-3 ${
                    isValid ? 'hover:bg-white/5 cursor-pointer' : 'opacity-40 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">chat_bubble</span>
                  Message via iMessage
                </a>
              )}
            </div>

            <p className="font-label text-[10px] text-white/25 tracking-wider">
              Your Mail or Messages app will open with your inquiry pre-filled. Nothing is sent automatically.
            </p>
          </div>

          {/* Selection summary */}
          <div className="lg:w-80 shrink-0">
            <h2 className="font-label text-xs uppercase tracking-[0.25em] text-white/40 mb-5">Your Selection</h2>
            <div className="border border-white/10 p-6 flex flex-col gap-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.printSizeId}`} className="flex gap-4 items-start">
                  <div className="w-14 h-14 shrink-0 bg-surface-container overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-[#bbcac6] truncate">{item.title}</p>
                    {item.printSizeLabel && (
                      <p className="font-label text-[10px] text-white/40 tracking-wider">{item.printSizeLabel}</p>
                    )}
                    <p className="font-label text-xs text-white/40">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-label text-sm text-white/60 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="border-t border-white/10 pt-4 flex justify-between items-baseline">
                <span className="font-label text-xs uppercase tracking-wider text-white/40">Estimated</span>
                <span className="font-label text-lg text-[#bbcac6]">${totalPrice().toFixed(2)}</span>
              </div>
              <p className="font-label text-[9px] text-white/20 tracking-wider -mt-2">
                Final pricing confirmed after inquiry
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .inquiry-input {
          width: 100%;
          background: #111a13;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #dde5dc;
          padding: 14px 16px;
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .inquiry-input:focus {
          border-color: rgba(187, 202, 198, 0.5);
        }
      `}</style>
    </>
  )
}

function FormField({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-label text-[10px] uppercase tracking-[0.2em] text-white/40">
        {label}
        {required && <span className="text-[#bbcac6] ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}
