import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import NavBar from '@/components/NavBar'
import PrintConfigurator from '@/components/PrintConfigurator'
import AddToCartButton from '@/components/AddToCartButton'
import { dummyPrints } from '@/lib/dummy-data'

export default async function PrintDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch the specific print by ID
  let print;
  
  try {
    const { data } = await supabase
      .from('prints')
      .select('*')
      .eq('id', id)
      .single()
      
    if (data) print = data;
  } catch (e) {
    // Supabase query failed or threw an error
  }

  if (!print) {
    print = dummyPrints.find(p => p.id === id)
  }

  if (!print) {
    notFound()
  }

  return (
    <>
      <NavBar />
      
      {/* MOBILE VIEW (Stitch) */}
      <div className="block md:hidden pt-0 text-on-surface font-body bg-surface min-h-screen">
        <main className="pb-32">
          {/* Full-bleed Hero Image */}
          <section className="relative w-full aspect-[4/5] bg-surface-container-lowest overflow-hidden">
            <img alt={print.title} className="w-full h-full object-cover" src={print.cloudinary_url}/>
            {print.is_limited_edition && (
              <div className="absolute top-6 left-6 bg-primary text-on-primary px-3 py-1 text-[10px] font-label font-bold tracking-[0.2rem] uppercase">
                LIMITED EDITION
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          </section>

          {/* Product Details Content */}
          <section className="px-6 mt-12 space-y-16">
            {/* Header Group */}
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <h2 className="font-headline text-4xl font-light tracking-tight text-on-background leading-tight">
                    {print.title}
                </h2>
                <span className="font-display text-3xl text-primary">${print.base_price}</span>
              </div>
              <p className="font-body text-base font-light leading-relaxed text-on-surface-variant max-w-sm">
                {print.description}
              </p>
            </div>

            {/* Dimensions Selector */}
            <div className="space-y-6">
              <label className="font-label text-[10px] font-bold tracking-[0.2rem] uppercase text-primary opacity-60">DIMENSIONS</label>
              <div className="grid grid-cols-3 gap-px bg-outline-variant/20">
                <button className="py-5 text-center bg-primary-container text-on-primary-container font-body text-sm transition-all duration-400">8x10</button>
                <button className="py-5 text-center bg-surface-container-high text-on-surface font-body text-sm hover:bg-surface-container-highest transition-all duration-400">16x20</button>
                <button className="py-5 text-center bg-surface-container-high text-on-surface font-body text-sm hover:bg-surface-container-highest transition-all duration-400">24x36</button>
              </div>
            </div>

            {/* Paper Type Selection */}
            <div className="space-y-6">
              <label className="font-label text-[10px] font-bold tracking-[0.2rem] uppercase text-primary opacity-60">PAPER TYPE</label>
              <div className="relative group">
                <select className="w-full appearance-none bg-transparent border-t-0 border-x-0 border-b border-outline-variant/40 py-4 font-body text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer">
                  <option className="bg-surface-container-high">Hahnemühle Photo Rag (Matte)</option>
                  <option className="bg-surface-container-high">Epson Exhibition Luster</option>
                  <option className="bg-surface-container-high">Canson Infinity Platine</option>
                </select>
                <span className="material-symbols-outlined absolute right-0 top-4 pointer-events-none text-outline-variant">expand_more</span>
              </div>
            </div>

            {/* Frame Selector */}
            <div className="space-y-6">
              <label className="font-label text-[10px] font-bold tracking-[0.2rem] uppercase text-primary opacity-60">FRAME SELECTION</label>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 border border-primary text-primary font-body text-xs tracking-wider uppercase bg-primary/5">Unframed</button>
                <button className="px-6 py-3 border border-outline-variant/30 text-on-surface-variant font-body text-xs tracking-wider uppercase hover:border-outline transition-all duration-400">Walnut</button>
                <button className="px-6 py-3 border border-outline-variant/30 text-on-surface-variant font-body text-xs tracking-wider uppercase hover:border-outline transition-all duration-400">Matte Black</button>
                <button className="px-6 py-3 border border-outline-variant/30 text-on-surface-variant font-body text-xs tracking-wider uppercase hover:border-outline transition-all duration-400">Maple</button>
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="flex flex-col gap-6 pt-8">
              <div className="flex items-center justify-between border border-outline-variant/20 p-2">
                <span className="font-label text-[10px] font-bold tracking-[0.2rem] uppercase ml-4 opacity-60">QUANTITY</span>
                <div className="flex items-center gap-6">
                  <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="font-headline text-xl">1</span>
                  <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
              <AddToCartButton 
                item={{
                  id: print.id,
                  title: print.title,
                  price: print.base_price,
                  imageUrl: print.cloudinary_url,
                  isLimited: print.is_limited_edition,
                  frame: 'Unframed'
                }}
                label="ADD TO CART"
                className="w-full bg-primary-container text-on-primary-container py-6 font-headline text-lg tracking-widest uppercase flex items-center justify-center gap-4 hover:bg-primary transition-all duration-400 group"
              />
            </div>

            {/* Curator Note Section */}
            <div className="pt-16 pb-12 border-t border-outline-variant/10">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2">
                  <span className="material-symbols-outlined text-primary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                </div>
                <div className="col-span-10">
                  <h4 className="font-headline text-sm uppercase tracking-widest text-primary mb-2">Curator's Note</h4>
                  <p className="font-body text-xs font-light leading-relaxed text-on-surface-variant opacity-70 italic">
                    "This piece was captured during the pre-dawn silence. The lack of standard contrast allows the ethereal mist to become a physical presence in the print."
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* DESKTOP VIEW */}
      <main className="hidden md:block relative pt-40 px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
        {/* Ambient Orbs */}
        <div className="fixed top-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary rounded-full blur-[120px] opacity-[0.05] pointer-events-none -z-10"></div>
        
        <section className="px-6 md:px-12 py-12 max-w-[1440px] mx-auto min-h-[80vh] flex items-center">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 w-full h-full">
            
            {/* Left Column: Image */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-container relative">
              <img 
                src={print.cloudinary_url} 
                alt={print.title} 
                className="max-h-[75vh] w-auto object-contain shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20"></div>
            </div>

            {/* Right Column: Configurator */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center py-12">
              <PrintConfigurator print={{
                id: print.id,
                title: print.title,
                base_price: print.base_price,
                cloudinary_url: print.cloudinary_url,
                is_limited_edition: print.is_limited_edition
              }} />
            </div>

          </div>
        </section>
      </main>
    </>
  )
}
