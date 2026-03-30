import { createClient } from '@/utils/supabase/server'
import StickyGallerySection from '@/components/StickyGallerySection'
import NavBar from '@/components/NavBar'
import AddToCartButton from '@/components/AddToCartButton'
import { HalideTopoHero } from '@/components/GalleryHero'
import Link from 'next/link'

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: prints } = await supabase
    .from('prints')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      <NavBar />

      <main className="relative pt-32">
        {/* Ambient Orbs */}
        <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-tertiary rounded-full blur-[120px] opacity-[0.08] pointer-events-none -z-10"></div>
        <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-[0.05] pointer-events-none -z-10"></div>

        {/* Halide Topo Hero Component */}
        <section className="flex justify-center w-full relative -mt-32">
          <HalideTopoHero />
        </section>

        {/* Sticky Scroll Gallery Section */}
        <div id="store">
          <StickyGallerySection />
        </div>

        {/* Full Gallery Grid */}
        <section className="px-6 md:px-12 mb-48 max-w-[1440px] mx-auto mt-24">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="font-headline text-5xl md:text-7xl font-light tracking-tight italic">ALL PRINTS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {prints && prints.length > 0 ? prints.map((print: any, i: number) => (
              <div key={print.id} className={`group ${i % 2 !== 0 ? 'md:translate-y-24' : ''}`}>
                <Link href={`/prints/${print.id}`}>
                  <div className="aspect-[4/5] overflow-hidden bg-surface-container mb-8 relative cursor-pointer">
                    <img alt={print.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" src={print.cloudinary_url}/>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </Link>
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/prints/${print.id}`} className="hover:text-primary transition-colors">
                    <h3 className="font-headline text-2xl">{print.title}</h3>
                  </Link>
                  {print.is_limited_edition && <span className="font-label text-xs tracking-widest text-primary pt-2">LIMITED</span>}
                </div>
                <p className="font-label text-[10px] tracking-[0.1em] text-outline uppercase mb-4">Unframed | Walnut | Matte Black</p>
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
              </div>
            )) : (
              <p className="text-on-surface-variant font-body">No prints available yet.</p>
            )}
          </div>
        </section>
      </main>

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
    </>
  )
}
