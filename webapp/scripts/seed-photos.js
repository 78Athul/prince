// One-time seed script: uploads all local photos to Cloudinary + Supabase
// Run from webapp/: node scripts/seed-photos.js

const fs = require('fs')
const path = require('path')

// Load .env.local
const envPath = path.resolve(__dirname, '../.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx < 0) continue
  process.env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim()
}

const cloudinary = require('cloudinary').v2
const { createClient } = require('@supabase/supabase-js')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const PHOTOS_DIR = path.resolve(__dirname, '../public/assets/photos')

const prints = [
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.15 AM (1).jpeg',
    title: 'Ethereal Highlands',
    description: 'A breathtaking capture of mist-rolling hills at dawn.',
    base_price: 350.00,
    is_limited_edition: true,
    category: 'Landscape',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.15 AM (2).jpeg',
    title: 'Monolithic Shadows',
    description: 'Architectural purity wrapped in deep shadows.',
    base_price: 275.00,
    is_limited_edition: false,
    category: 'Architecture',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.15 AM.jpeg',
    title: 'The Silent Forest',
    description: 'Ancient trees standing tall in the morning mist.',
    base_price: 420.00,
    is_limited_edition: true,
    category: 'Nature',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.16 AM (1).jpeg',
    title: 'Urban Geometry',
    description: 'Sharp lines and brutalist structures reaching towards the sky.',
    base_price: 310.00,
    is_limited_edition: false,
    category: 'Urban',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.16 AM (2).jpeg',
    title: 'Coastal Whispers',
    description: 'The gentle waves crashing against rugged cliffs.',
    base_price: 380.00,
    is_limited_edition: true,
    category: 'Landscape',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.16 AM (3).jpeg',
    title: 'Desert At Noon',
    description: 'Sun-drenched sands reflecting golden light.',
    base_price: 290.00,
    is_limited_edition: false,
    category: 'Landscape',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.16 AM.jpeg',
    title: 'The Yellow Studio',
    description: 'Our monthly curated selection featuring vibrant architectural contrasts. Only 50 signed and numbered 24x36 prints available globally.',
    base_price: 450.00,
    is_limited_edition: true,
    category: 'Urban',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.17 AM (1).jpeg',
    title: 'Midnight Reflections',
    description: 'A tranquil lake beneath a star-studded sky.',
    base_price: 500.00,
    is_limited_edition: true,
    category: 'Landscape',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.17 AM (2).jpeg',
    title: 'Concrete Jungle',
    description: 'The bustling heart of the metropolis in monochrome.',
    base_price: 240.00,
    is_limited_edition: false,
    category: 'Urban',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.17 AM.jpeg',
    title: 'Golden Hour',
    description: 'The fleeting moment when daylight turns to gold.',
    base_price: 330.00,
    is_limited_edition: false,
    category: 'Landscape',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.18 AM (1).jpeg',
    title: 'Abstract Tides',
    description: 'A surreal interpretation of ocean currents.',
    base_price: 410.00,
    is_limited_edition: true,
    category: 'Abstract',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.18 AM (2).jpeg',
    title: 'Vertical Symmetry',
    description: 'Perfect natural reflections on a still pond.',
    base_price: 280.00,
    is_limited_edition: false,
    category: 'Nature',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.18 AM.jpeg',
    title: 'Alpine Silence',
    description: 'Snow-capped peaks dominating the horizon.',
    base_price: 360.00,
    is_limited_edition: false,
    category: 'Landscape',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.19 AM (1).jpeg',
    title: 'Industrial Echoes',
    description: 'Abandoned machinery telling forgotten stories.',
    base_price: 310.00,
    is_limited_edition: false,
    category: 'Urban',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.19 AM (2).jpeg',
    title: 'The Long Road',
    description: 'An isolated strip of asphalt disappearing into the horizon.',
    base_price: 295.00,
    is_limited_edition: false,
    category: 'Landscape',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.19 AM.jpeg',
    title: 'Neon Nights',
    description: 'Vivid city lights piercing through the midnight fog.',
    base_price: 390.00,
    is_limited_edition: true,
    category: 'Street',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.44 AM (1).jpeg',
    title: 'Autumn Canopy',
    description: 'A kaleidoscope of falling leaves in an old-growth forest.',
    base_price: 340.00,
    is_limited_edition: false,
    category: 'Nature',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.44 AM (2).jpeg',
    title: 'Morning Dew',
    description: 'Macroscopic perfection captured on a single blade of grass.',
    base_price: 260.00,
    is_limited_edition: false,
    category: 'Nature',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.44 AM (3).jpeg',
    title: 'Crystal Ice',
    description: 'Frozen formations glistening in the winter sun.',
    base_price: 325.00,
    is_limited_edition: false,
    category: 'Nature',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.44 AM (4).jpeg',
    title: 'Solar Flare',
    description: 'Dynamic streaks of light across a clouded sky.',
    base_price: 480.00,
    is_limited_edition: true,
    category: 'Landscape',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.44 AM (5).jpeg',
    title: 'Serengeti Migration',
    description: 'A powerful moment frozen in the vast plains.',
    base_price: 550.00,
    is_limited_edition: true,
    category: 'Nature',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.44 AM (6).jpeg',
    title: 'Volcanic Ash',
    description: 'Textured landscapes carved by ancient eruptions.',
    base_price: 310.00,
    is_limited_edition: false,
    category: 'Landscape',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.44 AM (7).jpeg',
    title: 'The Obelisk',
    description: 'A striking minimalist composition of a lone monument.',
    base_price: 290.00,
    is_limited_edition: false,
    category: 'Architecture',
  },
  {
    localFile: 'WhatsApp Image 2026-03-30 at 10.14.44 AM.jpeg',
    title: 'Cinematic Gallery Wall',
    description: 'A curated aesthetic defining the modern spatial experience.',
    base_price: 490.00,
    is_limited_edition: true,
    category: 'Abstract',
  },
]

async function main() {
  console.log(`Starting upload of ${prints.length} photos...\n`)

  // Check for existing titles to avoid duplicates
  const { data: existing } = await supabase.from('prints').select('title')
  const existingTitles = new Set((existing || []).map((p) => p.title))

  let uploaded = 0
  let skipped = 0
  let failed = 0

  for (const print of prints) {
    if (existingTitles.has(print.title)) {
      console.log(`⏭  Skipping "${print.title}" (already in DB)`)
      skipped++
      continue
    }

    const filePath = path.join(PHOTOS_DIR, print.localFile)
    if (!fs.existsSync(filePath)) {
      console.error(`✗  File not found: ${print.localFile}`)
      failed++
      continue
    }

    process.stdout.write(`⬆  Uploading "${print.title}"... `)

    let cloudinaryResult
    try {
      cloudinaryResult = await cloudinary.uploader.upload(filePath, {
        folder: 'gallery_prints',
        resource_type: 'image',
      })
    } catch (err) {
      console.error(`FAILED (Cloudinary): ${err.message}`)
      failed++
      continue
    }

    const { data: printRecord, error: printError } = await supabase
      .from('prints')
      .insert({
        title: print.title,
        description: print.description,
        alt_text: print.title,
        category: print.category,
        is_limited_edition: print.is_limited_edition,
        is_available: true,
        cloudinary_url: cloudinaryResult.secure_url,
        base_price: print.base_price,
      })
      .select()
      .single()

    if (printError) {
      console.error(`FAILED (Supabase): ${printError.message}`)
      failed++
      continue
    }

    // Insert 3 default sizes: 8x10, 16x20, 24x36
    const sizes = [
      { size_label: '8x10',  price: print.base_price },
      { size_label: '16x20', price: Math.round(print.base_price * 1.5 * 100) / 100 },
      { size_label: '24x36', price: Math.round(print.base_price * 2   * 100) / 100 },
    ]

    const { error: sizesError } = await supabase.from('print_sizes').insert(
      sizes.map((s) => ({
        print_id: printRecord.id,
        size_label: s.size_label,
        price: s.price,
        stock_status: 'available',
      }))
    )

    if (sizesError) {
      console.error(`FAILED (sizes): ${sizesError.message}`)
      failed++
      continue
    }

    console.log('done')
    uploaded++
  }

  console.log(`\n✓ Uploaded: ${uploaded}`)
  if (skipped) console.log(`⏭  Skipped: ${skipped} (already existed)`)
  if (failed)  console.log(`✗  Failed:  ${failed}`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
