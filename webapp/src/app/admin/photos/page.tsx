import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { togglePhotoAvailability, deletePhoto } from './actions'

export default async function AdminPhotosPage() {
  const supabase = await createClient()
  const { data: photos, error } = await supabase
    .from('prints')
    .select('*, print_sizes(id, size_label, price, stock_status)')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-widest text-[#bbcac6] mb-1">Photos</h1>
          <p className="font-label text-[10px] uppercase tracking-widest text-white/30">
            {photos?.length ?? 0} total
          </p>
        </div>
        <Link
          href="/admin/photos/new"
          className="bg-[#bbcac6] text-[#0e1510] font-label text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#dde5dc] transition-colors"
        >
          + Add Photo
        </Link>
      </div>

      {error && (
        <p className="text-red-400 font-body text-sm mb-8">Error: {error.message}</p>
      )}

      {!photos || photos.length === 0 ? (
        <div className="border border-dashed border-white/10 p-16 text-center">
          <p className="text-white/30 font-label text-sm tracking-widest">No photos yet.</p>
          <Link href="/admin/photos/new" className="text-[#bbcac6] font-label text-xs uppercase tracking-widest mt-4 inline-block hover:underline">
            Upload your first photo →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-px">
          {photos.map((photo: any) => (
            <div
              key={photo.id}
              className="flex items-center gap-6 bg-[#111a13] border border-white/5 px-6 py-4 group"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 shrink-0 bg-black overflow-hidden">
                <img
                  src={photo.cloudinary_url}
                  alt={photo.alt_text || photo.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-[#bbcac6] truncate">{photo.title}</p>
                <p className="font-label text-[10px] text-white/40 tracking-wider mt-0.5">
                  {photo.category || 'Uncategorized'} ·{' '}
                  {photo.print_sizes?.length ?? 0} size{photo.print_sizes?.length !== 1 ? 's' : ''}
                  {photo.base_price ? ` · from $${Number(photo.base_price).toFixed(2)}` : ''}
                </p>
              </div>

              {/* Availability badge */}
              <span
                className={`font-label text-[10px] uppercase tracking-widest px-3 py-1 shrink-0 ${
                  photo.is_available !== false
                    ? 'bg-emerald-900/30 text-emerald-400'
                    : 'bg-white/5 text-white/30'
                }`}
              >
                {photo.is_available !== false ? 'Available' : 'Hidden'}
              </span>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <form
                  action={async () => {
                    'use server'
                    await togglePhotoAvailability(photo.id, photo.is_available !== false)
                  }}
                >
                  <button
                    type="submit"
                    className="font-label text-[10px] uppercase tracking-wider px-4 py-2 border border-white/10 text-white/50 hover:border-[#bbcac6]/40 hover:text-[#bbcac6] transition-colors"
                  >
                    {photo.is_available !== false ? 'Hide' : 'Show'}
                  </button>
                </form>

                <Link
                  href={`/admin/photos/${photo.id}/edit`}
                  className="font-label text-[10px] uppercase tracking-wider px-4 py-2 border border-white/10 text-white/50 hover:border-[#bbcac6]/40 hover:text-[#bbcac6] transition-colors"
                >
                  Edit
                </Link>

                <form
                  action={async () => {
                    'use server'
                    await deletePhoto(photo.id)
                  }}
                >
                  <button
                    type="submit"
                    className="font-label text-[10px] uppercase tracking-wider px-4 py-2 border border-white/10 text-white/50 hover:border-red-500/40 hover:text-red-400 transition-colors"
                    onClick={(e) => {
                      if (!confirm(`Delete "${photo.title}"? This cannot be undone.`)) {
                        e.preventDefault()
                      }
                    }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
