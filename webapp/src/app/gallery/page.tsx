import { createClient } from '@/utils/supabase/server'
import StickyGallerySection from '@/components/StickyGallerySection'
import NavBar from '@/components/NavBar'
import AddToCartButton from '@/components/AddToCartButton'
import { HalideTopoHero } from '@/components/GalleryHero'
import Link from 'next/link'
import Image from 'next/image'

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: prints } = await supabase
    .from('prints')
    .select('*')
    .order('created_at', { ascending: false })

  const displayPrints = prints || []

  return (
    <>
      <NavBar />

      {/* MOBILE VIEW (Stitch) */}
      <div className="md:hidden pt-0 text-on-surface font-body bg-surface">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full flex flex-col items-center justify-center px-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#161d18_0%,#0e1510_100%)] z-0"></div>
            <div className="absolute inset-0 opacity-15 scale-150 z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23bbcac6' d='M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.2C87.4,-33.3,90,-16.7,89.6,-0.2C89.2,16.2,85.8,32.5,78.2,46.1C70.6,59.7,58.8,70.7,45.1,78.2C31.4,85.7,15.7,89.7,0.1,89.5C-15.5,89.3,-31,84.9,-44.8,77.5C-58.5,70.1,-70.5,59.7,-78.3,46.3C-86,32.9,-89.6,16.4,-89.2,0.2C-88.8,-15.9,-84.4,-31.8,-76.3,-45.5C-68.2,-59.1,-56.3,-70.5,-42.6,-77.9C-28.9,-85.3,-14.4,-88.7,0.4,-89.4C15.2,-90.1,30.5,-83.6,44.7,-76.4Z' transform='translate(100 100)' /%3E%3C/svg%3E\")", backgroundSize: '150% 150%', backgroundPosition: 'center' }}></div>
            <div className="absolute inset-0 opacity-10 scale-110 rotate-45 z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23bbcac6' d='M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.2C87.4,-33.3,90,-16.7,89.6,-0.2C89.2,16.2,85.8,32.5,78.2,46.1C70.6,59.7,58.8,70.7,45.1,78.2C31.4,85.7,15.7,89.7,0.1,89.5C-15.5,89.3,-31,84.9,-44.8,77.5C-58.5,70.1,-70.5,59.7,-78.3,46.3C-86,32.9,-89.6,16.4,-89.2,0.2C-88.8,-15.9,-84.4,-31.8,-76.3,-45.5C-68.2,-59.1,-56.3,-70.5,-42.6,-77.9C-28.9,-85.3,-14.4,-88.7,0.4,-89.4C15.2,-90.1,30.5,-83.6,44.7,-76.4Z' transform='translate(100 100)' /%3E%3C/svg%3E\")", backgroundSize: '150% 150%', backgroundPosition: 'center' }}></div>
            <div className="z-10 text-center relative pointer-events-none">
                <p className="font-label text-[10px] tracking-[0.3em] text-primary uppercase mb-4 opacity-70">Curated Exhibition</p>
                <h2 className="font-display text-[64px] sm:text-[80px] leading-[0.9] text-on-surface uppercase tracking-tight max-w-[300px] mx-auto">
                    EXPLORE THE GALLERY
                </h2>
            </div>
            <div className="absolute bottom-24 flex flex-col items-center gap-2 opacity-60 z-10 w-full">
                <span className="font-label text-[10px] tracking-[0.5em] uppercase text-primary">SCROLL</span>
                <div className="w-px h-12 bg-primary/30 mx-auto"></div>
            </div>
        </section>

        {/* Filter Bar */}
        <nav className="sticky top-16 z-40 bg-surface/90 backdrop-blur-md py-6 px-6 overflow-hidden">
            <div className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap pb-2">
                <button className="px-6 py-2 bg-surface-container-low text-primary-container font-label text-[11px] tracking-widest uppercase border-b-2 border-primary-container">ALL</button>
                <button className="px-6 py-2 bg-surface-container-low text-on-surface-variant font-label text-[11px] tracking-widest uppercase hover:text-primary transition-colors">LANDSCAPE</button>
                <button className="px-6 py-2 bg-surface-container-low text-on-surface-variant font-label text-[11px] tracking-widest uppercase hover:text-primary transition-colors">URBAN</button>
                <button className="px-6 py-2 bg-surface-container-low text-on-surface-variant font-label text-[11px] tracking-widest uppercase hover:text-primary transition-colors">ABSTRACT</button>
            </div>
        </nav>

        {/* Section Header */}
        <div className="px-6 mt-16 mb-12">
            <h3 className="font-headline italic text-4xl text-on-surface font-light tracking-tight uppercase">ALL PRINTS</h3>
            <div className="w-12 h-[2px] bg-primary mt-4"></div>
        </div>

        {/* Print Collection */}
        <section className="flex flex-col gap-24 px-6 pb-40">
            {displayPrints.length > 0 ? displayPrints.map((print: any) => (
                <article key={print.id} className="group">
                    <Link href={`/prints/${print.id}`}>
                        <div className="relative aspect-[4/5] bg-surface-container-lowest overflow-hidden">
                            <Image fill sizes="(max-width: 768px) 100vw, 33vw" alt={print.title} className="object-cover transition-transform duration-700 group-hover:scale-105" src={print.cloudinary_url}/>
                            {print.is_limited_edition && (
                                <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 font-label text-[10px] tracking-widest uppercase">
                                    LIMITED
                                </div>
                            )}
                        </div>
                    </Link>
                    <div className="mt-8 flex justify-between items-start">
                        <div>
                            <Link href={`/prints/${print.id}`}>
                                <h4 className="font-headline text-2xl text-on-surface uppercase tracking-tight hover:text-primary transition-colors">{print.title}</h4>
                            </Link>
                            <p className="font-label text-sm text-on-surface-variant mt-1">${print.base_price}</p>
                        </div>
                    </div>
                    <AddToCartButton 
                        item={{
                          id: print.id,
                          title: print.title,
                          price: print.base_price,
                          imageUrl: print.cloudinary_url,
                          isLimited: print.is_limited_edition,
                          frame: 'Unframed | Walnut | Matte Black'
                        }}
                        label="ADD TO CART"
                        className="w-full mt-6 py-4 bg-primary text-on-primary font-label text-[11px] tracking-[0.2em] uppercase hover:bg-primary-container transition-colors duration-400"
                    />
                </article>
            )) : (
                <p className="text-on-surface-variant">No prints available.</p>
            )}
        </section>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block">
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
            {displayPrints.length > 0 ? displayPrints.map((print: any, i: number) => (
              <div key={print.id} className={`group ${i % 2 !== 0 ? 'md:translate-y-24' : ''}`}>
                <Link href={`/prints/${print.id}`}>
                  <div className="aspect-[4/5] overflow-hidden bg-surface-container mb-8 relative cursor-pointer">
                    <Image fill sizes="(max-width: 1024px) 50vw, 33vw" alt={print.title} className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" src={print.cloudinary_url}/>
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
    </div>
  </>
)
}
