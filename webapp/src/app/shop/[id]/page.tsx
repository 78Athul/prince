import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import NavBar from '@/components/NavBar'
import PrintSizeSelector from '@/components/PrintSizeSelector'
import { getPreviewUrl } from '@/utils/cloudinary-helpers'
import Link from 'next/link'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: photo } = await supabase.from('prints').select('title, description').eq('id', id).single()
  if (!photo) return {}
  return {
    title: `${photo.title} — Gallery Print Shop`,
    description: photo.description || `Purchase a museum-grade print of ${photo.title}.`,
  }
}

export default async function ShopPhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: photo } = await supabase
    .from('prints')
    .select('*, print_sizes(id, size_label, price, stock_status)')
    .eq('id', id)
    .eq('is_available', true)
    .single()

  if (!photo) notFound()

  const sizes = (photo.print_sizes || []).sort((a: any, b: any) => a.price - b.price)
  const previewUrl = getPreviewUrl(photo.cloudinary_url)

  return (
    <>
      <NavBar />
      <main className="pt-28 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex gap-2 items-center mb-10">
          <Link href="/shop" className="font-label text-[10px] uppercase tracking-widest text-white/30 hover:text-[#bbcac6] transition-colors">
            Shop
          </Link>
          <span className="text-white/20">›</span>
          <span className="font-label text-[10px] uppercase tracking-widest text-white/50">{photo.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left — image */}
          <div className="w-full lg:w-3/5 relative">
            <div className="aspect-[4/5] bg-surface-container overflow-hidden relative">
              <Image
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                src={previewUrl}
                alt={photo.alt_text || photo.title}
                className="object-cover"
              />
              {photo.is_limited_edition && (
                <div className="absolute top-6 left-6 bg-primary text-on-primary px-3 py-1 font-label text-[10px] uppercase tracking-widest">
                  Limited Edition
                </div>
              )}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Right — details + configurator */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            {photo.category && (
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary mb-4">{photo.category}</p>
            )}
            <h1 className="font-headline text-4xl md:text-5xl font-light tracking-tight text-on-surface uppercase mb-4">
              {photo.title}
            </h1>

            {photo.description && (
              <p className="font-body text-base font-light leading-relaxed text-on-surface-variant mb-8">
                {photo.description}
              </p>
            )}

            {/* Print quality callouts */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {[
                ['Archival Pigment', '100+ year lifespan'],
                ['Museum Rag Paper', '310gsm cotton'],
                ['Hand Inspected', 'Quality guaranteed'],
                ['Ships Protected', 'Custom tube packaging'],
              ].map(([title, sub]) => (
                <div key={title} className="border border-white/8 p-4">
                  <p className="font-label text-[10px] uppercase tracking-wider text-[#bbcac6]">{title}</p>
                  <p className="font-body text-xs text-white/40 mt-1">{sub}</p>
                </div>
              ))}
            </div>

            {/* Size selector + add to cart */}
            <PrintSizeSelector photo={{ id: photo.id, title: photo.title, cloudinary_url: photo.cloudinary_url, is_limited_edition: photo.is_limited_edition }} sizes={sizes} />
          </div>
        </div>
      </main>
    </>
  )
}
