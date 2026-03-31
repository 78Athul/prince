'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cart'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const toggleCart = useCartStore((state: { toggleCart: () => void }) => state.toggleCart)


  const isActive = (path: string) => pathname === path

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-4 pb-1 bg-[#0e1510]/95 backdrop-blur-xl border-t border-[#bbcac6]/10">
      <Link 
        href="/" 
        className={`flex flex-col items-center justify-center transition-all duration-300 ${
          isActive('/') 
            ? 'text-[#bbcac6] border-t-2 border-[#bbcac6] pt-2 scale-95' 
            : 'text-[#dde5dc] opacity-50 pt-2 hover:text-[#bbcac6] hover:opacity-100'
        }`}
      >
        <span 
          className="material-symbols-outlined mb-1" 
          style={isActive('/') ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          home
        </span>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] font-medium">HOME</span>
      </Link>
      
      <Link 
        href="/gallery" 
        className={`flex flex-col items-center justify-center transition-all duration-300 ${
          isActive('/gallery') || pathname?.startsWith('/prints')
            ? 'text-[#bbcac6] border-t-2 border-[#bbcac6] pt-2 scale-95' 
            : 'text-[#dde5dc] opacity-50 pt-2 hover:text-[#bbcac6] hover:opacity-100'
        }`}
      >
        <span 
          className="material-symbols-outlined mb-1"
          style={(isActive('/gallery') || pathname?.startsWith('/prints')) ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          grid_view
        </span>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] font-medium">GALLERY</span>
      </Link>

      <Link 
        href="/admin" 
        className={`flex flex-col items-center justify-center transition-all duration-300 ${
          isActive('/admin') 
            ? 'text-[#bbcac6] border-t-2 border-[#bbcac6] pt-2 scale-95' 
            : 'text-[#dde5dc] opacity-50 pt-2 hover:text-[#bbcac6] hover:opacity-100'
        }`}
      >
        <span 
          className="material-symbols-outlined mb-1"
          style={isActive('/admin') ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          dashboard
        </span>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] font-medium">STUDIO</span>
      </Link>

      <button 
        onClick={toggleCart}
        className="flex flex-col items-center justify-center text-[#dde5dc] opacity-50 pt-2 hover:text-[#bbcac6] hover:opacity-100 transition-all duration-300"
      >
        <span className="material-symbols-outlined mb-1">shopping_cart</span>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] font-medium">CART</span>
      </button>
    </nav>
  )
}
