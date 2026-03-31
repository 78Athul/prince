'use client'

import { useEffect, useRef, useState, useActionState } from 'react'
import { updatePhoto, updatePrintSizes } from '../../actions'
import { createClient } from '@/utils/supabase/client'
import { useParams, useRouter } from 'next/navigation'

const CATEGORIES = ['Landscape', 'Urban', 'Abstract', 'Portrait', 'Architecture', 'Nature', 'Street', 'Other']
const PRESET_SIZES = ['4x6', '5x7', '8x10', '11x14', '16x20', '20x24', '24x36']

type PrintSizeRow = { id?: string; size_label: string; price: string; stock_status: string }

export default function EditPhotoPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [photo, setPhoto] = useState<any>(null)
  const [sizes, setSizes] = useState<PrintSizeRow[]>([])
  const [loading, setLoading] = useState(true)
  const [sizesMsg, setSizesMsg] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const [{ data: p }, { data: s }] = await Promise.all([
        supabase.from('prints').select('*').eq('id', id).single(),
        supabase.from('print_sizes').select('*').eq('print_id', id).order('price'),
      ])
      setPhoto(p)
      setSizes(s?.map((r: any) => ({ id: r.id, size_label: r.size_label, price: String(r.price), stock_status: r.stock_status })) || [])
      setLoading(false)
    }
    load()
  }, [id])

  const [state, action, pending] = useActionState(
    async (_prev: { msg: string; error: string }, formData: FormData) => {
      const result = await updatePhoto(id, formData)
      if (result.success) return { msg: 'Photo updated successfully!', error: '' }
      return { msg: '', error: result.error || 'Update failed.' }
    },
    { msg: '', error: '' }
  )

  async function saveSizes() {
    setSizesMsg('')
    const result = await updatePrintSizes(id, sizes)
    setSizesMsg(result.success ? 'Sizes saved!' : (result.error || 'Failed to save sizes.'))
  }

  function addSize() {
    setSizes((prev) => [...prev, { size_label: '', price: '', stock_status: 'available' }])
  }

  if (loading) {
    return <p className="text-white/40 font-label text-xs uppercase tracking-widest">Loading...</p>
  }
  if (!photo) {
    return <p className="text-red-400 font-body text-sm">Photo not found.</p>
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-6 mb-10">
        <button onClick={() => router.back()} className="text-white/30 hover:text-[#bbcac6] transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="font-display text-4xl uppercase tracking-widest text-[#bbcac6]">Edit Photo</h1>
          <p className="font-label text-[10px] text-white/30 tracking-widest mt-1">{photo.title}</p>
        </div>
      </div>

      {/* Current image */}
      <div className="mb-10 border border-white/10 bg-[#111a13] p-4 inline-block">
        <img src={photo.cloudinary_url} alt={photo.title} className="h-40 w-auto object-contain" />
        <p className="font-label text-[10px] text-white/30 tracking-wider mt-3">Current image (cannot be replaced — delete and re-upload to change)</p>
      </div>

      {state.msg && (
        <div className="bg-emerald-900/30 border border-emerald-500/40 text-emerald-400 p-4 font-body text-sm mb-8">{state.msg}</div>
      )}
      {state.error && (
        <div className="bg-red-900/30 border border-red-500/40 text-red-400 p-4 font-body text-sm mb-8">{state.error}</div>
      )}

      {/* Metadata form */}
      <form action={action} ref={formRef} className="flex flex-col gap-6 mb-16">
        <Field label="Title">
          <input name="title" type="text" required defaultValue={photo.title} className="admin-input" />
        </Field>
        <Field label="Description">
          <textarea name="description" rows={3} defaultValue={photo.description || ''} className="admin-input resize-none" />
        </Field>
        <Field label="Alt Text">
          <input name="alt_text" type="text" defaultValue={photo.alt_text || ''} className="admin-input" />
        </Field>
        <Field label="Category">
          <select name="category" defaultValue={photo.category || ''} className="admin-input">
            <option value="">Select a category...</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            name="is_limited_edition"
            id="isLimited"
            defaultChecked={photo.is_limited_edition}
            className="w-5 h-5 accent-[#bbcac6]"
          />
          <label htmlFor="isLimited" className="font-label text-sm text-white/70 tracking-widest uppercase cursor-pointer">
            Limited Edition Series
          </label>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="bg-[#bbcac6] text-[#0e1510] font-label uppercase tracking-widest py-4 text-sm hover:bg-[#dde5dc] transition-colors disabled:opacity-50"
        >
          {pending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Print sizes editor */}
      <div className="border-t border-white/10 pt-10">
        <h2 className="font-label text-xs uppercase tracking-[0.25em] text-[#bbcac6] mb-6">Print Sizes & Prices</h2>

        {sizesMsg && (
          <p className={`font-body text-sm mb-4 ${sizesMsg.includes('saved') ? 'text-emerald-400' : 'text-red-400'}`}>
            {sizesMsg}
          </p>
        )}

        <div className="flex flex-col gap-3 mb-4">
          {sizes.map((s, i) => (
            <div key={i} className="flex gap-3 items-center">
              <select
                value={PRESET_SIZES.includes(s.size_label) ? s.size_label : ''}
                onChange={(e) => {
                  const val = e.target.value
                  if (val) setSizes((prev) => prev.map((r, idx) => idx === i ? { ...r, size_label: val } : r))
                }}
                className="admin-input flex-1"
              >
                <option value="">Custom...</option>
                {PRESET_SIZES.map((ps) => <option key={ps} value={ps}>{ps} inches</option>)}
              </select>
              {!PRESET_SIZES.includes(s.size_label) && (
                <input
                  type="text"
                  value={s.size_label}
                  onChange={(e) => setSizes((prev) => prev.map((r, idx) => idx === i ? { ...r, size_label: e.target.value } : r))}
                  placeholder="e.g. 30x40"
                  className="admin-input w-28"
                />
              )}
              <div className="relative w-32">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-body">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={s.price}
                  onChange={(e) => setSizes((prev) => prev.map((r, idx) => idx === i ? { ...r, price: e.target.value } : r))}
                  className="admin-input w-full pl-7"
                />
              </div>
              <select
                value={s.stock_status}
                onChange={(e) => setSizes((prev) => prev.map((r, idx) => idx === i ? { ...r, stock_status: e.target.value } : r))}
                className="admin-input w-36"
              >
                <option value="available">Available</option>
                <option value="sold_out">Sold Out</option>
              </select>
              {sizes.length > 1 && (
                <button type="button" onClick={() => setSizes((prev) => prev.filter((_, idx) => idx !== i))} className="text-white/30 hover:text-red-400 transition-colors p-2">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={addSize} className="font-label text-[10px] uppercase tracking-wider text-[#bbcac6] hover:text-white border border-white/10 hover:border-[#bbcac6]/40 px-4 py-2 transition-colors">
            + Add Size
          </button>
          <button type="button" onClick={saveSizes} className="font-label text-[10px] uppercase tracking-wider bg-[#bbcac6] text-[#0e1510] px-6 py-2 hover:bg-[#dde5dc] transition-colors">
            Save Sizes
          </button>
        </div>
      </div>

      <style jsx>{`
        .admin-input {
          width: 100%;
          background: #111a13;
          border: 1px solid rgba(255,255,255,0.1);
          color: #dde5dc;
          padding: 12px 16px;
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .admin-input:focus { border-color: rgba(187,202,198,0.5); }
        .admin-input option { background: #111a13; }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-label text-xs uppercase tracking-[0.2em] text-[#bbcac6]">{label}</label>
      {children}
    </div>
  )
}
