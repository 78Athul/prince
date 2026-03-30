import { createClient } from '@/utils/supabase/server'
import NavBar from '@/components/NavBar'
import AddToCartButton from '@/components/AddToCartButton'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: prints } = await supabase
    .from('prints')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      {/* Client-side NavBar with cart state */}
      <NavBar />

      <main className="relative pt-32">
        {/* Ambient Orbs */}
        <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-tertiary rounded-full blur-[120px] opacity-[0.08] pointer-events-none -z-10"></div>
        <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-[0.05] pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="min-h-[751px] flex flex-col justify-center px-6 md:px-12 relative overflow-hidden mb-24">
          <div className="max-w-[1440px] mx-auto w-full relative z-10">
            <p className="font-label uppercase tracking-[0.3em] text-primary text-sm mb-6">Established 2024</p>
            <h1 className="font-display text-[12vw] md:text-[10vw] leading-[0.85] uppercase tracking-[-0.05em] mb-4">
              MUSEUM GRADE<br/>
              <span className="text-outline">PRINTS</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mt-12">
              <p className="max-w-md text-on-surface-variant font-light text-lg leading-relaxed">
                Curated collection of high-fidelity architectural and landscape photography, printed on archival rag paper for lasting brilliance.
              </p>
              <Link href="/gallery" className="bg-primary text-on-primary font-label uppercase tracking-widest px-12 py-6 text-sm hover:bg-surface-tint transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 self-start md:self-auto inline-block text-center">
                SHOP PRINTS
              </Link>
            </div>
          </div>
          <span className="absolute -bottom-20 -right-20 font-display text-[30vw] text-primary opacity-[0.02] select-none pointer-events-none">01</span>
        </section>

        {/* Featured Prints Store Grid — Teaser */}
        <section className="px-6 md:px-12 mb-48 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="font-headline text-5xl md:text-7xl font-light tracking-tight italic">FEATURED PRINTS</h2>
            <Link className="font-label text-xs tracking-[0.2em] border-b border-outline-variant pb-1 hover:text-primary transition-colors" href="/gallery">VIEW ALL SERIES</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {prints && prints.length > 0 ? prints.slice(0, 3).map((print: any, i: number) => (
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

        {/* Print of the Month: Asymmetric */}
        <section className="bg-surface-container-low py-32 mb-48 relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-3/5 relative group">
              <div className="relative z-10 border-[16px] md:border-[32px] border-[#1a211c] shadow-2xl">
                <img alt="" className="w-full aspect-[4/3] object-cover" src="/assets/photos/WhatsApp Image 2026-03-30 at 10.14.16 AM.jpeg"/>
              </div>
              <div className="absolute -top-12 -left-12 w-full h-full bg-primary/5 -z-10 group-hover:-top-16 transition-all duration-700"></div>
            </div>
            <div className="w-full lg:w-2/5 flex flex-col items-start">
              <span className="font-label text-xs tracking-[0.3em] text-primary mb-4">LIMITED EDITION</span>
              <h2 className="font-display text-6xl md:text-8xl leading-none uppercase mb-8">THE YELLOW<br/>STUDIO</h2>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed mb-12">
                Our monthly curated selection features &quot;The Yellow Studio&quot; from the Urban Geometry series. Only 50 signed and numbered 24x36 prints available globally.
              </p>
              <div className="space-y-6 w-full">
                <div className="flex justify-between items-center border-b border-outline-variant pb-4">
                  <span className="font-label uppercase tracking-widest text-xs">Dimensions</span>
                  <span className="font-headline italic text-xl">24&quot; x 36&quot;</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant pb-4">
                  <span className="font-label uppercase tracking-widest text-xs">Paper</span>
                  <span className="font-headline italic text-xl">Hahnemühle Rag</span>
                </div>
              </div>
              <div className="w-full mt-12">
                <AddToCartButton
                  item={{
                    id: 'yellow-studio',
                    title: 'The Yellow Studio',
                    price: 450,
                    imageUrl: '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.16 AM.jpeg',
                    isLimited: true,
                    frame: '24x36" | Hahnemühle Rag | Limited Edition',
                  }}
                  label="ADD TO CART — $450"
                  className="w-full bg-on-background text-background font-label uppercase tracking-widest py-6 text-sm hover:bg-primary transition-all active:scale-[0.98]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Print Quality Section */}
        <section className="px-6 md:px-12 mb-48 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col gap-6">
              <span className="material-symbols-outlined text-4xl text-primary" data-icon="verified_user">verified_user</span>
              <h3 className="font-headline text-2xl font-bold">Archival Quality</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Engineered to last over 100 years without fading, using Pigment-based HDR inks.</p>
            </div>
            <div className="flex flex-col gap-6">
              <span className="material-symbols-outlined text-4xl text-primary" data-icon="auto_awesome">auto_awesome</span>
              <h3 className="font-headline text-2xl font-bold">Museum-Grade Rag Paper</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Heavyweight 310gsm cotton texture provides a luxurious, non-reflective finish.</p>
            </div>
            <div className="flex flex-col gap-6">
              <span className="material-symbols-outlined text-4xl text-primary" data-icon="frame_inspect">frame_inspect</span>
              <h3 className="font-headline text-2xl font-bold">Bespoke Framing</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Handcrafted frames in solid Walnut or Maple with anti-reflective gallery glass.</p>
            </div>
            <div className="flex flex-col gap-6">
              <span className="material-symbols-outlined text-4xl text-primary" data-icon="public">public</span>
              <h3 className="font-headline text-2xl font-bold">Global Shipping</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Secured in custom-built wooden crates and delivered carbon-neutrally worldwide.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#161d18] w-full flex flex-col items-center gap-16 px-8 py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto text-center w-full relative z-10">
          <h2 className="font-['Anton'] uppercase text-7xl md:text-[14vw] text-[#bbcac6] leading-[0.8] mb-16 tracking-tighter opacity-10">GALLERY</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-24">
            <a className="font-['Plus_Jakarta_Sans'] uppercase tracking-widest text-sm text-[#dde5dc]/50 hover:text-[#aeccd1] transition-colors duration-300" href="#">FINE ART PRINTS</a>
            <a className="font-['Plus_Jakarta_Sans'] uppercase tracking-widest text-sm text-[#dde5dc]/50 hover:text-[#aeccd1] transition-colors duration-300" href="#">COLLECTIONS</a>
            <a className="font-['Plus_Jakarta_Sans'] uppercase tracking-widest text-sm text-[#dde5dc]/50 hover:text-[#aeccd1] transition-colors duration-300" href="#">ABOUT</a>
            <a className="font-['Plus_Jakarta_Sans'] uppercase tracking-widest text-sm text-[#dde5dc]/50 hover:text-[#aeccd1] transition-colors duration-300" href="#">SHIPPING</a>
            <a className="font-['Plus_Jakarta_Sans'] uppercase tracking-widest text-sm text-[#dde5dc]/50 hover:text-[#aeccd1] transition-colors duration-300" href="#">RETURNS</a>
            <a className="font-['Plus_Jakarta_Sans'] uppercase tracking-widest text-sm text-[#dde5dc]/50 hover:text-[#aeccd1] transition-colors duration-300" href="#">FAQ</a>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-outline-variant/20">
            <span className="font-['Anton'] text-[#bbcac6] text-4xl">GALLERY</span>
            <p className="font-label text-xs tracking-widest text-[#dde5dc]/30">© 2024 GALLERY PRINT SHOP. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a className="text-[#bbcac6] hover:opacity-70 transition-opacity" href="#"><span className="material-symbols-outlined" data-icon="photo_camera">photo_camera</span></a>
              <a className="text-[#bbcac6] hover:opacity-70 transition-opacity" href="#"><span className="material-symbols-outlined" data-icon="alternate_email">alternate_email</span></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
