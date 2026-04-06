'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'

interface Print {
  id: string
  title: string
  base_price: number
  cloudinary_url: string
  is_limited_edition: boolean
}

export default function PrintConfigurator({ print }: { print: Print }) {
  const [size, setSize] = useState('8x10"')
  const [material, setMaterial] = useState('Hahnemühle Rag')
  const [frame, setFrame] = useState('Unframed')
  const [quantity, setQuantity] = useState(1)

  const addItem = useCartStore((s) => s.addItem)

  // Pricing logic multipliers
  const sizeMultipliers: Record<string, number> = {
    '8x10"': 1,
    '16x20"': 2,
    '24x36"': 3,
  }

  const frameAddons: Record<string, number> = {
    'Unframed': 0,
    'Walnut': 75,
    'Matte Black': 60,
    'Maple': 65,
  }

  const finalPrice = (print.base_price * sizeMultipliers[size]) + frameAddons[frame]

  const handleAddToCart = () => {
    addItem({
      id: `${print.id}-${size}-${material}-${frame}`.replace(/\s+/g, '-').toLowerCase(),
      title: print.title,
      price: finalPrice,
      imageUrl: print.cloudinary_url,
      isLimited: print.is_limited_edition,
      frame: `${size} | ${material} | ${frame}`,
    })
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="font-headline text-5xl md:text-6xl">{print.title}</h1>
        <div className="flex items-center gap-4">
          <span className="font-display text-3xl">${finalPrice}</span>
          {print.is_limited_edition && <span className="font-label text-xs tracking-[0.2em] bg-primary text-on-primary px-3 py-1">LIMITED EDITION</span>}
        </div>
      </div>

      <p className="text-muted font-sans leading-relaxed max-w-lg text-sm">
        Archival quality fine art print. Hand-signed and precisely crafted for gallery-grade longevity.
      </p>

      <div className="flex flex-col gap-8 w-full max-w-sm">
        {/* Dimensions */}
        <div className="flex flex-col gap-3">
          <label className="font-sans text-[10px] uppercase tracking-widest text-foreground font-bold">DIMENSIONS</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(sizeMultipliers).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`py-3 text-xs font-sans uppercase tracking-widest transition-colors border ${size === s ? 'border-foreground bg-[#e8efe9] text-foreground font-bold' : 'border-gray-200 text-muted-light hover:border-gray-300 hover:text-foreground bg-white/50'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Paper / Material */}
        <div className="flex flex-col gap-3">
          <label className="font-sans text-[10px] uppercase tracking-widest text-foreground font-bold">PAPER TYPE</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="bg-transparent border border-gray-200 text-sm font-sans px-4 py-3 outline-none focus:border-foreground transition-colors cursor-pointer appearance-none rounded-none text-foreground bg-white/50"
          >
            <option>Hahnemühle Rag</option>
            <option>Canson Etching</option>
            <option>Baryta FB</option>
          </select>
        </div>

        {/* Frame */}
        <div className="flex flex-col gap-3">
          <label className="font-sans text-[10px] uppercase tracking-widest text-foreground font-bold">FRAME</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(frameAddons).map((f) => (
              <button
                key={f}
                onClick={() => setFrame(f)}
                className={`py-3 text-xs font-sans uppercase tracking-widest transition-colors border ${frame === f ? 'border-foreground bg-[#e8efe9] text-foreground font-bold' : 'border-gray-200 text-muted-light hover:border-gray-300 hover:text-foreground bg-white/50'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-gray-200 w-full my-4"></div>

        {/* Quantity & Add to Cart */}
        <div className="flex gap-4">
          <div className="flex items-center border border-gray-200 bg-white/50">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-muted hover:text-foreground transition-colors">−</button>
            <span className="w-12 h-12 flex items-center justify-center font-sans text-sm border-x border-gray-200 text-foreground">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-muted hover:text-foreground transition-colors">+</button>
          </div>
          
          <button
            onClick={() => {
              for (let i = 0; i < quantity; i++) {
                handleAddToCart();
              }
            }}
            className="flex-1 text-foreground font-sans text-[13px] uppercase tracking-widest hover:bg-gray-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] flex items-center justify-center gap-3 border border-transparent"
          >
            ADD TO CART
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  )
}
