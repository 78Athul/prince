/**
 * Generates a watermarked, downscaled preview URL from a Cloudinary original URL.
 * The original URL is never exposed to the frontend — only the preview is served publicly.
 */
export function getPreviewUrl(cloudinaryUrl: string): string {
  if (!cloudinaryUrl) return ''
  const uploadIndex = cloudinaryUrl.indexOf('/upload/')
  if (uploadIndex === -1) return cloudinaryUrl
  const before = cloudinaryUrl.substring(0, uploadIndex + 8)
  const after = cloudinaryUrl.substring(uploadIndex + 8)
  // Scale to max 1500px wide, 75% quality, with a subtle text watermark
  return `${before}c_limit,w_1500,q_75,l_text:Arial_48_bold:PREVIEW%20ONLY,co_white,o_25,g_center/${after}`
}

/**
 * Generates a thumbnail URL (500px wide) for grid/card display.
 */
export function getThumbnailUrl(cloudinaryUrl: string): string {
  if (!cloudinaryUrl) return ''
  const uploadIndex = cloudinaryUrl.indexOf('/upload/')
  if (uploadIndex === -1) return cloudinaryUrl
  const before = cloudinaryUrl.substring(0, uploadIndex + 8)
  const after = cloudinaryUrl.substring(uploadIndex + 8)
  return `${before}c_limit,w_800,q_70/${after}`
}
