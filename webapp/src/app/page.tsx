import { createClient } from '@/utils/supabase/server'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  const supabase = await createClient()
  const { data: prints } = await supabase
    .from('prints')
    .select('*')
    .order('created_at', { ascending: false })

  const displayPrints = prints || []

  // Map explicitly selected showcases, falling back to chronological default if unassigned
  const showcase1 = displayPrints.find((p: any) => p.placement === 'showcase_1') || displayPrints[0];
  const showcase2 = displayPrints.find((p: any) => p.placement === 'showcase_2') || displayPrints[1];
  const showcase3 = displayPrints.find((p: any) => p.placement === 'showcase_3') || displayPrints[2];
  const showcase4 = displayPrints.find((p: any) => p.placement === 'showcase_4') || displayPrints[3];

  return (
    <>
      <NavBar />
      
      <main className="w-full pt-20">
        {/* HERO: Typographic Echo Stack */}
        <section className="relative w-full h-[70vh] md:h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
          <div className="relative flex justify-center items-center select-none pointer-events-none">
            {/* Background layers */}
            <span className="absolute font-display font-bold text-[18vw] md:text-[180px] leading-[0.9] tracking-[-0.05em] text-gray-100 z-10" style={{ transform: 'translate(-0.16em, -0.16em)' }}>GALLERY</span>
            <span className="absolute font-display font-bold text-[18vw] md:text-[180px] leading-[0.9] tracking-[-0.05em] text-gray-200 z-20" style={{ transform: 'translate(-0.12em, -0.12em)' }}>GALLERY</span>
            <span className="absolute font-display font-bold text-[18vw] md:text-[180px] leading-[0.9] tracking-[-0.05em] text-gray-300 z-30" style={{ transform: 'translate(-0.08em, -0.08em)' }}>GALLERY</span>
            <span className="absolute font-display font-bold text-[18vw] md:text-[180px] leading-[0.9] tracking-[-0.05em] text-gray-400 z-40" style={{ transform: 'translate(-0.04em, -0.04em)' }}>GALLERY</span>
            {/* Primary foreground layer */}
            <span className="relative font-display font-bold text-[18vw] md:text-[180px] leading-[0.9] tracking-[-0.05em] text-foreground z-50">GALLERY</span>
          </div>
        </section>

        {/* PHILOSOPHY / NARRATIVE */}
        <section className="relative w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-32 flex flex-col items-center">
          {/* Vertical hairline divider */}
          <div className="w-[1px] h-24 md:h-32 bg-dark-bg/10 mb-16"></div>
          
          {/* Large Quote */}
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground text-center max-w-5xl leading-[1.1] tracking-[-0.02em] mb-24 md:mb-32">
            Photography is not about the thing photographed. It is about how that thing <span className="font-serif italic font-normal text-muted">looks</span> photographed.
          </h2>

          {/* 3-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full mt-4">
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-bold text-2xl text-foreground">Syntax</h3>
              <p className="font-sans font-medium text-sm text-foreground leading-relaxed">Emphasizing the inherent geometry of natural and built environments, stripping away the superfluous to reveal core structures.</p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-bold text-2xl text-foreground">Contrast</h3>
              <p className="font-sans font-medium text-sm text-foreground leading-relaxed">Capturing the sheer brutalism of stark shadows and blinding highlights to sculpt profound spatial depth on a flat plane.</p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-bold text-2xl text-foreground">Artifact</h3>
              <p className="font-sans font-medium text-sm text-foreground leading-relaxed">Rendering tangible textures—concrete, steel, stone, and soil—into permanent, luxury two-dimensional photographic objects.</p>
            </div>
          </div>
        </section>

        {/* ASYMMETRICAL SHOWCASE GRID */}
        <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-auto">
            
            {/* 8-col rect */}
            <div className="md:col-span-8 group overflow-hidden bg-gray-200 rounded-sm relative aspect-[4/3] md:aspect-auto md:h-[600px]">
              {showcase1 ? (
                <Image fill sizes="(max-width: 768px) 100vw, 66vw" src={showcase1.cloudinary_url} alt={showcase1.title} className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[700ms] ease-[cubic-bezier(0.77,0,0.175,1)]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-sans tracking-widest text-[10px] uppercase text-muted">Awaiting Sequence</div>
              )}
            </div>

            {/* 4-col pill */}
            <div className="md:col-span-4 group overflow-hidden bg-gray-200 rounded-full relative aspect-[9/16] md:aspect-auto md:h-[600px] flex items-center justify-center">
              {showcase2 ? (
                <Image fill sizes="(max-width: 768px) 100vw, 33vw" src={showcase2.cloudinary_url} alt={showcase2.title} className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[700ms] ease-[cubic-bezier(0.77,0,0.175,1)]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-sans tracking-widest text-[10px] uppercase text-muted">Awaiting Sequence</div>
              )}
              <div className="relative z-10 w-32 h-32 rounded-full border border-dark-bg bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-sans text-[10px] uppercase tracking-widest text-foreground font-bold text-center">View<br/>Series</span>
              </div>
            </div>

            {/* 5-col circular */}
            <div className="md:col-span-5 group overflow-hidden bg-gray-200 rounded-full relative aspect-square">
              {showcase3 ? (
                <Image fill sizes="(max-width: 768px) 100vw, 40vw" src={showcase3.cloudinary_url} alt={showcase3.title} className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[700ms] ease-[cubic-bezier(0.77,0,0.175,1)]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-sans tracking-widest text-[10px] uppercase text-muted">Awaiting Sequence</div>
              )}
            </div>

            {/* 7-col wide */}
            <div className="md:col-span-7 group overflow-hidden bg-gray-200 rounded-sm relative aspect-[4/3] md:aspect-auto">
              {showcase4 ? (
                <Image fill sizes="(max-width: 768px) 100vw, 60vw" src={showcase4.cloudinary_url} alt={showcase4.title} className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[700ms] ease-[cubic-bezier(0.77,0,0.175,1)]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-sans tracking-widest text-[10px] uppercase text-muted">Awaiting Sequence</div>
              )}
            </div>

          </div>
        </section>

        {/* BESPOKE SERVICE CARDS */}
        <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <h2 className="font-display font-bold text-4xl mb-12 tracking-tighter text-foreground">BESPOKE SERVICES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-dark-bg/10">
            {/* Service 1 */}
            <div className="group border-b border-r border-dark-bg/10 p-8 md:p-12 bg-transparent hover:bg-white transition-colors duration-500 flex flex-col items-start gap-8 min-h-[320px]">
              <div className="w-16 h-16 bg-background border border-dark-bg/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 ease-out shrink-0">
                <span className="material-symbols-outlined text-foreground">auto_awesome</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl mb-4 text-foreground">MUSEUM ARCHIVAL</h3>
                <p className="font-sans text-sm text-foreground leading-relaxed">Hahnemühle Photo Rag 308gsm, printed with HDR pigment inks for 100+ year longevity without fading.</p>
              </div>
              <div className="mt-auto pt-8 flex items-center gap-2 text-foreground">
                <span className="font-sans font-bold text-xs uppercase tracking-widest">Learn More</span>
                <span className="material-symbols-outlined text-lg leading-none">arrow_right_alt</span>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group border-b border-r border-dark-bg/10 p-8 md:p-12 bg-transparent hover:bg-white transition-colors duration-500 flex flex-col items-start gap-8 min-h-[320px]">
              <div className="w-16 h-16 bg-background border border-dark-bg/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 ease-out shrink-0">
                <span className="material-symbols-outlined text-foreground">frame_inspect</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl mb-4 text-foreground">GALLERY FRAMING</h3>
                <p className="font-sans text-sm text-foreground leading-relaxed">Handcrafted solid walnut or maple frames fitted with 99% UV-protective anti-reflective museum glass.</p>
              </div>
              <div className="mt-auto pt-8 flex items-center gap-2 text-foreground">
                <span className="font-sans font-bold text-xs uppercase tracking-widest">Learn More</span>
                <span className="material-symbols-outlined text-lg leading-none">arrow_right_alt</span>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group border-b border-r border-dark-bg/10 p-8 md:p-12 bg-transparent hover:bg-white transition-colors duration-500 flex flex-col items-start gap-8 min-h-[320px]">
              <div className="w-16 h-16 bg-background border border-dark-bg/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 ease-out shrink-0">
                <span className="material-symbols-outlined text-foreground">public</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl mb-4 text-foreground">GLOBAL DELIVERY</h3>
                <p className="font-sans text-sm text-foreground leading-relaxed">Secured in custom-built wooden crates and delivered completely carbon-neutrally to any territory.</p>
              </div>
              <div className="mt-auto pt-8 flex items-center gap-2 text-foreground">
                <span className="font-sans font-bold text-xs uppercase tracking-widest">Learn More</span>
                <span className="material-symbols-outlined text-lg leading-none">arrow_right_alt</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
