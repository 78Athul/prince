import { createClient } from '@/utils/supabase/server'
import StickyGallerySection from '@/components/StickyGallerySection'
import NavBar from '@/components/NavBar'
import AddToCartButton from '@/components/AddToCartButton'
import { FinancialHero } from '@/components/hero-section'
import MasonryGallery from '@/components/MasonryGallery'
import Link from 'next/link'
import Image from 'next/image'

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: prints } = await supabase
    .from('prints')
    .select('*')
    .order('created_at', { ascending: false })

  const displayPrints = prints || []

  // Synthesize heights for Masonry Gallery variance
  const heights = [500, 400, 600, 350, 550, 450, 380];
  const masonryMappedItems = displayPrints.map((print: any, i: number) => ({
    id: print.id,
    img: print.cloudinary_url,
    title: print.title,
    height: heights[i % heights.length],
    price: print.base_price,
    isLimited: print.is_limited_edition,
  }));

  return (
    <>
      <NavBar />

      <main className="relative pt-32">
        {/* Ambient Orbs */}
        <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-tertiary rounded-full blur-[120px] opacity-[0.08] pointer-events-none -z-10"></div>
        <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-[0.05] pointer-events-none -z-10"></div>

        {/* Gallery Hero — full width on mobile too */}
        <FinancialHero
          title={
            <>
              Curated<br />
              <span className="italic font-light">Fine Art</span> Prints
            </>
          }
          description="A handpicked collection of cinematic photography, available as museum-quality archival prints."
          buttonText="Browse the Collection"
          buttonLink="#store"
          imageUrl1={displayPrints[0]?.cloudinary_url ?? '/placeholder.jpg'}
          imageUrl2={displayPrints[1]?.cloudinary_url ?? '/placeholder.jpg'}
          className="-mt-32 min-h-[70vh]"
        />

        {/* Sticky Scroll Gallery Section */}
        <div id="store">
          <StickyGallerySection />
        </div>

        {/* ALL PRINTS heading */}
        <section className="px-6 md:px-12 mb-16 max-w-[1440px] mx-auto mt-24">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="font-headline text-5xl md:text-7xl font-light tracking-tight italic">ALL PRINTS</h2>
          </div>

          {/* Mobile: single-column list */}
          <div className="md:hidden flex flex-col gap-20">
            {displayPrints.length > 0 ? displayPrints.map((print: any) => (
              <article key={print.id} className="group">
                <Link href={`/prints/${print.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-container mb-6 cursor-pointer">
                    <Image
                      fill
                      sizes="100vw"
                      alt={print.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      src={print.cloudinary_url}
                    />
                    {print.is_limited_edition && (
                      <span className="absolute top-4 right-4 font-label text-[10px] tracking-widest text-primary uppercase bg-black/60 px-3 py-1 backdrop-blur-sm">
                        LIMITED
                      </span>
                    )}
                  </div>
                </Link>
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/prints/${print.id}`} className="hover:text-primary transition-colors">
                    <h3 className="font-headline text-2xl">{print.title}</h3>
                  </Link>
                </div>
                <p className="font-label text-[10px] tracking-[0.1em] text-outline uppercase mb-4">
                  Unframed | Walnut | Matte Black
                </p>
                <AddToCartButton
                  item={{
                    id: print.id,
                    title: print.title,
                    price: print.base_price,
                    imageUrl: print.cloudinary_url,
                    isLimited: print.is_limited_edition,
                    frame: 'Unframed | Walnut | Matte Black',
                  }}
                />
              </article>
            )) : (
              <p className="text-on-surface-variant font-body">No prints available yet.</p>
            )}
          </div>

          {/* Desktop: Masonry */}
          <div className="hidden md:block">
            {displayPrints.length > 0 ? (
              <MasonryGallery
                items={masonryMappedItems}
                animateFrom="bottom"
                blurToFocus={true}
                stagger={0.08}
              />
            ) : (
              <p className="text-on-surface-variant font-body">No prints available yet.</p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#161d18] w-full flex flex-col items-center gap-16 px-8 py-24 relative overflow-hidden mt-32">
          <div className="max-w-[1440px] mx-auto text-center w-full relative z-10">
            <h2 className="font-['Anton'] uppercase text-7xl md:text-[14vw] text-[#bbcac6] leading-[0.8] mb-16 tracking-tighter opacity-10">GALLERY</h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-outline-variant/20">
              <span className="font-['Anton'] text-[#bbcac6] text-4xl">GALLERY</span>
              <p className="font-label text-xs tracking-widest text-[#dde5dc]/30">© 2024 GALLERY PRINT SHOP. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
