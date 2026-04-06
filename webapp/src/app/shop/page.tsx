import { createClient } from '@/utils/supabase/server'
import NavBar from '@/components/NavBar'
import { getThumbnailUrl } from '@/utils/cloudinary-helpers'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Shop Prints — Gallery Print Shop',
  description: 'Browse and purchase museum-grade fine art photography prints.',
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category: activeCategory } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('prints')
    .select('*, print_sizes(id, size_label, price, stock_status)')
    .eq('is_available', true)
    .order('created_at', { ascending: false })

  if (activeCategory) {
    query = query.eq('category', activeCategory)
  }

  const { data: photos } = await query

  // Fetch all categories separately so the filter nav always shows all options
  const { data: allPhotos } = await supabase.from('prints').select('category').eq('is_available', true)
  const categories = [...new Set(allPhotos?.map((p: any) => p.category).filter(Boolean))]

  return (
    <>
      <NavBar />
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-3">Fine Art Prints</p>
          <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tight text-on-surface">Shop</h1>
        </div>

        {/* Category filter links */}
        {categories.length > 0 && (
          <nav className="flex flex-wrap gap-3 mb-16">
            <Link
              href="/shop"
              className={`font-label text-[10px] uppercase tracking-widest px-4 py-2 border transition-colors ${!activeCategory ? 'border-[#bbcac6]/40 text-[#bbcac6]' : 'border-white/10 text-white/50 hover:border-[#bbcac6]/40 hover:text-[#bbcac6]'}`}
            >
              All
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className={`font-label text-[10px] uppercase tracking-widest px-4 py-2 border transition-colors ${activeCategory === cat ? 'border-[#bbcac6]/40 text-[#bbcac6]' : 'border-white/10 text-white/50 hover:border-[#bbcac6]/40 hover:text-[#bbcac6]'}`}
              >
                {cat}
              </Link>
            ))}
          </nav>
        )}

        {/* Grid */}
        {!photos || photos.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-label text-sm uppercase tracking-widest text-white/30">No prints available yet.</p>
            <p className="font-body text-white/20 mt-3 text-sm">Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {photos.map((photo: any, i: number) => {
              const availableSizes = photo.print_sizes?.filter((s: any) => s.stock_status === 'available') || []
              const lowestPrice = availableSizes.length > 0
                ? Math.min(...availableSizes.map((s: any) => Number(s.price)))
                : Number(photo.base_price)

              return (
                <div key={photo.id} className={`group ${i % 2 !== 0 ? 'md:mt-16' : ''}`}>
                  <Link href={`/shop/${photo.id}`}>
                    <div className="aspect-[4/5] overflow-hidden bg-surface-container mb-6 relative cursor-pointer">
                      <Image
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        alt={photo.alt_text || photo.title}
                        src={getThumbnailUrl(photo.cloudinary_url)}
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {photo.is_limited_edition && (
                        <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 font-label text-[10px] uppercase tracking-widest">
                          Limited
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="flex justify-between items-start mb-1">
                    <Link href={`/shop/${photo.id}`} className="hover:text-primary transition-colors">
                      <h2 className="font-headline text-xl">{photo.title}</h2>
                    </Link>
                  </div>

                  {photo.category && (
                    <p className="font-label text-[10px] uppercase tracking-widest text-white/40 mb-2">{photo.category}</p>
                  )}

                  <div className="flex justify-between items-center">
                    <p className="font-label text-sm text-[#bbcac6]">
                      {lowestPrice > 0 ? `From $${lowestPrice.toFixed(2)}` : 'Price on request'}
                    </p>
                    {availableSizes.length === 0 && (
                      <span className="font-label text-[10px] uppercase tracking-widest text-white/30">Sold Out</span>
                    )}
                  </div>

                  <Link
                    href={`/shop/${photo.id}`}
                    className="block w-full mt-4 py-3 border border-white/20 text-center font-label text-[10px] uppercase tracking-[0.2em] text-white/60 hover:bg-white/5 hover:text-[#bbcac6] hover:border-[#bbcac6]/30 transition-all duration-300"
                  >
                    View &amp; Select Size
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
