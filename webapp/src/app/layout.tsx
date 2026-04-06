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
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <CartDrawer />
        <MobileBottomCartSummary />
        <MobileBottomNav />
      </body>
    </html>
  )
}
