# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This repo has two distinct parts:
- **`index.html`** — A standalone static prototype/mockup (no build step, opens directly in a browser). Not actively developed.
- **`webapp/`** — The production Next.js application. All active development happens here.

## Commands

All commands must be run from the `webapp/` directory.

```bash
cd webapp

npm run dev      # Start dev server (Next.js on http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Environment Variables

`webapp/.env.local` (copy from `webapp/.env.local.example`):

**Required:**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # bypasses RLS — server-only
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_PHOTOGRAPHER_EMAIL=   # used in the mailto checkout link
NEXT_PUBLIC_BASE_URL=             # e.g. http://localhost:3000
```

**Optional (Stripe/Resend are built but not wired to the active checkout flow):**
```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
NEXT_PUBLIC_PHOTOGRAPHER_PHONE=   # shows iMessage button in checkout if set
```

## Architecture

**Next.js App Router** with React Server Components as the default. Pages fetch directly from Supabase on the server; client components are used only when browser APIs or interactivity are needed.

### Data layer — Supabase

- `src/utils/supabase/server.ts` — SSR client (Server Components, Server Actions, middleware)
- `src/utils/supabase/client.ts` — Browser client (Client Components)
- `src/utils/supabase/service.ts` — Service role client; **bypasses RLS**. Only use in API routes and server actions.

Database tables (full schema in `supabase/migrations/001_print_shop_schema.sql`):
- `prints` — `id, title, description, alt_text, category, base_price, is_limited_edition, is_available, cloudinary_url, created_at`
- `print_sizes` — `id, print_id, size_label, price, stock_status` — one row per size per photo; `base_price` on `prints` is always kept as the minimum size price (invariant maintained by upload/update server actions)
- `orders` — `id, customer_name, customer_email, print_id, print_size_id, shipping_address (JSONB), status, stripe_payment_intent_id, total_amount, created_at`

> **Migration note:** `001_print_shop_schema.sql` only ALTERs the `prints` table — it assumes `prints` already exists. On a fresh Supabase project, run a `CREATE TABLE IF NOT EXISTS prints (...)` first, then run the migration.

**Fallback data:** When Supabase returns no prints (empty DB), pages fall back to `src/lib/dummy-data.ts` (24 local photo entries pointing to `public/assets/photos/`). Remove this fallback once real prints are uploaded.

### Image storage — Cloudinary

- `src/utils/cloudinary.ts` — configured SDK instance (server-only)
- `src/utils/cloudinary-helpers.ts` — `getThumbnailUrl` (800px, q70 for grids) and `getPreviewUrl` (1500px, q75 with centered watermark for detail pages). These manipulate the stored `cloudinary_url` string directly — no SDK call at read time.
- Images are uploaded to the `gallery_prints` folder. Only the `secure_url` is stored in Supabase.

### Checkout flow

The active checkout is an **inquiry-based mailto flow** — not Stripe:
- `/checkout` (Client Component) — reads Zustand cart, collects name + email, builds a `mailto:` link with cart contents, opens the user's email client, clears cart, redirects to `/checkout/sent`
- `/checkout/sent` — confirmation page after inquiry is sent
- `NEXT_PUBLIC_PHOTOGRAPHER_EMAIL` is the recipient address

Stripe API routes (`/api/stripe/create-checkout-session`, `/api/stripe/webhook`) are fully built but **not wired to the UI**. They can be connected later if payment processing is needed.

### Cart state — Zustand

- `src/store/cart.ts` — client-side only, in-memory (not persisted to localStorage). `CartItem` carries `id`, `title`, `price`, `quantity`, `imageUrl`, `isLimited`, `frame`, and optional `printSizeId`/`printSizeLabel`.
- `CartDrawer` renders globally in the root layout. `AddToCartButton` and `PrintSizeSelector` write to this store. `addItem` increments quantity if the same `id` already exists.

### Auth & protected routes

- `src/middleware.ts` — redirects unauthenticated requests to `/admin` or `/account` to `/login`
- Login uses Supabase email/password auth (`src/app/login/actions.ts`)
- All admin Server Actions re-verify `supabase.auth.getUser()` before writing

### Admin section (`/admin`)

- `/admin/photos` — list, toggle availability, delete photos
- `/admin/photos/new` — upload new photo (Cloudinary upload + title/sizes/prices)
- `/admin/photos/[id]/edit` — edit metadata and replace print sizes
- `/admin/orders` — view and mark orders fulfilled

### Page routes

| Route | Type | Notes |
|-------|------|-------|
| `/` | Server | Hero, featured prints (first 3 from DB), "Print of the Month" display |
| `/gallery` | Server | Full print grid with mobile sticky filter bar |
| `/prints/[id]` | Server | Print detail with watermarked preview + `PrintSizeSelector` |
| `/shop` | Server | Grid with category filter (`?category=` param), links to `/shop/[id]` |
| `/shop/[id]` | Server | Alternate detail page with `PrintSizeSelector` |
| `/about` | Server | Photographer bio |
| `/checkout` | Client | Inquiry-based mailto checkout |
| `/login` | Server/Client | Supabase auth login |

## Mobile / Desktop Layout Pattern

Pages use a **CSS-driven responsive split** — desktop and mobile DOM trees coexist in the same file:

```tsx
{/* Mobile only */}
<div className="md:hidden"> ... </div>

{/* Desktop only */}
<div className="hidden md:block"> ... </div>
```

Desktop layout is never modified when adding mobile UI. `MobileBottomNav` and `MobileBottomCartSummary` render globally in the root layout and are hidden on `md:` and above.

## Styling

Tailwind CSS with a Material Design 3–style dark theme. Color tokens (`surface`, `primary`, `on-surface`, etc.) are defined in `tailwind.config.ts` — use these rather than raw hex values. Border radius is globally `0px` (sharp corners); only `rounded-full` has a non-zero value.

Typography (loaded via `<link>` in root layout, not `next/font`):
- `font-display` → Anton (large headings)
- `font-headline` → Epilogue (section headings, italic style common)
- `font-body` / `font-label` → Plus Jakarta Sans
