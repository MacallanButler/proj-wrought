# Wrought — Technical Brief (for Antigravity)

## Project Summary
Build a premium single-product e-commerce site for "Wrought," a dual-zone panini press. This is a portfolio/demo project: full real functionality, but payments run in Stripe **test mode** only. The product does not physically exist yet — imagery is an AI-generated frame set (see Design Brief), not real photography.

## Stack
- **Frontend:** React + Next.js (App Router), TypeScript
- **Backend/DB:** Supabase (Postgres, Auth, Storage)
- **Auth:** Supabase Auth — email/password + Google OAuth. Accounts are **optional**; guest checkout must work end-to-end without login.
- **Payments:** Stripe, **test mode only**. No live keys, no real charge flow.
- **Motion:** Framer Motion for all UI transitions and the configurator state changes.
- **Cart state:** Client-side (React context + localStorage persistence), NOT stored server-side until checkout is initiated. Do not round-trip cart reads/writes to Supabase on every add/remove — keep it local until the user proceeds to checkout, then sync once.
- **Rendering strategy:** Static generation (SSG/ISR) for Product, Blog/Recipes, About, FAQ, and Repair/Sustainability pages for AI-search and SEO visibility. Cart/Checkout/Account pages are client-rendered.
- **Images:** Next/Image with AI-generated frame set assets (see Design Brief) stored in Supabase Storage or `/public`.
- **Design tokens:** Implement the accent color (copper/bronze) as a CSS custom property / theme token rather than hardcoding it throughout components, so it can be swapped for the reserved amber/brass alternative later without touching component code. See Design Brief for both values.

## Pages

### 1. Home / Product Page (single hero product — no product listing page needed)
This is the primary page and carries most of the build complexity.

**Layout (top to bottom):**
1. **Nav bar** — logo/wordmark left, links: Product (anchor to top), Blog/Recipes, About, Repair & Sustainability, FAQ. Cart icon with item count, right-aligned. Account/login icon far right.
2. **Hero section** — full-width. Left half (or top on mobile): brand headline + subhead + primary CTA ("Configure Yours"). Right half: **360° photo-sequence viewer** of the product — draggable/scroll-controlled rotation through the AI-generated frame set. Include loading state (skeleton) while frames preload.
3. **Feature highlight strip** — horizontal row (stacks vertically on mobile) of 3-4 icon+short-text callouts: Dual-Zone Heating, Swappable Plates, Right-to-Repair, American Made. Each links/scrolls to its relevant section below.
4. **Interactive Heat Control Demo widget** — standalone section, NOT tied to purchase.
   - Two vertical sliders side by side, labeled "Top Zone" and "Bottom Zone."
   - Range: continuous 250–450°F, with 5 labeled snap-points per slider: Delicate / Low / Medium / High / Sear.
   - Live numeric readout above each slider (e.g. "375°F — Medium"), using the tabular mono numeral treatment from the Design Brief.
   - Below sliders: simulated "Ready" state — after ~1.5s of no adjustment, show a mock "Ready" light + chime icon animation (Framer Motion), no real hardware, purely illustrative.
   - This widget accepts an optional external prop/state (`presetTemps: { top: number, bottom: number }`) so recipe cards elsewhere on the site can pass values into it (see Blog section below).
5. **Configurator + Purchase section** — this is the actual buy flow.
   - **Plate style selector** (required, single-select): **The Grille / The Lattice / The Anvil** (see Design Brief for naming — these replace generic "Ridged/Flat/Waffle" labeling everywhere in copy and UI). Radio-card UI with small illustration per style, using the shared locking mechanism messaging as supporting copy. Selecting updates the 360 viewer's active frame-set variant if you have distinct assets per plate (optional — fall back to static swatch/icon if not).
   - **Add-ons** (optional, multi-select checkboxes, each with its own price delta):
     - Butter/Oil Roller Reservoir
     - Edge-Sealing Crimper Zone
     - Steam Vent w/ Herb-Infused Water Reservoir
   - **Live price summary** — base price + plate (if plate affects price) + sum of selected add-ons, updating reactively as options change. Animate price changes with Framer Motion (subtle number transition, tabular mono, not a jarring snap).
   - **Add to Cart** button — adds a line item to cart with the full configuration (plate style + selected add-ons) as a single cart entry.
6. **Cooking features section** — detailed content block (not interactive): dual-zone independent heating, true floating hinge parallel-pressure system, precision temp probe, rest mode (warm-hold after cooking). Use a 2-column or alternating image/text layout.
7. **Cleaning features section**: detachable dishwasher-safe plates w/ quick-release lever, removable dishwasher-safe drip tray, self-clean steam cycle, signature combo tool (ridge-scraper + sandwich knife + spatula, matched to plate ridges). Same layout pattern as cooking section for visual consistency.
8. **Brand philosophy callout** — condensed teaser (2-3 sentences) on modular/repairable design + American-made, with a CTA linking to the dedicated Repair & Sustainability page (full content lives there, not here).
9. **Recipe teaser strip** — 3 latest blog/recipe cards pulled from Supabase, each with a "Try this setting" button (see Blog section).
10. **Footer** — standard: nav links repeated, social placeholders, newsletter signup input (non-functional/mock is fine), copyright.

### 2. Cart Page
- List of line items (each showing configured plate + add-ons + line price), quantity adjust, remove.
- Order summary panel: subtotal, estimated shipping (see Checkout logic below), estimated tax, total.
- "Proceed to Checkout" CTA.
- Persist via localStorage; rehydrate on load.

### 3. Checkout Page
- Guest or logged-in flow — if not logged in, offer inline "Log in" or "Continue as guest" without forcing a redirect.
- Shipping address form.
- **Shipping calculation (semi-real):** zone/weight-based rate table (e.g. flat rates by US shipping zone, calculated from a simple lookup table in Supabase or a static config — not a live carrier API).
- **Tax calculation (semi-real):** either Stripe Tax (test mode) or a simple state-based rate table stored in Supabase. Pick one during implementation — Stripe Tax is less code if available in test mode.
- Stripe Elements payment form, test mode keys only.
- Order summary sidebar persists through the flow.
- "Place Order" triggers Stripe test-mode payment intent, then redirects to Confirmation.

### 4. Confirmation Page
- Order number, summary of items/configuration purchased, shipping estimate, "what's next" messaging.
- If logged in, link to Order History.

### 5. About Page
- Brand story, forged/craft tone. Founder-style narrative is fine (fictional/placeholder).

### 6. Repair & Sustainability Page (dedicated)
- Modular, user-replaceable heating element — explain with diagram/illustration (exploded-view style per Design Brief).
- American-made messaging.
- Right-to-repair principles: replaceable parts, published repair guides (can be mock/placeholder PDF or "coming soon" state), no proprietary screws/adhesives.
- This page should read as genuine brand differentiation content, not an afterthought — give it real layout weight, not just a paragraph.

### 7. FAQ Page
- Standard accordion-style Q&A. Cover: shipping/returns, warranty, plate compatibility, cleaning/dishwasher safety, repair process.

### 8. Blog / Recipes
- Index page: grid of recipe cards, pulled from a Supabase table (CMS-lite — not MDX).
- Each recipe card/detail page includes suggested **top zone / bottom zone temps** (e.g. "Top 375°F / Bottom 325°F") as structured fields, not just prose.
- **Internal linking for SEO:** each recipe detail page includes a "Load this setting into the demo" button that navigates to (or scrolls to, if same-page state is feasible) the Home page's Heat Control Demo widget and pre-populates the sliders with that recipe's temps via query param or shared state.
- Recipe detail pages should use structured data (schema.org Recipe) for AI-search visibility, and Product page should use schema.org Product markup.

## Data Model (Supabase)
- `products` — single row realistically, but model as a table for extensibility (name, base_price, description).
- `plate_options` (id, name, price_delta, description) — seed with: **The Grille**, **The Lattice**, **The Anvil**.
- `addon_options` (id, name, price_delta, description)
- `recipes` (id, title, slug, body, top_zone_temp, bottom_zone_temp, image_url, published_at)
- `orders` (id, user_id nullable, status, shipping_address, subtotal, shipping_cost, tax, total, created_at)
- `order_items` (id, order_id, plate_option_id, addon_option_ids[], quantity, unit_price)
- `shipping_rates` (zone, weight_bracket, rate) — simple lookup table
- Auth handled via Supabase Auth (no custom users table needed beyond Supabase's default, unless storing extra profile fields).

## Integrations / Third-Party Services
- Stripe (test mode) — payments
- Stripe Tax (test mode) OR Supabase rate-table — tax calc, pick one
- Supabase Auth — Google OAuth (requires OAuth app credentials — use placeholder/dev credentials)
- Supabase Storage — hosting AI-generated product frame-set images and recipe images

## Security & Data Flow Notes
- No real payment data ever touches your own backend — Stripe Elements handles card input client-side, only tokens/payment intents pass through.
- Guest checkout orders store shipping/contact info but no persistent PII beyond the order record.
- Row-level security (RLS) on Supabase: users can only read their own `orders`; `products`, `plate_options`, `addon_options`, and `recipes` are public-read.
- Environment variables for all Stripe/Supabase keys — never hardcoded, test-mode keys clearly labeled in `.env.example`.

## Explicitly Out of Scope
- Live payment processing
- Live carrier shipping rate APIs
- Real product photography (AI-generated frame set only)
- Multi-product catalog (single hero product only)
