# Wrought — Design Brief (for Antigravity)

## Brand Feel
Forged, honest, premium. This should feel like ornamental ironwork craftsmanship — gates, fences, lampposts — crossed with a serious kitchen tool, not a tech gadget or a generic "artisan kitchenware" DTC brand. Confidence through visible craftsmanship, not flash. The right-to-repair / American-made messaging should be reinforced visually through the idea of a "forged, built-to-be-opened" object — modularity and repairability are shown, not just claimed.

Avoid the generic warm-rustic-kitchen-brand look (cream + terracotta + editorial serif) that's become a DTC cliché. This brand should read as more specific: real ironwork craft reference points, not just a "cozy" mood board.

## Color Palette
- **Base/background:** warm cream / off-white (`#F5EFE6` range) — not stark white.
- **Primary:** deep iron-black (`#1C1A18` range) — used for primary text, headings, key UI elements, borders. Not pure black — should read as forged metal, slightly warm.
- **Accent (primary, use now):** warm copper/bronze (`#B87333` range) — CTAs, highlights, active states, price/interactive elements, the copper "patina" story ties to durability (copper ages, doesn't get replaced).
- **Accent (reserved, build as a swappable token):** deep amber/brass (`#A9782F` range) — not used in v1, but implement the accent as a CSS custom property / design token so this can be swapped in later without a rebuild.
- **Body text:** charcoal (`#2E2A26` range), avoid pure black.
- **Success/ready state:** a muted, slightly oxidized copper-green (`#6E8871` range, used sparingly) for the "Ready" light/chime state on the heat demo widget — a subtle nod to real copper patina rather than a generic green/amber.
- Avoid cool grays, blues, or anything that reads clinical/tech-startup.

## Typography
- **Headings:** a warm serif or slab-serif with a touch of flourish — think old signage / forged gate lettering rather than a plain editorial serif (which has become the default for this category). Used for hero headline, section titles, page titles.
- **Body:** a clean, highly readable sans-serif for body copy, UI labels, form fields — pairs against the serif without competing.
- **Numeric/price/temp readouts:** a technical mono with tabular figures. Apply this **site-wide** wherever numbers appear (price summary, heat demo readout, quantities, order totals) — not just the heat demo widget — to reinforce an "instrument" feel consistently through the whole site, not as an isolated gimmick.
- Generous line-height and letter-spacing on headings for a premium, unhurried feel.

## Logo / Wordmark
- Wordmark "Wrought" set in the heading serif.
- Pair with a small, abstracted scrollwork/gate-motif mark — a simplified forged flourish, not a literal picture of a gate or fence. Should read as a subtle craft signal, not clip art. Can flank the wordmark or stand alone as a small icon (favicon, loading state, etc).

## Imagery Direction
- **Hero and 360° sequence:** AI-generated frame set of the panini press, consistent lighting/angle progression. Backdrop should lean slightly more "workshop" than "kitchen counter" — a dark iron-toned surface or the cream backdrop with subtle worked-metal texture, warm studio lighting, soft shadows, no clinical product-shot lighting.
- **Ornamental motifs:** abstracted scrollwork/ironwork line patterns used functionally — section dividers, card borders, subtle background texture — referencing real wrought-iron gate/fence/lamppost scrollwork. Keep it graphic/abstract, not literal photography of gates.
- **Feature imagery:** close-up tactile shots (plates, hinge, texture) plus **exploded-diagram style illustrations** of the modular components (heating element, hinge, plates) — this is a genuine differentiator (user-repairable design), so show it visually rather than only describing it in copy.
- **Recipe imagery:** warm, natural food photography style (can be AI-generated) — rustic table settings, natural light. A very occasional cast-iron trivet or dark-metal utensil in frame is fine as a subtle callback; don't force the ironwork motif into every recipe shot.
- **Avoid:** sterile white-background product photography, cool-toned lighting, literal garden-gate/fence photography (the motif stays abstract/graphic), anything that reads "tech product listing."

## Content Hierarchy
1. Hero: brand promise + product visual (360 viewer) — the emotional hook.
2. Feature highlights: quick-scan proof points.
3. Interactive heat demo: engagement/credibility builder — "this is a serious tool."
4. Configurator/purchase: conversion point.
5. Cooking/cleaning feature depth: detailed trust-building content for people who scrolled this far.
6. Brand philosophy (repair/American-made): now also carries the "forged to be opened, not thrown away" ironwork narrative — differentiation, appeals to values-driven buyers.
7. Recipes: soft engagement, SEO/content value, re-entry point via internal linking.

Each section should have a clear single focus — avoid cramming multiple ideas into one visual block. Generous whitespace between sections reinforces the premium feel.

## Spacing
- Generous vertical rhythm between major sections (large section padding, not cramped).
- Configurator and checkout areas can be denser/more functional in spacing since they're task-oriented, but should still use the same color/type system so they don't feel like a different product.
- Cards (recipe cards, plate-option cards, add-on cards) should have consistent padding, soft rounded corners (not sharp/techy, not overly bubbly), and a subtle border/shadow in the iron-black palette rather than harsh drop shadows.

## Responsive Behavior
- Mobile: hero stacks (headline/CTA above, 360 viewer below or as a swipeable element), feature highlight strip becomes a vertical stack or horizontal scroll, configurator options stack full-width, heat demo sliders can go side-by-side if space allows or stack with clear labeling if not.
- Sticky "Add to Cart" bar on mobile once user scrolls past the main configurator, so purchase is always reachable.
- Touch targets on the 360° viewer and sliders must be comfortably sized for mobile drag interaction.

## Motion & Interaction Feel
- Framer Motion transitions should feel smooth and weighty, not snappy/bouncy — reinforces "solid, forged object" rather than "playful app."
- Price and temperature number changes should animate as a gentle roll/fade (tabular mono figures), not an instant jump.
- 360° viewer drag should have slight momentum/easing on release, not a hard stop.
- Section reveals on scroll: subtle fade/slide-up, understated.
- Optional detail: the scrollwork divider graphic at the top of the Brand Philosophy section can have a subtle "etch-in" animation on scroll reveal (a thin line drawing itself in). Use once, not throughout the site — a signature moment, not a recurring gimmick.

## Brand Constraints
- **Brand name: Wrought.**
- **Plate style names** (replace generic "Ridged / Flat / Waffle" naming throughout copy and UI):
  - **The Grille** — ridged plate (echoes iron grille/grate bars)
  - **The Lattice** — waffle plate (echoes ironwork lattice/trellis pattern)
  - **The Anvil** — flat plate (smooth forged surface)
- Copy tone: warm, confident, craft-oriented, avoid tech-startup buzzwords ("revolutionary," "disruptive," etc). Light, occasional use of forge/craft vocabulary (forged, cast, tempered, hand-finished) is fine but shouldn't tip into costume-y blacksmith cosplay — one or two well-placed words per section, not every sentence.
