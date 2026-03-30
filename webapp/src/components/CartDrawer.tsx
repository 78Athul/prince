'use client'

import { useCartStore } from '@/store/cart'
import { useEffect } from 'react'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore()

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[#0e1510] z-[70] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[-40px_0_100px_rgba(0,0,0,0.5)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-10 border-b border-[#444844]/30">
          <h2 className="font-['Anton'] text-4xl uppercase tracking-tighter text-[#dde5dc]">
            Your Bag
          </h2>
          <button
            onClick={closeCart}
            className="text-[#bbcac6] hover:text-[#dde5dc] transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6">
              <span className="material-symbols-outlined text-6xl text-[#444844]">
                shopping_bag
              </span>
              <p className="font-['Plus_Jakarta_Sans'] uppercase tracking-[0.2em] text-xs text-[#8e928d]">
                Your bag is empty
              </p>
              <button
                onClick={closeCart}
                className="font-['Plus_Jakarta_Sans'] uppercase tracking-[0.15em] text-xs text-[#bbcac6] border border-[#444844]/50 px-8 py-3 hover:bg-[#1a211c] transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-5 group">
                  {/* Thumbnail */}
                  <div className="w-24 h-28 flex-shrink-0 overflow-hidden bg-[#1a211c]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-['Epilogue'] text-base text-[#dde5dc] leading-tight truncate">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#8e928d] hover:text-[#ffb4ab] transition-colors flex-shrink-0"
                        >
                          <span className="material-symbols-outlined text-base">
                            close
                          </span>
                        </button>
                      </div>
                      <p className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.15em] uppercase text-[#8e928d] mt-1">
                        {item.frame}
                      </p>
                      {item.isLimited && (
                        <span className="font-['Plus_Jakarta_Sans'] text-[9px] tracking-[0.2em] uppercase text-[#bbcac6] mt-1 inline-block">
                          Limited Edition
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#444844]/40">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#bbcac6] hover:bg-[#1a211c] transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center font-['Plus_Jakarta_Sans'] text-xs text-[#dde5dc] border-x border-[#444844]/40">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#bbcac6] hover:bg-[#1a211c] transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-['Epilogue'] text-sm text-[#dde5dc]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-[#444844]/30 px-8 py-8 bg-[#161d18]">
            <div className="flex justify-between items-center mb-3">
              <span className="font-['Plus_Jakarta_Sans'] uppercase tracking-[0.15em] text-xs text-[#8e928d]">
                Subtotal
              </span>
              <span className="font-['Epilogue'] text-lg text-[#dde5dc]">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.1em] text-[#8e928d] mb-6">
              SHIPPING CALCULATED AT CHECKOUT
            </p>
            <button className="w-full bg-[#bbcac6] text-[#0e1510] font-['Anton'] uppercase tracking-widest py-5 text-sm hover:bg-[#d7e6e2] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]">
              Checkout Now
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
