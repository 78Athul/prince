'use client'

import { useCartStore, CartItem } from '@/store/cart'

interface AddToCartButtonProps {
  item: Omit<CartItem, 'quantity'>
  label?: string
  className?: string
}

export default function AddToCartButton({ item, label = 'ADD TO CART', className }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <button
      onClick={() => addItem(item)}
      className={className ?? "w-full bg-on-background text-background font-label uppercase tracking-widest py-4 text-xs hover:bg-primary transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"}
    >
      {label}
    </button>
  )
}
