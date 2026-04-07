"use client"

import Link from "next/link"
import { ImagesSlider } from "@/components/ui/images-slider"
import { TextRotate } from "@/components/TextRotate"

interface Print {
  cloudinary_url: string
  title: string
}

interface HeroSectionProps {
  prints: (Print | null | undefined)[]
}

export default function HeroSection({ prints }: HeroSectionProps) {
  const imageUrls = prints
    .filter((p): p is Print => !!p?.cloudinary_url)
    .map((p) => p.cloudinary_url)

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] min-h-[600px]">
      <ImagesSlider
        images={imageUrls}
        className="h-full w-full"
        overlayClassName="bg-black/50"
      >
        {/* Text — z-50 to sit above the overlay (z-40) */}
        <div className="relative z-50 flex flex-col items-center justify-center h-full w-full">
          <p className="font-label text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6 select-none">
            Curated Fine Art Photography
          </p>
          <div className="overflow-hidden select-none pointer-events-none">
            <TextRotate
              texts={["GALLERY", "LANDSCAPE", "URBAN", "ABSTRACT", "FINE ART"]}
              mainClassName="font-display font-bold text-[15vw] md:text-[150px] leading-[0.9] tracking-[-0.05em] text-white justify-center"
              staggerDuration={0.03}
              staggerFrom="first"
              rotationInterval={2500}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
            />
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-28 z-50 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* CTA */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-50 group">
          <Link
            href="/gallery"
            className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
              <span className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1">Ready to explore?</span>
                <svg className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" fillRule="evenodd" />
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </ImagesSlider>
    </section>
  )
}
