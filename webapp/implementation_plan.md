# Implement Stitch Mobile Designs

The goal is to apply the generated Stitch mobile HTML layouts to the Next.js application, ensuring that the existing desktop layouts are preserved. We will use a CSS-driven responsive approach (Tailwind's `hidden md:block` and `block md:hidden`) to seamlessly switch between the mobile and desktop DOM hierarchies based on viewport size.

## User Review Required

> [!IMPORTANT]
> **Component Duplication:** To maintain code separation and avoid breaking the meticulously crafted desktop experience, we will duplicate the page structures within the same file, wrapped in responsive display toggles. This increases component size but guarantees absolute stability for the desktop view while giving full control over the new mobile view.
>
> **Global Layout Changes:** We will introduce a new `MobileBottomNav` component in the `RootLayout` that is only visible on mobile devices.

## Proposed Changes

---

### Core Components & Layout

We'll inject the top and bottom navigation bars specific to mobile.

#### [NEW] src/components/MobileBottomNav.tsx
- Extracted from the Stitch HTML.
- Contains the 4 tab links (Gallery, Collections, Curated, Cart).
- Wrapped in a `block md:hidden` Tailwind class.
- Bound to Zustand Cart to show items if needed, or trigger the Cart drawer.

#### [MODIFY] src/components/NavBar.tsx
- Wrap the existing desktop `NavBar` `className` with `hidden md:flex`.
- Prepend the new Stitch Mobile `TopAppBar` (hamburger menu, centered Gallery logo, shopping bag icon) wrapped in `flex md:hidden`.

#### [MODIFY] src/app/layout.tsx
- Import and render `<MobileBottomNav />`.
- Ensure the `<CartDrawer />` plays nicely with the mobile breakpoints.

---

### Page Migrations (Desktop/Mobile Split)

For each page, we will convert the raw Stitch HTML to JSX, hook up the actual Supabase data props (like `print.cloudinary_url`, `print.title`), and merge them alongside the desktop code.

#### [MODIFY] src/app/page.tsx (Home Page)
- Wrap existing content in `hidden md:block`.
- Add new `block md:hidden` container.
- Implement the Hero Section, Featured Prints (mapping over the first 3 Supabase `prints`), and Email Subscriber sections from the Stitch HTML.

#### [MODIFY] src/app/gallery/page.tsx (Gallery Page)
- Wrap existing content in `hidden md:block`.
- Add new `block md:hidden` container.
- Implement the Parallax Topo Hero and the vertical gallery feed.
- Map the fetched Supabase `prints` into the new mobile card format.

#### [MODIFY] src/app/prints/[id]/page.tsx (Print Detail Page)
- Wrap existing content in `hidden md:block`.
- Add new `block md:hidden` container.
- Implement the full-bleed image header, dimensions selector, frame selector, and CTA from the Stitch HTML.
- Hook up the `AddToCartButton` logic to the new mobile "ADD TO CART" button.

#### [MODIFY] src/app/login/page.tsx (Login Page)
- Wrap existing content in `hidden md:block`.
- Add new `block md:hidden` container.
- Implement the minimal, editorial login form from the Stitch HTML.
- Hook up the `login` and `signup` Server Actions to the mobile form buttons.

#### [MODIFY] src/app/admin/page.tsx (Admin Dashboard)
- Wrap existing content in `hidden md:block`.
- Add new `block md:hidden` container.
- Implement the "Gallery Studio" dashboard tabs and inventory list.
- Map the fetched `prints` into the smaller mobile horizontal row layout per the Stitch HTML.

## Open Questions

> [!WARNING]
> The mobile HTML contains several placeholder background images and hardcoded texts (like "Concrete Brutality"). Do you want me to temporarily keep the placeholders for structure until we upload more content, or strictly wire everything up to the existing Supabase `prints` database (even if there are currently very few items)?

## Verification Plan

### Automated Tests
- Run `npm run build` to verify no TSX/React syntactic errors were introduced by the raw HTML-to-JSX conversion.

### Manual Verification
- Resize the browser window to mobile width (<768px) and verify the Stitch designs trigger correctly on all 5 routes.
- Resize to desktop width (>768px) and verify nothing changed from the original desktop view.
- Test the Cart interaction on the mobile view.
