import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch all prints from the database
  const { data: prints, error } = await supabase
    .from('prints')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl">
      <h1 className="font-display text-5xl uppercase tracking-widest text-[#bbcac6] mb-12">Inventory</h1>
      
      {error && <p className="text-red-500 mb-8">Failed to load prints: {error.message}</p>}

      {!prints || prints.length === 0 ? (
        <div className="p-12 border border-dashed border-outline-variant/30 text-center text-on-surface-variant font-label tracking-wide">
          No prints in inventory. Add one from the upload tab.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {prints.map((print: any) => (
            <div key={print.id} className="bg-surface-container-low border border-outline-variant/20 p-4 shadow-lg group">
              <div className="aspect-[4/5] overflow-hidden mb-4 relative bg-black/50">
                {/* Cloudinary URL stored in DB */}
                <img 
                  src={print.cloudinary_url} 
                  alt={print.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                {print.is_limited_edition && (
                  <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 font-label text-[10px] uppercase tracking-widest">
                    Limited
                  </div>
                )}
              </div>
              <h3 className="font-headline text-xl text-[#bbcac6]">{print.title}</h3>
              <p className="font-label text-sm text-outline tracking-wider mt-1">${print.base_price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
