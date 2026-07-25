# Presso — Planned Updates (session 2)

Consolidated changes to fold into the Technical Brief and Design Brief. Covers: material decision, combo tool redesign, cleaning-ease emphasis, plus the carryover items from session 1 (heat demo removal, add-on spotlight, account expansion, layout fix, keep-warm callout).

---

## 1. Material: Cast iron, confirmed

- Plates are cast iron, all three styles (Ridged / Flat / Waffle).
- **Fixes the dishwasher contradiction from v1:** plates are now **hand-wash / seasoning-care only** — remove "dishwasher-safe" from plate copy entirely. The **drip tray remains dishwasher-safe** (no material conflict there).
- FAQ page should get a line covering this explicitly (why plates aren't dishwasher-safe, how to care for them) so it doesn't read as an oversight.
- On-edge storage stand stays as an **included** feature (not a paid add-on), addressing the counter-space/storability concern from session 1.

## 2. Cleaning tool: redesigned to two functions, included feature (not upsell)

**Concept:** single flat paddle tool, two functional edges, no moving parts. Knife function cut entirely — nobody should be cutting directly on cast iron, and slicing a panini is a regular-kitchen-knife job anyway.
- **Spatula/lifter edge** — wide flat face and straight edge, for lifting the sandwich cleanly off the plate. Tool stays fully flat, no bend/angle needed to serve double duty.
- **Comb-scraper edge** — opposite long edge, wide comb/tine profile (rather than a single scalloped notch) matched to the plate's ridge spacing, so one pass covers the full width of the ridges rather than working groove-by-groove. This is the main clean-up-speed upgrade: wider coverage per pass.
- Material: firm nylon or silicone — won't scratch seasoning.
- **Storage:** integrated slot or hook on the on-edge storage stand, so the tool always lives with the press rather than getting lost in a drawer.
- **Key usage message:** designed to be used while the plates are still warm, right after cooking — cast iron cleans easiest before residue hardens. Headline copy: **"One pass, under a minute, while it's still warm."**

## 3. Cleaning ease: elevated to a top-level selling point

Cleaning has historically been a real pain point for panini presses (hard-to-reach ridges, dishwasher-unsafe plates in general), so this should read as a headline solution, not a footnote.

- **Add a 5th item to the Feature Highlight Strip** (currently: Dual-Zone Heating, Swappable Plates, Right-to-Repair, American Made) — something like "Effortless Clean-Up" — so it's visible near the top of the page, not just buried in the Cleaning Features section further down.
- **In the Cleaning Features section**, give the combo tool a large quote-style callout built around "One pass, under a minute, while it's still warm" — similar visual weight/treatment to the keep-warm callout in Cooking Features (bigger than a plain bullet, its own sub-heading, larger image).
- Design Brief: this callout should use the same tactile close-up photography direction as other feature spotlights — show the tool actually scraping a ridge, not just sitting on a counter.

## 4. Carryover from session 1 (already reflected in v2 briefs, restated here for one source of truth)

- **Heat demo widget removed** — replaced with a static "Dual-Zone Deep Dive" content section (no interactivity, no live state).
- **Recipe CTA simplified** — recipe pages show top/bottom zone temps as a plain structured info card, no link back to the (now-removed) demo.
- **New "Built-In Extras" section** — add-on spotlight carousel (image + 2-3 sentence explainer per add-on: Butter/Oil Roller, Edge-Sealing Crimper, Steam Vent w/ Herb Reservoir) sits above the configurator. Configurator checkboxes stay lean (name, one-liner, price delta) since the full explanation lives above.
- **Keep-warm / rest mode** — bigger callout within Cooking Features (own sub-heading, larger icon/image), not a full new section.
- **Account system expanded** (mocked, dashboard-only, no real notifications):
  - Press profile: shows purchased configuration + cast iron care guide
  - Order history
  - Maintenance reminder: computed from most recent order date + fixed interval (e.g. ~90 days), no cron/email
  - Favorited recipes (needs `user_favorites` join table: id, user_id, recipe_id, created_at)
- **Hero/feature-strip spacing fix** — cap hero vertical padding so the feature strip lands within ~90–100vh combined on desktop; no extra gap between nav and hero content.
- **Recipe images required** — every recipe needs an AI-generated image at launch, treated as launch-blocking, not optional.

## 5. Confirmed

- Feature Highlight Strip is 5 items (adds "Effortless Clean-Up" to the existing four). Design Brief mobile behavior note should account for 5 items in the horizontal-scroll/vertical-stack breakpoint, not 4.
