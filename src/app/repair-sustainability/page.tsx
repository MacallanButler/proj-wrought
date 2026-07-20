'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RepairPage() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const parts = [
    { id: 'handle', name: 'Forged Steel Handle', price: '$22.00', desc: 'Pre-assembled with copper grips. Attaches via two standard M5 screws.' },
    { id: 'heating', name: 'M4 Heating Core Module', price: '$45.00', desc: 'Direct drop-in heating block. Plugs into base terminal pins.' },
    { id: 'hinge', name: 'Parallel Floating Linkage', price: '$29.00', desc: 'Precision balanced hinge assembly with bronze bushings.' },
    { id: 'feet', name: 'Cast Base & Vulcanized Feet', price: '$59.00', desc: 'Heavy cast-iron base shell. Includes high-temp slip-resistant rubber pads.' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-4 sm:px-6 md:px-8 bg-wrought-cream text-charcoal">
      
      {/* Page Header */}
      <div className="text-center mb-16 border-b border-iron-black/15 pb-8">
        <span className="font-mono text-xs text-wrought-copper font-bold uppercase tracking-widest">Sustainability & Lifespan</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-iron-black mt-2">Open Hardware Manifesto</h1>
        <p className="text-charcoal/70 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
          We believe you should own what you buy. Explore Wrought's modular architecture, standard components, and user-repairable design.
        </p>
      </div>

      {/* Exploded Diagram & Interactive Parts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        
        {/* Schematic Drawing Col */}
        <div className="lg:col-span-6 bg-[#eae1d4] border-2 border-iron-black rounded-lg p-6 flex flex-col items-center relative">
          <div className="absolute top-2 left-2 font-mono text-[9px] text-iron-black/50 uppercase">Technical schematic</div>
          
          {/* Exploded Interactive SVG */}
          <svg viewBox="0 0 400 400" className="w-full h-auto stroke-iron-black fill-none stroke-[2]">
            
            {/* Handle Layer */}
            <g 
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredComponent('handle')}
              onMouseLeave={() => setHoveredComponent(null)}
              opacity={hoveredComponent === 'handle' || !hoveredComponent ? 1 : 0.35}
            >
              <rect x="130" y="30" width="140" height="8" rx="4" fill={hoveredComponent === 'handle' ? '#B87333' : '#1C1A18'} />
              <path d="M 120,60 L 140,30 M 280,60 L 260,30" strokeWidth="4" />
              <text x="200" y="20" textAnchor="middle" fill="#1C1A18" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">HANDLE ASSEMBLY</text>
            </g>

            <line x1="200" y1="60" x2="200" y2="100" stroke="#B87333" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Heating Core Layer */}
            <g 
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredComponent('heating')}
              onMouseLeave={() => setHoveredComponent(null)}
              opacity={hoveredComponent === 'heating' || !hoveredComponent ? 1 : 0.35}
            >
              <rect x="110" y="110" width="180" height="24" rx="2" fill={hoveredComponent === 'heating' ? 'rgba(184,115,51,0.2)' : 'rgba(28,26,24,0.05)'} />
              <path d="M 130,122 L 270,122 M 140,116 L 260,116 M 140,128 L 260,128" stroke={hoveredComponent === 'heating' ? '#B87333' : '#2E2A26'} />
              <text x="200" y="102" textAnchor="middle" fill="#1C1A18" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">HEATING CORE</text>
            </g>

            <line x1="200" y1="134" x2="200" y2="180" stroke="#B87333" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Hinge Linkage Layer */}
            <g 
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredComponent('hinge')}
              onMouseLeave={() => setHoveredComponent(null)}
              opacity={hoveredComponent === 'hinge' || !hoveredComponent ? 1 : 0.35}
            >
              <path d="M 80,150 L 50,210 L 70,250" stroke={hoveredComponent === 'hinge' ? '#B87333' : '#1C1A18'} strokeWidth="6" strokeLinecap="round" />
              <circle cx="80" cy="150" r="4" fill="#1C1A18" />
              <circle cx="50" cy="210" r="4" fill="#1C1A18" />
              <circle cx="70" cy="250" r="4" fill="#1C1A18" />
              <text x="50" y="138" textAnchor="start" fill="#1C1A18" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">FLOATING HINGE</text>
            </g>

            <line x1="200" y1="210" x2="200" y2="260" stroke="#B87333" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Base Shell Layer */}
            <g 
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredComponent('feet')}
              onMouseLeave={() => setHoveredComponent(null)}
              opacity={hoveredComponent === 'feet' || !hoveredComponent ? 1 : 0.35}
            >
              <path d="M 90,270 L 310,270 L 290,320 L 110,320 Z" fill={hoveredComponent === 'feet' ? 'rgba(184,115,51,0.1)' : '#1C1A18'} />
              <rect x="120" y="320" width="20" height="10" fill="#2E2A26" />
              <rect x="260" y="320" width="20" height="10" fill="#2E2A26" />
              <text x="200" y="345" textAnchor="middle" fill="#1C1A18" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">HEAVY CAST BASE</text>
            </g>

          </svg>
        </div>

        {/* Parts Copy Col */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <h2 className="font-serif text-2xl font-bold text-iron-black">Select Components to Inspect</h2>
          <p className="text-charcoal/80 text-xs sm:text-sm">
            Hover over the schematic layers to isolate specific assemblies. Wrought is built as a stacked sandwich of modules, fastened together with standard metric screws.
          </p>

          <div className="flex flex-col gap-3">
            {parts.map((p) => {
              const isHighlighted = hoveredComponent === p.id;
              return (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoveredComponent(p.id)}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className={`p-4 border-2 rounded transition-all ${
                    isHighlighted 
                      ? 'border-wrought-copper bg-[#eae1d4] shadow-sm' 
                      : 'border-iron-black/10 bg-[#eae1d4]/20'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-serif font-bold text-sm text-iron-black">{p.name}</span>
                    <span className="font-mono text-xs font-bold text-wrought-copper">{p.price}</span>
                  </div>
                  <p className="text-xs text-charcoal/70">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* Right to Repair Principles */}
      <section className="border-t border-iron-black/15 pt-16 mb-20">
        <h2 className="font-serif text-3xl font-bold text-iron-black text-center mb-10">Our Right-to-Repair Oath</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3 p-6 border border-iron-black/15 bg-[#eae1d4]/30 rounded">
            <h3 className="font-serif font-bold text-base text-iron-black">1. Open Fasteners</h3>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              We never use glue, epoxy, or proprietary security screws. The entirety of the Wrought press is held together with standard metric hex-head screws. A standard allen key is all you need to take it apart.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-6 border border-iron-black/15 bg-[#eae1d4]/30 rounded">
            <h3 className="font-serif font-bold text-base text-iron-black">2. Available Spare Parts</h3>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              We commit to keeping all replacement heating cores, hinges, and handles in stock indefinitely. Parts are sold at cost, ensuring repairing your machine is always cheaper than replacing it.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-6 border border-iron-black/15 bg-[#eae1d4]/30 rounded">
            <h3 className="font-serif font-bold text-base text-iron-black">3. Public Repair Schematics</h3>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Our full technical teardown manuals, assembly blueprints, and wiring diagrams are published for free online. No paywalls, no corporate licensing agreements, no warning labels.
            </p>
          </div>
        </div>
      </section>

      {/* American Made Section */}
      <section className="bg-iron-black text-wrought-cream rounded-lg p-8 md:p-12 mb-16 relative overflow-hidden">
        <div className="absolute top-2 right-2 text-wrought-copper opacity-20">
          <svg className="w-40 h-40 stroke-current fill-none stroke-[1]" viewBox="0 0 100 100">
            <polygon points="50,15 63,38 89,38 68,54 76,80 50,64 24,80 32,54 11,38 37,38" />
          </svg>
        </div>
        <div className="max-w-2xl flex flex-col gap-4 relative z-10">
          <span className="font-mono text-[9px] uppercase tracking-widest text-wrought-copper font-bold">Local Foundry Sourcing</span>
          <h2 className="font-serif text-3xl font-bold text-wrought-cream">American Forged & Crafted</h2>
          <p className="text-xs sm:text-sm text-wrought-cream/70 leading-relaxed">
            Every Wrought iron cover and base shell is sand-cast at our partner foundry in Portland, Oregon. We use 100% recycled American iron, melting down industrial machine components to forge new kitchenware. Hand-assembled, tested, and stamped, Wrought is a tribute to American manufacturing craft.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-wrought-copper font-bold mt-2">
            <Shield size={14} /> Certified Lifetime Casting Warranty
          </div>
        </div>
      </section>

      {/* Call to action */}
      <div className="text-center border-t border-iron-black/10 pt-12">
        <Link
          href="/"
          className="py-3.5 px-8 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase text-xs tracking-widest font-bold rounded shadow transition-colors"
        >
          Configure Your Panini Press
        </Link>
      </div>

    </div>
  );
}
