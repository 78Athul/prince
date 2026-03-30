'use client'

import { useActionState, useRef } from 'react'
import { uploadPrint } from './actions'

export default function UploadPrintPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, pending] = useActionState(async (prevState: { msg: string, error: string }, formData: FormData) => {
    const result = await uploadPrint(formData)
    if (result.success) {
      formRef.current?.reset()
      return { msg: "Print uploaded successfully to Cloudinary and Synced to DB.", error: "" }
    }
    return { msg: "", error: result.error || "Failed." }
  }, { msg: "", error: "" })

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-5xl uppercase tracking-widest text-[#bbcac6] mb-12">New Print</h1>
      
      {state.msg && <div className="bg-[#bbcac6]/20 border border-[#bbcac6] text-[#bbcac6] p-4 font-body mb-8">{state.msg}</div>}
      {state.error && <div className="bg-[#ffb4ab]/20 border border-[#ffb4ab] text-[#ffb4ab] p-4 font-body mb-8">{state.error}</div>}

      <form action={action} ref={formRef} className="flex flex-col gap-8 bg-surface-container-low p-8 border border-outline-variant/20 shadow-xl">
        
        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <label className="font-label text-xs uppercase tracking-[0.2em] text-[#bbcac6]" htmlFor="title">Print Title</label>
          <input 
            className="bg-surface border border-outline-variant/30 text-on-surface p-4 font-body focus:border-[#bbcac6] outline-none" 
            id="title" name="title" type="text" placeholder="e.g. Concrete Horizon" required 
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
            {/* Price Input */}
            <div className="flex flex-col gap-2">
            <label className="font-label text-xs uppercase tracking-[0.2em] text-[#bbcac6]" htmlFor="basePrice">Base Price (USD)</label>
            <input 
                className="bg-surface border border-outline-variant/30 text-on-surface p-4 font-body focus:border-[#bbcac6] outline-none" 
                id="basePrice" name="basePrice" type="number" min="0" step="0.01" placeholder="150.00" required 
            />
            </div>

            {/* Limited Edition Toggle */}
            <div className="flex flex-col gap-2 justify-center pt-6">
                <label className="flex items-center gap-4 cursor-pointer">
                    <input type="checkbox" name="isLimited" className="w-6 h-6 accent-[#bbcac6]" />
                    <span className="font-label text-sm tracking-widest text-[#bbcac6] uppercase">Limited Edition Series</span>
                </label>
            </div>
        </div>

        {/* File Input */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="font-label text-xs uppercase tracking-[0.2em] text-[#bbcac6]" htmlFor="image">High-Res Image (Will be Auto-Optimized to WebP/AVIF)</label>
          <div className="border-2 border-dashed border-outline-variant/30 hover:border-[#bbcac6]/50 bg-surface transition-colors">
            <input 
              className="w-full text-on-surface file:mr-4 file:py-4 file:px-8 file:border-0 file:bg-[#bbcac6] file:text-[#0e1510] file:font-label file:uppercase file:text-xs file:tracking-widest file:cursor-pointer p-4 h-full" 
              id="image" name="image" type="file" accept="image/*" required 
            />
          </div>
        </div>

        <button disabled={pending} type="submit" className="mt-8 bg-[#bbcac6] text-[#0e1510] font-label uppercase tracking-widest py-5 text-sm hover:bg-[#d7e6e2] transition-colors disabled:opacity-50">
          {pending ? "Uploading & Syncing..." : "Publish Print"}
        </button>
      </form>
    </div>
  )
}
