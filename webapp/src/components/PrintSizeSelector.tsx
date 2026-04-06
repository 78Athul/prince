'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { getPreviewUrl } from '@/utils/cloudinary-helpers'

type PrintSize = {
  id: string
  size_label: string
  price: number
  stock_status: string
}

type Photo = {
  id: string
  title: string
  cloudinary_url: string
  is_limited_edition: boolean
}

export default function PrintSizeSelector({
  photo,
  sizes,
}: {
  photo: Photo
  sizes: PrintSize[]
}) {
  const availableSizes = sizes.filter((s) => s.stock_status === 'available')
  const [selected, setSelected] = useState<PrintSize | null>(availableSizes[0] || null)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  function handleAddToCart() {
    if (!selected) return
    addItem({
      id: photo.id,
      title: photo.title,
      price: selected.price,
      imageUrl: getPreviewUrl(photo.cloudinary_url),
      isLimited: photo.is_limited_edition,
      frame: selected.size_label,
      printSizeId: selected.id,
      printSizeLabel: selected.size_label,
    })
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2500)
  }

  if (sizes.length === 0) {
    return (
      <div className="border border-white/10 p-6 text-center">
        <p className="font-label text-xs uppercase tracking-widest text-white/40">No print sizes configured yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Size grid */}
      <div>
        <p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/40 mb-4">Select Size</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {sizes.map((size) => {
            const isSoldOut = size.stock_status === 'sold_out'
            const isSelected = selected?.id === size.id
            return (
              <button
                key={size.id}
                onClick={() => !isSoldOut && setSelected(size)}
                disabled={isSoldOut}
                className={`py-4 px-3 text-center transition-all duration-200 border ${
                  isSoldOut
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                    : isSelected
                    ? 'border-foreground bg-[#e8efe9] text-foreground font-bold'
                    : 'border-gray-200 text-muted hover:border-gray-300 hover:text-foreground bg-white/50'
                }`}
              >
                <p className="font-label text-xs uppercase tracking-wider">
                  {size.size_label}
                  {isSoldOut ? ' — Sold Out' : ''}
                </p>
                {!isSoldOut && (
                  <p className="font-headline text-lg mt-1">${Number(size.price).toFixed(2)}</p>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected summary */}
      {selected && (
        <div className="border border-white/10 p-4 flex justify-between items-center">
          <div>
            <p className="font-label text-[10px] uppercase tracking-widest text-white/40">Selected</p>
            <p className="font-body text-sm text-[#bbcac6] mt-1">{selected.size_label}</p>
          </div>
          <p className="font-display text-2xl text-[#bbcac6]">${Number(selected.price).toFixed(2)}</p>
        </div>
      )}

      {/* Add to cart */}
      <button
        onClick={handleAddToCart}
        disabled={!selected || availableSizes.length === 0}
        className={`w-full py-5 font-sans uppercase tracking-widest text-sm transition-all duration-300 border border-transparent flex items-center justify-center gap-3 ${
          added
            ? 'bg-emerald-700 text-white'
            : 'text-foreground hover:bg-gray-100 active:scale-[0.99]'
        } disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        {added ? '✓ Added to Cart' : availableSizes.length === 0 ? 'Sold Out' : 'Add to Cart'}
      </button>

      <p className="font-label text-[10px] text-white/25 tracking-wider text-center">
        Archival pigment print on museum-grade rag paper · Ships in a protective tube
      </p>
    </div>
  )
}
