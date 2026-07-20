'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Product360Viewer from '@/components/Product360Viewer';
import HeatDemoWidget from '@/components/HeatDemoWidget';
import ProductConfigurator from '@/components/ProductConfigurator';
import { ArrowRight, Thermometer, ShieldAlert, Cpu, Sparkles, Droplet, Hammer } from 'lucide-react';

export default function Home() {
  const [activePlateId, setActivePlateId] = useState('grille');
  const [activePreset, setActivePreset] = useState<{ top: number; bottom: number } | null>(null);

  // Client-side query parameters parser for deep linking recipe settings
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const topParam = params.get('top');
      const bottomParam = params.get('bottom');
      if (topParam && bottomParam) {
        const top = parseInt(topParam);
        const bottom = parseInt(bottomParam);
        if (!isNaN(top) && !isNaN(bottom)) {
          setActivePreset({ top, bottom });
          // Delay to ensure rendering is complete before scrolling
          setTimeout(() => {
            const element = document.getElementById('heat-demo');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 200);
        }
      }
    }
  }, []);

  const handleTrySetting = (top: number, bottom: number) => {
    setActivePreset({ top, bottom });
    const element = document.getElementById('heat-demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearPreset = () => {
    setActivePreset(null);
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
    },
    {
      title: 'Lattice-Iron Liège Waffles',
      slug: 'lattice-iron-liege-waffles',
      top: 350,
      bottom: 350,
      desc: 'Traditional Belgian brioche dough waffles caramelizing pearl sugar for a crisp glaze.',
      plate: 'The Lattice',
    },
    {
      title: 'Pressed Croque Monsieur',
      slug: 'pressed-croque-monsieur',
      top: 325,
      bottom: 350,
      desc: 'Decadent black forest ham, creamy Béchamel, and bubbly melted Emmental cheese.',
      plate: 'The Grille or The Anvil',
    },
  ];

  return (
    <div className="flex flex-col w-full text-charcoal bg-wrought-cream overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      
      {/* 1. Hero Section */}
      <section id="product" className="py-12 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Col: Brand Copy */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-wrought-copper font-bold mb-3 flex items-center gap-1.5">
            <Sparkles size={12} /> Forged to endure, built to restore
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-iron-black leading-[1.05] tracking-tight mb-6">
            The Last Press You'll Ever Buy.
          </h1>
          <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            Wrought reimagines the panini press as a heavy kitchen instrument. Combining dual-zone casting plates with modular, user-replaceable heating cores, it is engineered for life and crafted from solid ironwork mechanics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#configure"
              className="py-3 px-8 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase text-xs tracking-widest font-bold rounded shadow-md hover:shadow-lg transition-all text-center"
            >
              Configure Yours
            </a>
            <Link
              href="/repair-sustainability"
              className="py-3 px-8 border-2 border-iron-black hover:bg-iron-black hover:text-wrought-cream text-iron-black font-mono uppercase text-xs tracking-widest font-bold rounded transition-all text-center"
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
      <section className="bg-iron-black text-wrought-cream py-8 border-y-2 border-iron-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <a href="#heat-demo" className="group flex flex-col items-center gap-1">
            <span className="font-mono text-xs font-bold text-wrought-copper group-hover:text-wrought-cream transition-colors flex items-center gap-1">
              Dual-Zone Heat <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[10px] text-wrought-cream/50 uppercase tracking-widest">Independent Sliders</span>
          </a>
          <a href="#configure" className="group flex flex-col items-center gap-1">
            <span className="font-mono text-xs font-bold text-wrought-copper group-hover:text-wrought-cream transition-colors flex items-center gap-1">
              Swappable Plates <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[10px] text-wrought-cream/50 uppercase tracking-widest">Grille, Lattice, Anvil</span>
          </a>
          <Link href="/repair-sustainability" className="group flex flex-col items-center gap-1">
            <span className="font-mono text-xs font-bold text-wrought-copper group-hover:text-wrought-cream transition-colors flex items-center gap-1">
              Right-To-Repair <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[10px] text-wrought-cream/50 uppercase tracking-widest">Modular Element blocks</span>
          </Link>
          <Link href="/repair-sustainability" className="group flex flex-col items-center gap-1">
            <span className="font-mono text-xs font-bold text-wrought-copper group-hover:text-wrought-cream transition-colors flex items-center gap-1">
              American Made <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[10px] text-wrought-cream/50 uppercase tracking-widest">Forged in Oregon</span>
          </Link>
        </div>
      </section>

      {/* 3. Heat Control Demo */}
      <HeatDemoWidget presetTemps={activePreset} onClearPreset={handleClearPreset} />

      {/* 4. Configurator & Purchase */}
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
              Heavy-gauge steel supports double-locked latching handles to anchor the press securely. Automatically powers down elements after 30 minutes of standby, or maintains a gentle 140°F warming hold indefinitely.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Cleaning Features */}
      <section className="py-20 px-4 bg-[#eae1d4] border-t border-iron-black/15">
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
                <strong>The Combo scraper Tool:</strong> Every Wrought includes a matching forged iron scraper tool. Grooved exactly to fit The Grille ridges, it acts as a scraper, spatula, and slicing knife.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-8 bg-wrought-cream border-2 border-iron-black rounded-lg relative overflow-hidden shadow-inner">
            {/* Draw a schematic clean tool diagram */}
            <svg viewBox="0 0 200 150" className="w-full max-w-[280px] stroke-iron-black fill-none stroke-[2]">
              <path d="M 40,90 L 160,90 L 140,110 L 60,110 Z" fill="rgba(184,115,51,0.08)" />
              {/* Levers */}
              <circle cx="50" cy="90" r="4" fill="#B87333" />
              <circle cx="150" cy="90" r="4" fill="#B87333" />
              {/* Drip tray pull out indicator */}
              <path d="M 100,110 L 100,135" strokeDasharray="3 3" />
              <path d="M 95,130 L 100,135 L 105,130" />
              <rect x="80" y="135" width="40" height="8" rx="1" fill="#B87333" />
              {/* Cleaning steam waves */}
              <path d="M 70,70 Q 75,55 70,40" stroke="rgba(110,136,113,0.5)" strokeWidth="3" className="animate-pulse" />
              <path d="M 130,70 Q 135,55 130,40" stroke="rgba(110,136,113,0.5)" strokeWidth="3" className="animate-pulse" />
              <text x="100" y="25" textAnchor="middle" fill="#1C1A18" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1">PLATES DETACHED STATE</text>
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
              className="bg-wrought-cream border-2 border-iron-black rounded-lg p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {/* Graphic card borders */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-iron-black opacity-60" />
              
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="font-serif font-bold text-base text-iron-black group-hover:text-wrought-copper transition-colors">
                    {recipe.title}
                  </h3>
                  <div className="bg-iron-black text-wrought-cream text-[9px] font-mono px-2 py-0.5 rounded uppercase tabular-nums tracking-wider flex items-center gap-1">
                    <Droplet size={8} className="text-wrought-copper" /> {recipe.top}° / {recipe.bottom}°
                  </div>
                </div>
                <p className="text-xs text-charcoal/70 leading-relaxed mb-4">{recipe.desc}</p>
                <div className="font-mono text-[9px] uppercase tracking-wider text-iron-black/50 mb-6">
                  Recommended: <span className="text-iron-black font-semibold">{recipe.plate}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleTrySetting(recipe.top, recipe.bottom)}
                  className="w-full py-2 bg-[#eae1d4] hover:bg-wrought-copper hover:text-wrought-cream text-iron-black font-mono text-[10px] uppercase tracking-widest font-bold rounded border border-iron-black transition-all"
                >
                  Try This Setting
                </button>
                <Link
                  href={`/blog/${recipe.slug}`}
                  className="w-full py-2 text-center text-iron-black hover:text-wrought-copper font-mono text-[9px] uppercase tracking-widest font-bold"
                >
                  Read Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
