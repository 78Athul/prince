import type { Metadata } from 'next'
import './globals.css'
import CartDrawer from '@/components/CartDrawer'
import MobileBottomNav from '@/components/MobileBottomNav'
import MobileBottomCartSummary from '@/components/MobileBottomCartSummary'

export const metadata: Metadata = {
  title: 'Gallery Print Shop',
  description: 'Curated collection of high-fidelity architectural and landscape photography',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Epilogue:wght@300;400;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary">
        {children}
        <CartDrawer />
        <MobileBottomCartSummary />
        <MobileBottomNav />
      </body>
    </html>
  )
}
