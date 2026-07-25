'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Product360Viewer from '@/components/Product360Viewer';
import ProductConfigurator from '@/components/ProductConfigurator';
import { ArrowRight, Thermometer, ShieldAlert, Cpu, Sparkles, Droplet, Hammer, Check, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activePlateId, setActivePlateId] = useState('grille');
  const [activeAddonIndex, setActiveAddonIndex] = useState(0);

  const addonsData = [
    {
      title: "Butter/Oil Roller Reservoir",
      image: "/images/addon-butter-roller.jpg",
      tagline: "Automated crust coating.",
      desc: "A rotary oil spreader that fits directly onto the press base. Rolling bread across the oil reservoir provides a perfectly thin, even coating for maximum golden crispiness without sogginess.",
    },
    {
      title: "Edge-Sealing Crimper Zone",
      image: "/images/addon-crimper.jpg",
      tagline: "Lock in melted fillings.",
      desc: "Modular metal crimper inserts that slide onto plate borders to seal sandwich edges. Ideal for sealing cheese, jams, and fillings inside pressed hand pies, pocket sandwiches, and calzones.",
    },
    {
      title: "Steam Vent w/ Herb Reservoir",
      image: "/images/addon-steam-vent.jpg",
      tagline: "Tender interior, crisp exterior.",
      desc: "A continuous steaming element that releases moisture directly inside the press chamber. Fill the reservoir with herb-infused water to steam fillings while the hot cast iron plates crisp the bread.",
    }
  ];

  const handleNextAddon = () => {
    setActiveAddonIndex((prev) => (prev + 1) % addonsData.length);
  };

  const handlePrevAddon = () => {
    setActiveAddonIndex((prev) => (prev - 1 + addonsData.length) % addonsData.length);
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Wrought Panini Press',
    'image': 'https://wroughtpress.com/images/product-base.jpg',
    'description': 'Handcrafted modular dual-zone panini press with user-replaceable parts and parallel floating hinge.',
    'brand': {
      '@type': 'Brand',
      'name': 'Wrought'
    },
    'offers': {
      '@type': 'Offer',
      'price': '349.00',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    }
  };

  // Static recipe seeds matching the database seeds for fast SEO-friendly rendering
  const featuredRecipes = [
    {
      title: 'Sourdough Prosciutto Melt',
      slug: 'sourdough-prosciutto-melt',
      top: 375,
      bottom: 400,
      desc: 'Thinly sliced prosciutto, gruyère, and fresh heirloom tomato brushed with rosemary olive oil.',
      plate: 'The Anvil or The Grille',
      image: '/images/recipe-prosciutto.jpg',
    },
    {
      title: 'Lattice-Iron Liège Waffles',
      slug: 'lattice-iron-liege-waffles',
      top: 350,
      bottom: 350,
      desc: 'Traditional Belgian brioche dough waffles caramelizing pearl sugar for a crisp glaze.',
      plate: 'The Lattice',
      image: '/images/recipe-waffles.jpg',
    },
    {
      title: 'Pressed Croque Monsieur',
      slug: 'pressed-croque-monsieur',
      top: 325,
      bottom: 350,
      desc: 'Decadent black forest ham, creamy Béchamel, and bubbly melted Emmental cheese.',
      plate: 'The Grille or The Anvil',
      image: '/images/recipe-croque.jpg',
    },
  ];

  return (
    <div className="flex flex-col w-full text-charcoal bg-wrought-cream overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      
      {/* 1. Hero Section */}
      <section id="product" className="pt-4 pb-4 md:py-6 lg:py-8 lg:h-[calc(100vh-140px)] lg:max-h-[640px] lg:min-h-[480px] px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-hidden">
        {/* Left Col: Brand Copy */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-wrought-copper font-bold mb-2.5 flex items-center gap-1.5">
            <Sparkles size={12} /> Forged to endure, built to restore
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[40px] xl:text-5xl font-black text-iron-black leading-[1.1] tracking-tight mb-4">
            The Last Press You'll Ever Buy.
          </h1>
          <p className="text-charcoal/80 text-xs sm:text-sm leading-relaxed mb-6 max-w-lg">
            Wrought reimagines the panini press as a heavy kitchen instrument. Combining dual-zone casting plates with modular, user-replaceable heating cores, it is engineered for life and crafted from solid ironwork mechanics.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="#configure"
              className="py-2.5 px-6 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase text-xs tracking-widest font-bold rounded shadow-md hover:shadow-lg transition-all text-center"
            >
              Configure Yours
            </a>
            <Link
              href="/repair-sustainability"
              className="py-2.5 px-6 border-2 border-iron-black hover:bg-iron-black hover:text-wrought-cream text-iron-black font-mono uppercase text-xs tracking-widest font-bold rounded transition-all text-center"
            >
              Repair Principles
            </Link>
          </div>
        </div>

        {/* Right Col: Interactive 360/State Viewer */}
        <div className="lg:col-span-7 w-full">
          <Product360Viewer activePlateId={activePlateId} />
        </div>
      </section>

      {/* 2. Feature Highlight Strip */}
      <section className="bg-iron-black text-wrought-cream py-6 border-y-2 border-iron-black overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex overflow-x-auto no-scrollbar md:grid md:grid-cols-5 gap-6 text-center justify-between md:justify-items-center items-center w-full">
          <a href="#deep-dive" className="flex-shrink-0 min-w-[140px] md:min-w-0 group flex flex-col items-center gap-1">
            <span className="font-mono text-xs font-bold text-wrought-copper group-hover:text-wrought-cream transition-colors flex items-center gap-1">
              Dual-Zone Heat <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[10px] text-wrought-cream/50 uppercase tracking-widest">Independent Sliders</span>
          </a>
          <a href="#configure" className="flex-shrink-0 min-w-[140px] md:min-w-0 group flex flex-col items-center gap-1">
            <span className="font-mono text-xs font-bold text-wrought-copper group-hover:text-wrought-cream transition-colors flex items-center gap-1">
              Swappable Plates <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[10px] text-wrought-cream/50 uppercase tracking-widest">Grille, Lattice, Anvil</span>
          </a>
          <a href="#cleaning-features" className="flex-shrink-0 min-w-[140px] md:min-w-0 group flex flex-col items-center gap-1">
            <span className="font-mono text-xs font-bold text-wrought-copper group-hover:text-wrought-cream transition-colors flex items-center gap-1">
              Effortless Clean-Up <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[10px] text-wrought-cream/50 uppercase tracking-widest">Under A Minute</span>
          </a>
          <Link href="/repair-sustainability" className="flex-shrink-0 min-w-[140px] md:min-w-0 group flex flex-col items-center gap-1">
            <span className="font-mono text-xs font-bold text-wrought-copper group-hover:text-wrought-cream transition-colors flex items-center gap-1">
              Right-To-Repair <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[10px] text-wrought-cream/50 uppercase tracking-widest">Modular Element blocks</span>
          </Link>
          <Link href="/repair-sustainability" className="flex-shrink-0 min-w-[140px] md:min-w-0 group flex flex-col items-center gap-1">
            <span className="font-mono text-xs font-bold text-wrought-copper group-hover:text-wrought-cream transition-colors flex items-center gap-1">
              American Made <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[10px] text-wrought-cream/50 uppercase tracking-widest">Forged in Oregon</span>
          </Link>
        </div>
      </section>

      {/* 3. Dual-Zone Deep Dive (Static, visual thermal mapping) */}
      <section id="deep-dive" className="py-20 px-4 bg-[#f0e8dc] border-t border-iron-black/15">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-wrought-copper font-bold uppercase tracking-widest">Thermal Precision</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-iron-black mt-2">Dual-Zone Deep Dive</h2>
            <p className="text-charcoal/80 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
              Wrought's independent heating elements allow you to calibrate different temperatures for the top and bottom plates. No thermal bleed, just perfect thermodynamic control.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sourdough Prosciutto Melt Mapping */}
            <div className="bg-wrought-cream border-2 border-iron-black rounded-lg p-6 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-wrought-copper font-bold block mb-1">Melt & Sear Calibration</span>
                <h3 className="font-serif text-base font-bold text-iron-black mb-3">Sourdough Prosciutto Melt</h3>
                <p className="text-charcoal/70 text-xs leading-relaxed mb-6">
                  Melt delicate gruyère cheese from the top without burning, while providing high-heat crisping to the rosemary-oiled sourdough on the bottom.
                </p>
              </div>
              <div className="flex flex-col gap-3 font-mono text-[11px] border-t border-iron-black/10 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60 uppercase text-[9px] tracking-wider">Top Zone (Gentle Melt)</span>
                  <span className="font-bold text-iron-black">375°F</span>
                </div>
                <div className="w-full bg-iron-black/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-wrought-amber h-full rounded-full" style={{ width: '62.5%' }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60 uppercase text-[9px] tracking-wider">Bottom Zone (Sear Crunch)</span>
                  <span className="font-bold text-iron-black">400°F</span>
                </div>
                <div className="w-full bg-iron-black/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-wrought-copper h-full rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            {/* Lattice Waffles Mapping */}
            <div className="bg-wrought-cream border-2 border-iron-black rounded-lg p-6 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-wrought-copper font-bold block mb-1">Equalized Expansion</span>
                <h3 className="font-serif text-base font-bold text-iron-black mb-3">Lattice-Iron Waffles</h3>
                <p className="text-charcoal/70 text-xs leading-relaxed mb-6">
                  A synchronized medium heat on both top and bottom zones lets yeast-risen brioche dough expand uniformly while caramelizing pearl sugar into a golden glaze.
                </p>
              </div>
              <div className="flex flex-col gap-3 font-mono text-[11px] border-t border-iron-black/10 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60 uppercase text-[9px] tracking-wider">Top Zone (Caramelization)</span>
                  <span className="font-bold text-iron-black">350°F</span>
                </div>
                <div className="w-full bg-iron-black/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-wrought-amber h-full rounded-full" style={{ width: '50%' }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60 uppercase text-[9px] tracking-wider">Bottom Zone (Uniform Rise)</span>
                  <span className="font-bold text-iron-black">350°F</span>
                </div>
                <div className="w-full bg-iron-black/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-wrought-amber h-full rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>

            {/* Croque Monsieur Mapping */}
            <div className="bg-wrought-cream border-2 border-iron-black rounded-lg p-6 flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-wrought-copper font-bold block mb-1">Delicate Browning</span>
                <h3 className="font-serif text-base font-bold text-iron-black mb-3">Pressed Croque Monsieur</h3>
                <p className="text-charcoal/70 text-xs leading-relaxed mb-6">
                  Bake thick Béchamel and Emmental on the top with a lower temperature to prevent burning, while toast-searing the bottom brioche slice with higher heat.
                </p>
              </div>
              <div className="flex flex-col gap-3 font-mono text-[11px] border-t border-iron-black/10 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60 uppercase text-[9px] tracking-wider">Top Zone (Broil Béchamel)</span>
                  <span className="font-bold text-iron-black">325°F</span>
                </div>
                <div className="w-full bg-iron-black/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-wrought-amber h-full rounded-full" style={{ width: '37.5%' }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60 uppercase text-[9px] tracking-wider">Bottom Zone (Brioche Toast)</span>
                  <span className="font-bold text-iron-black">350°F</span>
                </div>
                <div className="w-full bg-iron-black/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-wrought-amber h-full rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Built-In Extras (Add-on spotlight carousel) */}
      <section id="extras" className="py-20 px-4 bg-wrought-cream border-t border-iron-black/15">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-wrought-copper font-bold uppercase tracking-widest">Built-In Extras</span>
            <h2 className="text-3xl font-serif font-bold text-iron-black mt-2">Add-On Spotlight</h2>
            <p className="text-charcoal/70 text-xs sm:text-sm mt-3">Discover modular Wrought accessories engineered to expand your press's utility.</p>
          </div>

          <div className="bg-[#eae1d4] border-2 border-iron-black rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-md">
            {/* Slide Image */}
            <div className="w-full md:w-1/2 aspect-square relative rounded border border-iron-black/15 overflow-hidden flex-shrink-0 bg-wrought-cream">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeAddonIndex}
                  src={addonsData[activeAddonIndex].image}
                  alt={addonsData[activeAddonIndex].title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Slide Text Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-wrought-copper font-bold block mb-1">
                  {addonsData[activeAddonIndex].tagline}
                </span>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={activeAddonIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="font-serif text-2xl font-bold text-iron-black mb-4"
                  >
                    {addonsData[activeAddonIndex].title}
                  </motion.h3>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeAddonIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-charcoal/80 text-xs sm:text-sm leading-relaxed"
                  >
                    {addonsData[activeAddonIndex].desc}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Slider Navigation */}
              <div className="flex justify-between items-center mt-8 border-t border-iron-black/10 pt-4">
                <span className="font-mono text-[10px] text-charcoal/50">
                  {activeAddonIndex + 1} / {addonsData.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevAddon}
                    className="p-1.5 border border-iron-black hover:bg-iron-black hover:text-wrought-cream text-iron-black rounded transition-colors cursor-pointer"
                    aria-label="Previous Attachment"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNextAddon}
                    className="p-1.5 border border-iron-black hover:bg-iron-black hover:text-wrought-cream text-iron-black rounded transition-colors cursor-pointer"
                    aria-label="Next Attachment"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Configurator & Purchase */}
      <section id="configure" className="py-16 px-4 bg-[#eae1d4] border-y border-iron-black/15">
        <div className="max-w-4xl mx-auto w-full">
          <ProductConfigurator onPlateChange={setActivePlateId} />
        </div>
      </section>

      {/* 5. Cooking Features Depth */}
      <section className="py-20 px-4 max-w-5xl mx-auto w-full flex flex-col gap-16">
        <div className="text-center">
          <span className="font-mono text-xs text-wrought-copper font-bold uppercase tracking-widest">Architectural Depth</span>
          <h2 className="text-3xl font-serif font-bold text-iron-black mt-2">Engineered for Forged Results</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 rounded bg-[#eae1d4] border border-iron-black/20 flex items-center justify-center text-wrought-copper">
              <Thermometer size={20} />
            </div>
            <h3 className="font-serif text-xl font-bold text-iron-black">Dual-Zone Independent Heating</h3>
            <p className="text-charcoal/80 text-xs sm:text-sm leading-relaxed">
              Cook delicate components on the top zone while searing the crust on the bottom. Dual isolated thermocouple sensors feed real-time calculations to separate solid-state relays, preventing any thermal crossover.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 rounded bg-[#eae1d4] border border-iron-black/20 flex items-center justify-center text-wrought-copper">
              <Hammer size={20} />
            </div>
            <h3 className="font-serif text-xl font-bold text-iron-black">Parallel-Pressure Hinge System</h3>
            <p className="text-charcoal/80 text-xs sm:text-sm leading-relaxed">
              Standard presses pinch sandwiches, squeezing out fillings. Wrought utilizes an industrial counter-balanced linkage that floats perfectly parallel. Apply uniform weight up to 2 inches thick.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 rounded bg-[#eae1d4] border border-iron-black/20 flex items-center justify-center text-wrought-copper">
              <Cpu size={20} />
            </div>
            <h3 className="font-serif text-xl font-bold text-iron-black">Precision Temperature Probe</h3>
            <p className="text-charcoal/80 text-xs sm:text-sm leading-relaxed">
              An integrated steel-clad probe plugs directly into the casting front. Monitor sandwich core temperature and automatically trigger rest mode once the cheese core hits its perfect melt-point.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 rounded bg-[#eae1d4] border border-iron-black/20 flex items-center justify-center text-wrought-copper">
              <ShieldAlert size={20} />
            </div>
            <h3 className="font-serif text-xl font-bold text-iron-black">Over-Engineered Safety Rest</h3>
            <p className="text-charcoal/80 text-xs sm:text-sm leading-relaxed">
              Heavy-gauge steel supports double-locked latching handles to anchor the press securely. Automatically powers down heating elements after 30 minutes of standby to guarantee kitchen safety.
            </p>
          </div>
        </div>

        {/* Large Keep-Warm / Rest Mode Callout */}
        <div className="mt-12 bg-[#eae1d4] border-2 border-iron-black rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-wrought-cream border border-iron-black/20 flex items-center justify-center text-wrought-copper flex-shrink-0">
            <Volume2 size={28} className="stroke-[1.5]" />
          </div>
          <div className="flex-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-wrought-copper font-bold block mb-1">Acoustic Rest Mode</span>
            <h3 className="font-serif text-lg font-bold text-iron-black mb-2">Automated Rest & Keep-Warm Calibration</h3>
            <p className="text-charcoal/80 text-xs sm:text-sm leading-relaxed">
              When Wrought's precision thermal probe detects that your sandwich core has hit its perfect melting point, the press sounds a solid steel acoustic chime and drops both elements to a gentle 140°F keep-warm hold. Rest your sandwiches without overcooking them or letting them go cold.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Cleaning Features */}
      <section id="cleaning-features" className="py-20 px-4 bg-[#eae1d4] border-t border-iron-black/15">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs text-wrought-copper font-bold uppercase tracking-widest">Maintenance</span>
            <h2 className="text-3xl font-serif font-bold text-iron-black mt-2 mb-6">Built to be Opened, Cleaned, & Serviced</h2>
            <div className="flex flex-col gap-4 text-xs sm:text-sm text-charcoal/80">
              <p>
                <strong>Quick-Release Levers:</strong> Stripped of complex plastics, solid brass releases unlock the top and bottom cast plates instantly. Plates slide out cold or hot for direct sink cleaning.
              </p>
              <p>
                <strong>Dishwasher-Safe Drip Tray:</strong> A heavy copper reservoir sits beneath the base, catching fat runoff. Slide it out forward and slide it into the dishwasher.
              </p>
              <p>
                <strong>The Flat Paddle Combo Tool:</strong> Every Wrought includes a flat paddle cleaning tool made of firm nylon and silicone that won't scratch seasoning. It features a spatula/lifter edge on one side and a wide comb-scraper edge matched to plate ridges on the other. It clips into the storage stand when not in use.
              </p>
            </div>
            
            {/* Quote Callout */}
            <div className="mt-8 border-l-4 border-wrought-copper pl-6 py-2 italic font-serif text-lg text-iron-black/90">
              "One pass, under a minute, while it's still warm."
              <span className="block font-mono text-[10px] uppercase tracking-widest text-wrought-copper font-bold not-italic mt-2">
                — Optimal Cast Iron Cleaning Protocol
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-8 bg-wrought-cream border-2 border-iron-black rounded-lg relative overflow-hidden shadow-inner">
            {/* Draw a schematic clean tool diagram */}
            <svg viewBox="0 0 200 150" className="w-full max-w-[280px] stroke-iron-black fill-none stroke-[2]">
              {/* Ridges of the plate */}
              <path d="M 20,120 L 180,120" stroke="#1C1A18" strokeWidth="4" />
              <line x1="40" y1="120" x2="40" y2="135" stroke="#1C1A18" strokeWidth="4" />
              <line x1="60" y1="120" x2="60" y2="135" stroke="#1C1A18" strokeWidth="4" />
              <line x1="80" y1="120" x2="80" y2="135" stroke="#1C1A18" strokeWidth="4" />
              <line x1="100" y1="120" x2="100" y2="135" stroke="#1C1A18" strokeWidth="4" />
              <line x1="120" y1="120" x2="120" y2="135" stroke="#1C1A18" strokeWidth="4" />
              <line x1="140" y1="120" x2="140" y2="135" stroke="#1C1A18" strokeWidth="4" />
              <line x1="160" y1="120" x2="160" y2="135" stroke="#1C1A18" strokeWidth="4" />
              
              {/* Flat paddle tool scraping */}
              <g transform="translate(30, 45) rotate(15)">
                {/* Handle */}
                <rect x="10" y="10" width="80" height="24" rx="2" fill="#2E2A26" stroke="#1C1A18" strokeWidth="2" />
                <circle cx="20" cy="22" r="3" fill="#B87333" />
                {/* Spatula flat edge / comb scraper edge */}
                <path d="M 90,10 L 110,5 L 110,39 L 90,34 Z" fill="#6E8871" stroke="#1C1A18" strokeWidth="2" />
                {/* Comb teeth scraping */}
                <path d="M 110,5 L 115,8 L 110,11 L 115,14 L 110,17 L 115,20 L 110,23 L 115,26 L 110,29 L 115,32 L 110,35 L 115,38 L 110,39" stroke="#1C1A18" strokeWidth="2" fill="none" />
              </g>
              {/* Steam waves */}
              <path d="M 110,110 Q 115,95 110,80" stroke="rgba(110,136,113,0.5)" strokeWidth="3" className="animate-pulse" />
              <path d="M 130,110 Q 135,95 130,80" stroke="rgba(110,136,113,0.5)" strokeWidth="3" className="animate-pulse" />
              
              <text x="100" y="25" textAnchor="middle" fill="#1C1A18" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1">COMB-SCRAPER IN ACTION</text>
            </svg>
          </div>
        </div>
      </section>

      {/* 7. Brand Philosophy Callout */}
      <section className="py-20 px-4 bg-iron-black text-wrought-cream text-center border-y-2 border-iron-black relative">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-12 h-0.5 bg-wrought-copper mb-6" />
          <h2 className="font-serif text-3xl font-bold text-wrought-cream mb-4">"Forged to be opened, not thrown away."</h2>
          <p className="text-xs sm:text-sm text-wrought-cream/60 leading-relaxed mb-8 max-w-lg">
            Planned obsolescence is an environmental failure. Wrought is built on true open-hardware principles. No glue, no proprietary screws, no non-repairable heating elements. If a heater element breaks in 20 years, buy a replacement module, un-hex four screws, and slot it in.
          </p>
          <Link
            href="/repair-sustainability"
            className="py-3 px-8 bg-wrought-cream hover:bg-wrought-copper text-iron-black hover:text-wrought-cream font-mono uppercase text-xs tracking-widest font-bold rounded transition-all duration-300"
          >
            Read Our Repair Manifesto
          </Link>
        </div>
      </section>

      {/* 8. Recipes Teaser strip */}
      <section className="py-20 px-4 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-end border-b border-iron-black/15 pb-4 mb-10">
          <div>
            <span className="font-mono text-xs text-wrought-copper font-bold uppercase tracking-widest">Culinary Precision</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-iron-black mt-1">Seeded Recipes</h2>
          </div>
          <Link href="/blog" className="font-mono text-xs uppercase tracking-widest text-iron-black hover:text-wrought-copper font-bold flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <div 
              key={index} 
              className="bg-[#eae1d4]/30 border-2 border-iron-black rounded-lg flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {/* Recipe Image Header */}
              {recipe.image && (
                <div className="w-full h-44 border-b-2 border-iron-black overflow-hidden relative">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-iron-black text-wrought-cream text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold tracking-wider flex items-center gap-1">
                    <Droplet size={8} className="text-wrought-copper" /> {recipe.top}° / {recipe.bottom}°
                  </div>
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-iron-black group-hover:text-wrought-copper transition-colors mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-charcoal/85 leading-relaxed mb-4 line-clamp-3">{recipe.desc}</p>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-iron-black/50 mb-6">
                    Recommended: <span className="text-iron-black font-semibold text-[10px]">{recipe.plate}</span>
                  </div>
                  
                  <Link
                    href={`/blog/${recipe.slug}`}
                    className="w-full block py-2.5 text-center bg-wrought-cream hover:bg-wrought-copper hover:text-wrought-cream text-iron-black font-mono text-[10px] uppercase tracking-widest font-bold rounded border-2 border-iron-black transition-all font-bold"
                  >
                    View Calibration & Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
