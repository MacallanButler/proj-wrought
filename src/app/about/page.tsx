'use client';

import React from 'react';
import { Hammer, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4 sm:px-6 md:px-8 bg-wrought-cream text-charcoal">
      
      {/* Page Header */}
      <div className="text-center mb-16 border-b border-iron-black/15 pb-8">
        <span className="font-mono text-xs text-wrought-copper font-bold uppercase tracking-widest">Our Heritage</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-iron-black mt-2">Forged, Not Fabricated</h1>
        <p className="text-charcoal/70 text-xs sm:text-sm mt-3 max-w-lg mx-auto">
          The story of Wrought is a return to honest hardware, heavy casting, and the rejection of planned kitchen obsolescence.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="flex flex-col gap-12 text-sm sm:text-base leading-relaxed">
        
        {/* Row 1: The Kitchen Appliance Crisis */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 flex items-center md:justify-center p-6 bg-[#eae1d4] border border-iron-black/15 rounded">
            <svg viewBox="0 0 100 100" className="w-16 h-16 stroke-iron-black fill-none stroke-[1.5]">
              <rect x="20" y="20" width="60" height="60" rx="3" />
              <line x1="20" y1="50" x2="80" y2="50" />
              <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="3 3" />
              <path d="M 40,35 Q 50,45 60,35" stroke="#B87333" strokeWidth="2" />
            </svg>
          </div>
          <div className="md:col-span-8 flex flex-col gap-3">
            <h2 className="font-serif text-xl font-bold text-iron-black">The Kitchen Appliance Crisis</h2>
            <p className="text-charcoal/80 text-xs sm:text-sm">
              We noticed a trend in modern kitchen appliances: lightweight plastics, glued-in batteries, sealed enclosures, and proprietary screws. If a small heating element dies, the entire machine becomes e-waste. Wrought was born as an act of resistance. We set out to build a panini press using the principles of 19th-century ironwork and open-source modularity.
            </p>
          </div>
        </div>

        {/* Row 2: Forging a Standard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 flex flex-col gap-3 order-2 md:order-1">
            <h2 className="font-serif text-xl font-bold text-iron-black">Forging a Standard</h2>
            <p className="text-charcoal/80 text-xs sm:text-sm">
              Founded in 2024 by a collective of metalsmiths and kitchenware engineers in Portland, Oregon, Wrought manufactures cooking tools using industrial sand-casting techniques. We don't hide the mechanics of our tools. The floating parallel hinge is visible, counterbalanced, and operates on mechanical pivots. The heating block is modular and easily unbolted. It feels like an instrument, not a computer.
            </p>
          </div>
          <div className="md:col-span-4 flex items-center md:justify-center p-6 bg-[#eae1d4] border border-iron-black/15 rounded order-1 md:order-2">
            <Hammer className="w-16 h-16 text-wrought-copper stroke-[1.5]" />
          </div>
        </div>

        {/* Philosophy Callouts */}
        <div className="border-t border-iron-black/15 pt-12 mt-4">
          <h3 className="font-serif text-2xl font-bold text-iron-black text-center mb-8">Our Core Tenets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center p-5 bg-[#eae1d4]/40 border border-iron-black/15 rounded">
              <span className="font-mono text-xs font-bold text-wrought-copper mb-2 uppercase">1. Right-To-Repair</span>
              <p className="text-[11px] text-charcoal/80 leading-relaxed">
                No adhesives, no proprietary fasteners. Standard hex keys unlock every component of the press.
              </p>
            </div>
            <div className="flex flex-col items-center p-5 bg-[#eae1d4]/40 border border-iron-black/15 rounded">
              <span className="font-mono text-xs font-bold text-wrought-copper mb-2 uppercase">2. Thermal Integrity</span>
              <p className="text-[11px] text-charcoal/80 leading-relaxed">
                Heavy cast iron retains thermal mass. Independent zones mean zero heat bleeding between plates.
              </p>
            </div>
            <div className="flex flex-col items-center p-5 bg-[#eae1d4]/40 border border-iron-black/15 rounded">
              <span className="font-mono text-xs font-bold text-wrought-copper mb-2 uppercase">3. Lifetime Casts</span>
              <p className="text-[11px] text-charcoal/80 leading-relaxed">
                If the outer iron casing cracks under ordinary kitchen use, we'll melt it down and re-cast it for free.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12 border-t border-iron-black/10 pt-8">
          <Link
            href="/"
            className="py-3 px-8 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase text-xs tracking-widest font-bold rounded shadow transition-colors"
          >
            Configure Your Wrought
          </Link>
          <Link
            href="/repair-sustainability"
            className="py-3 px-8 border-2 border-iron-black hover:bg-iron-black hover:text-wrought-cream text-iron-black font-mono uppercase text-xs tracking-widest font-bold rounded transition-all"
          >
            Our Repair Principles
          </Link>
        </div>

      </div>
    </div>
  );
}
