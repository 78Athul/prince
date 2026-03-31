# Gallery Print Shop — Photographer's Guide

Welcome! This guide explains how to manage your print shop without touching any code.

---

## Getting Started

Your shop has two main sections:

- **Public shop** at `/shop` — where customers browse and buy prints
- **Admin dashboard** at `/admin` — where you manage everything (login required)

To log in to the admin, go to `/login` and use your Supabase account credentials.

---

## How to Upload a New Photo

1. Go to `/admin/photos/new`
2. Click the **upload area** and select your high-resolution photo from your computer
3. Fill in the details:
   - **Title** — the name shown to customers (e.g. "Concrete Horizon")
   - **Description** — a short paragraph about the photo
   - **Alt Text** — a plain-English description of what's in the photo (helps with Google search). If you leave this blank, the title is used.
   - **Category** — choose one (e.g. Landscape, Urban, Abstract)
   - **Limited Edition** — tick this if it's a limited edition series
4. Under **Print Sizes & Prices**, set every size you offer and its price. Click **+ Add Another Size** to add more.
5. Click **Publish Photo** — it will appear in the shop immediately.

> **Tip:** Your original file is uploaded privately. Customers only ever see a scaled-down, watermarked preview. The full-resolution file is never visible on the website.

---

## How to Edit a Photo

1. Go to `/admin/photos`
2. Find the photo you want to change and click **Edit**
3. Update the title, description, category, or limited edition status
4. Click **Save Changes**
5. You can also update print sizes and their prices (or mark a size as Sold Out) in the lower section of the edit page

---

## How to Hide or Show a Photo

1. Go to `/admin/photos`
2. Click **Hide** next to a photo to take it off the public shop (it stays in your database)
3. Click **Show** to make it visible again

Hiding is useful if you want to temporarily remove a print without deleting it.

---

## How to Delete a Photo

1. Go to `/admin/photos`
2. Click **Delete** next to a photo — you'll be asked to confirm
3. This permanently removes the photo from your shop and from Cloudinary (your image host)

> **Warning:** Deletion is permanent. Make sure you have a local copy of the photo before deleting.

---

## How to Manage Orders

1. Go to `/admin/orders`
2. You'll see every order with:
   - Customer name and email
   - The photo and print size they ordered
   - Their shipping address
   - The order total
   - Whether it's **Pending** or **Fulfilled**
3. Once you've shipped the print, click **Mark as Fulfilled** — this updates the order status

Customers receive an automatic confirmation email when their order is placed (powered by Resend).

---

## Understanding the Dashboard

The main **Dashboard** (`/admin`) shows you:
- **Total Photos** — how many photos are in your shop
- **Total Orders** — all-time orders placed
- **Pending Orders** — orders you haven't shipped yet (amber number — keep this at 0!)
- **Recent Orders** — a quick view of your five most recent orders

---

## What Customers See

- `/shop` — a grid of all your available photos with prices
- `/shop/[photo]` — a detail page where they select a print size and add to cart
- `/checkout` — they enter their name, email, and shipping address
- They're then taken to **Stripe's secure payment page** to complete the purchase
- After payment, they receive a confirmation email and your dashboard shows the new order

---

## Setting Up Stripe for Real Payments

When you're ready to accept real payments (not just testing):

1. Log in to [stripe.com](https://stripe.com)
2. In the Stripe Dashboard, go to **Developers → API Keys**
3. Replace the `sk_test_...` and `pk_test_...` keys in your `.env.local` with the **live** (`sk_live_...`) keys
4. Go to **Webhooks** in Stripe and register your production URL:
   `https://yourdomain.com/api/stripe/webhook`
5. Add the webhook secret to `STRIPE_WEBHOOK_SECRET` in your `.env.local`

> **Important:** Never share your `STRIPE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` with anyone.

---

## Setting Up Email Confirmations

1. Sign up for a free account at [resend.com](https://resend.com)
2. Verify your domain (follow Resend's instructions — this takes about 5 minutes)
3. Create an API key in Resend
4. Add it to `.env.local` as `RESEND_API_KEY`
5. Set `RESEND_FROM_EMAIL` to your verified email address (e.g. `orders@yoursite.com`)

---

## Adding the Shop to Your Main Navigation

Edit `src/components/NavBar.tsx` and add a link to `/shop`. Or ask your developer to do this.

---

## Pricing Notes

- All prices are in **USD**
- Each print size has its own price — set these when uploading or editing a photo
- The lowest price across all sizes is shown as the "from" price on the shop grid

---

## Getting Help

If something doesn't work or you're unsure about something, contact your developer and share this guide. The error messages in the admin are designed to be plain English and will tell you what went wrong.
