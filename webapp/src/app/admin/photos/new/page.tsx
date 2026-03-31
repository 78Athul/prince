'use client'

import { useRef, useState, useActionState } from 'react'
import { uploadPhoto } from '../actions'

type PrintSize = { size_label: string; price: string }

const CATEGORIES = ['Landscape', 'Urban', 'Abstract', 'Portrait', 'Architecture', 'Nature', 'Street', 'Other']
const PRESET_SIZES = ['4x6', '5x7', '8x10', '11x14', '16x20', '20x24', '24x36']

export default function NewPhotoPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [sizes, setSizes] = useState<PrintSize[]>([{ size_label: '8x10', price: '' }])
  const [preview, setPreview] = useState<string | null>(null)

  const [state, action, pending] = useActionState(
    async (_prev: { msg: string; error: string }, formData: FormData) => {
      // Inject print sizes as JSON into the form
      formData.set('print_sizes', JSON.stringify(sizes))
      const result = await uploadPhoto(formData)
      if (result.success) {
        formRef.current?.reset()
        setSizes([{ size_label: '8x10', price: '' }])
        setPreview(null)
        return { msg: 'Photo uploaded and published successfully!', error: '' }
      }
      return { msg: '', error: result.error || 'Upload failed.' }
    },
    { msg: '', error: '' }
  )

  function addSize() {
    setSizes((prev) => [...prev, { size_label: '', price: '' }])
  }

  function removeSize(i: number) {
    setSizes((prev) => prev.filter((_, idx) => idx !== i))
  }

  function updateSize(i: number, field: keyof PrintSize, value: string) {
    setSizes((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl uppercase tracking-widest text-[#bbcac6] mb-2">Add New Photo</h1>
      <p className="font-label text-[10px] uppercase tracking-widest text-white/30 mb-10">
        Fill in all fields. Customers will see exactly what you enter here.
      </p>

      {state.msg && (
        <div className="bg-emerald-900/30 border border-emerald-500/40 text-emerald-400 p-4 font-body text-sm mb-8">
          {state.msg}
        </div>
      )}
      {state.error && (
        <div className="bg-red-900/30 border border-red-500/40 text-red-400 p-4 font-body text-sm mb-8">
          {state.error}
        </div>
      )}

      <form action={action} ref={formRef} className="flex flex-col gap-8">

        {/* Image Upload */}
        <Field label="Photo Image" hint="Upload the original high-resolution file. It will be automatically optimized.">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 hover:border-[#bbcac6]/40 bg-[#111a13] cursor-pointer transition-colors min-h-[180px] relative overflow-hidden">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-3 py-12">
                <span className="material-symbols-outlined text-4xl text-white/30">cloud_upload</span>
                <p className="font-label text-xs uppercase tracking-widest text-white/40">Click or drag photo here</p>
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </Field>

        {/* Title */}
        <Field label="Photo Title" hint="e.g. 'Concrete Horizon' — shown to customers">
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. Concrete Horizon"
            className="admin-input"
          />
        </Field>

        {/* Description */}
        <Field label="Description" hint="A sentence or two about this photo — shown on the product page">
          <textarea
            name="description"
            rows={3}
            placeholder="Captured at dusk on the east side of the city..."
            className="admin-input resize-none"
          />
        </Field>

        {/* Alt Text */}
        <Field label="Alt Text (for accessibility & SEO)" hint="Describe the photo visually. If left blank, the title will be used.">
          <input
            name="alt_text"
            type="text"
            placeholder="e.g. Black and white shot of a brutalist concrete building at dusk"
            className="admin-input"
          />
        </Field>

        {/* Category */}
        <Field label="Category" hint="Helps customers browse and filter prints">
          <select name="category" className="admin-input">
            <option value="">Select a category...</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        {/* Limited Edition */}
        <div className="flex items-center gap-4">
          <input type="checkbox" name="is_limited_edition" id="isLimited" className="w-5 h-5 accent-[#bbcac6]" />
          <label htmlFor="isLimited" className="font-label text-sm text-white/70 tracking-widest uppercase cursor-pointer">
            Limited Edition Series
          </label>
        </div>

        {/* Print Sizes */}
        <div>
          <p className="font-label text-xs uppercase tracking-[0.2em] text-[#bbcac6] mb-1">Print Sizes & Prices</p>
          <p className="font-label text-[10px] text-white/30 mb-6 tracking-wider">
            Add every size you offer and its price. You can add as many as you like.
          </p>

          <div className="flex flex-col gap-3 mb-4">
            {sizes.map((s, i) => (
              <div key={i} className="flex gap-3 items-center">
                {/* Size label */}
                <div className="flex-1">
                  <select
                    value={s.size_label}
                    onChange={(e) => updateSize(i, 'size_label', e.target.value)}
                    className="admin-input w-full"
                  >
                    <option value="">Custom size...</option>
                    {PRESET_SIZES.map((ps) => (
                      <option key={ps} value={ps}>{ps} inches</option>
                    ))}
                  </select>
                  {/* Allow custom size if not in presets */}
                  {!PRESET_SIZES.includes(s.size_label) && (
                    <input
                      type="text"
                      value={s.size_label}
                      onChange={(e) => updateSize(i, 'size_label', e.target.value)}
                      placeholder="e.g. 30x40"
                      className="admin-input w-full mt-2"
                    />
                  )}
                </div>

                {/* Price */}
                <div className="w-36">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-body">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={s.price}
                      onChange={(e) => updateSize(i, 'price', e.target.value)}
                      placeholder="0.00"
                      className="admin-input w-full pl-7"
                      required
                    />
                  </div>
                </div>

                {/* Remove */}
                {sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSize(i)}
                    className="text-white/30 hover:text-red-400 transition-colors p-2"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSize}
            className="font-label text-[10px] uppercase tracking-wider text-[#bbcac6] hover:text-white border border-white/10 hover:border-[#bbcac6]/40 px-4 py-2 transition-colors"
          >
            + Add Another Size
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="mt-4 bg-[#bbcac6] text-[#0e1510] font-label uppercase tracking-widest py-5 text-sm hover:bg-[#dde5dc] transition-colors disabled:opacity-50"
        >
          {pending ? 'Uploading...' : 'Publish Photo'}
        </button>
      </form>

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
        .admin-input:focus {
          border-color: rgba(187,202,198,0.5);
        }
        .admin-input option {
          background: #111a13;
        }
      `}</style>
    </div>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-label text-xs uppercase tracking-[0.2em] text-[#bbcac6]">{label}</label>
      {hint && <p className="font-label text-[10px] text-white/30 tracking-wider -mt-1">{hint}</p>}
      {children}
    </div>
  )
}
