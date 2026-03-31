'use client'

import React from 'react'
import { useCartStore } from '@/store/cart'

export default function MobileBottomCartSummary() {
  const { totalItems, totalPrice, toggleCart } = useCartStore()
  const count = totalItems()
  const total = totalPrice()

  if (count === 0) return null

  return (
    <div 
      onClick={toggleCart}
      className="md:hidden fixed bottom-20 left-0 w-full z-[40] px-4 animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-pointer"
    >
      <div className="bg-primary-container text-on-primary-container px-6 py-3 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
          <span className="font-label text-[10px] font-bold uppercase tracking-widest">{count} {count === 1 ? 'Item' : 'Items'} Added</span>
        </div>
        <span className="font-label text-[11px] font-bold uppercase tracking-widest">Subtotal: ${total.toFixed(2)}</span>
      </div>
    </div>
  )
}
