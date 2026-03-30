import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import NavBar from '@/components/NavBar'
import PrintConfigurator from '@/components/PrintConfigurator'

export default async function PrintDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  // Fetch the specific print by ID
  const { data: print } = await supabase
    .from('prints')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!print) {
    notFound()
  }

  return (
    <>
      <NavBar />
      
      <main className="relative pt-32 min-h-screen">
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
