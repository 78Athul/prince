'use server'

import { createClient } from '@/utils/supabase/server'
import cloudinary from '@/utils/cloudinary'
import { revalidatePath } from 'next/cache'

export async function uploadPhoto(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const altText = (formData.get('alt_text') as string) || title
  const category = formData.get('category') as string
  const placement = (formData.get('placement') as string) || 'gallery'
  const isLimited = formData.get('is_limited_edition') === 'on'
  const file = formData.get('image') as File
  const sizesRaw = formData.get('print_sizes') as string
  const sizes: { size_label: string; price: string }[] = sizesRaw ? JSON.parse(sizesRaw) : []

  if (!file || file.size === 0) return { error: 'Please select an image file.' }
  if (!title.trim()) return { error: 'Title is required.' }
  if (sizes.length === 0) return { error: 'Add at least one print size and price.' }

  // Upload original to Cloudinary
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  let cloudinaryResult: { secure_url: string; public_id: string }
  try {
    cloudinaryResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'gallery_prints', resource_type: 'image' },
        (err, result) => {
          if (result) resolve(result as { secure_url: string; public_id: string })
          else reject(err)
        }
      )
      stream.end(buffer)
    })
  } catch (err: any) {
    return { error: `Image upload failed: ${err.message}` }
  }

  const validPrices = sizes.map((s) => parseFloat(s.price)).filter((p) => !isNaN(p))
  const basePrice = validPrices.length > 0 ? Math.min(...validPrices) : 0

  if (placement !== 'gallery') {
    await supabase.from('prints').update({ placement: 'gallery' }).eq('placement', placement)
  }

  const { data: print, error: printError } = await supabase
    .from('prints')
    .insert({
      title: title.trim(),
      description: description?.trim() || null,
      alt_text: altText.trim(),
      category: category || null,
      placement: placement,
      is_limited_edition: isLimited,
      is_available: true,
      cloudinary_url: cloudinaryResult.secure_url,
      base_price: basePrice,
    })
    .select()
    .single()

  if (printError) return { error: printError.message }

  const { error: sizesError } = await supabase.from('print_sizes').insert(
    sizes.map((s) => ({
      print_id: print.id,
      size_label: s.size_label.trim(),
      price: parseFloat(s.price),
      stock_status: 'available',
    }))
  )
  if (sizesError) return { error: sizesError.message }

  revalidatePath('/admin/photos')
  revalidatePath('/shop')
  revalidatePath('/')
  return { success: true }
}

export async function togglePhotoAvailability(id: string, currentlyAvailable: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('prints')
    .update({ is_available: !currentlyAvailable })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/photos')
  revalidatePath('/shop')
  return { success: true }
}

export async function deletePhoto(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { data: print } = await supabase
    .from('prints')
    .select('cloudinary_url')
    .eq('id', id)
    .single()

  const { error } = await supabase.from('prints').delete().eq('id', id)
  if (error) return { error: error.message }

  // Clean up Cloudinary asset
  if (print?.cloudinary_url) {
    try {
      const match = print.cloudinary_url.match(/\/gallery_prints\/([^.]+)/)
      if (match) await cloudinary.uploader.destroy(`gallery_prints/${match[1]}`)
    } catch {
      // Non-fatal
    }
  }

  revalidatePath('/admin/photos')
  revalidatePath('/shop')
  return { success: true }
}

export async function updatePhoto(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const title = (formData.get('title') as string)?.trim()
  const description = (formData.get('description') as string)?.trim() || null
  const altText = (formData.get('alt_text') as string)?.trim() || title
  const category = (formData.get('category') as string) || null
  const placement = (formData.get('placement') as string) || 'gallery'
  const isLimited = formData.get('is_limited_edition') === 'on'

  if (placement !== 'gallery') {
    await supabase.from('prints').update({ placement: 'gallery' }).eq('placement', placement).neq('id', id)
  }

  const { error } = await supabase
    .from('prints')
    .update({ title, description, alt_text: altText, category, placement, is_limited_edition: isLimited })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/photos')
  revalidatePath(`/shop/${id}`)
  return { success: true }
}

export async function updatePhotoImage(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const file = formData.get('image') as File
  if (!file || file.size === 0) return { error: 'Please select an image file.' }

  // Fetch current cloudinary_url so we can delete the old asset
  const { data: print } = await supabase
    .from('prints')
    .select('cloudinary_url')
    .eq('id', id)
    .single()

  // Upload new image to Cloudinary
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  let cloudinaryResult: { secure_url: string }
  try {
    cloudinaryResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'gallery_prints', resource_type: 'image' },
        (err, result) => {
          if (result) resolve(result as { secure_url: string })
          else reject(err)
        }
      )
      stream.end(buffer)
    })
  } catch (err: any) {
    return { error: `Image upload failed: ${err.message}` }
  }

  // Update the record with the new URL
  const { error } = await supabase
    .from('prints')
    .update({ cloudinary_url: cloudinaryResult.secure_url })
    .eq('id', id)

  if (error) return { error: error.message }

  // Delete old Cloudinary asset (non-fatal)
  if (print?.cloudinary_url) {
    try {
      const match = print.cloudinary_url.match(/\/gallery_prints\/([^.]+)/)
      if (match) await cloudinary.uploader.destroy(`gallery_prints/${match[1]}`)
    } catch {
      // Non-fatal
    }
  }

  revalidatePath('/admin/photos')
  revalidatePath(`/admin/photos/${id}/edit`)
  revalidatePath(`/shop/${id}`)
  revalidatePath(`/prints/${id}`)
  revalidatePath('/shop')
  revalidatePath('/gallery')
  revalidatePath('/')
  return { success: true }
}

export async function updatePrintSizes(printId: string, sizes: { size_label: string; price: string; stock_status: string }[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  // Replace all sizes for this photo
  await supabase.from('print_sizes').delete().eq('print_id', printId)

  if (sizes.length > 0) {
    const { error } = await supabase.from('print_sizes').insert(
      sizes.map((s) => ({
        print_id: printId,
        size_label: s.size_label.trim(),
        price: parseFloat(s.price),
        stock_status: s.stock_status || 'available',
      }))
    )
    if (error) return { error: error.message }
  }

  // Update base_price to lowest size price
  const prices = sizes.map((s) => parseFloat(s.price)).filter((p) => !isNaN(p))
  if (prices.length > 0) {
    await supabase.from('prints').update({ base_price: Math.min(...prices) }).eq('id', printId)
  }

  revalidatePath('/admin/photos')
  revalidatePath(`/shop/${printId}`)
  return { success: true }
}
