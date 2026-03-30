'use server'

import { createClient } from '@/utils/supabase/server'
import cloudinary from '@/utils/cloudinary'
import { revalidatePath } from 'next/cache'

export async function uploadPrint(formData: FormData) {
  const supabase = await createClient()

  // Verify Auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Parse Form Data
  const title = formData.get('title') as string
  const basePrice = parseFloat(formData.get('basePrice') as string)
  const isLimited = formData.get('isLimited') === 'on'
  const file = formData.get('image') as File

  if (!file || !title || isNaN(basePrice)) {
    return { error: "Missing required fields." }
  }

  // Convert File to ArrayBuffer -> Buffer for Cloudinary Upload Stream
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Upload to Cloudinary using automatic format (WebP/AVIF)
  const cloudinaryResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'gallery_prints', format: 'auto' },
      (error, result) => {
        if (result) resolve(result)
        else reject(error)
      }
    )
    uploadStream.end(buffer)
  }) as { secure_url: string }

  // Store in Supabase 'prints' Table
  const { error: dbError } = await supabase
    .from('prints')
    .insert([
      {
        title,
        base_price: basePrice,
        is_limited_edition: isLimited,
        cloudinary_url: cloudinaryResult.secure_url,
      }
    ])

  if (dbError) {
    console.error("Supabase Database Error:", dbError)
    return { error: "Failed to create database record." }
  }

  revalidatePath('/')
  return { success: true }
}
