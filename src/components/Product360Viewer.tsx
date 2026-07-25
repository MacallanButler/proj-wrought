'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product360ViewerProps {
  activePlateId: string;
}

export default function Product360Viewer({ activePlateId }: Product360ViewerProps) {
  const [viewIndex, setViewIndex] = useState(0); // 0: Closed, 1: Open, 2: Exploded
  const [isPreloading, setIsPreloading] = useState(false);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setViewIndex((prev) => (prev + 1) % views.length);
    } else if (info.offset.x > swipeThreshold) {
      setViewIndex((prev) => (prev - 1 + views.length) % views.length);
    }
  };

  const views = [
    { name: 'Forged Exterior', label: 'Closed View' },
    { name: 'Dual Heating Zones', label: 'Open View' },
    { name: 'Modular Architecture', label: 'Exploded View' },
  ];

  // SVG Renderings for each state
  const renderClosedView = () => {
    return (
      <svg viewBox="0 0 500 400" className="w-full h-full max-h-[260px] lg:max-h-[300px] drop-shadow-2xl">
        {/* Shadow */}
        <ellipse cx="250" cy="350" rx="180" ry="15" fill="rgba(28,26,24,0.15)" />
        
        {/* Workshop Surface Line */}
        <line x1="50" y1="350" x2="450" y2="350" stroke="#1C1A18" strokeWidth="2" strokeDasharray="6 4" opacity="0.3" />
        
        {/* Panini Press Body Base */}
        <path d="M 100,320 L 400,320 L 380,340 L 120,340 Z" fill="#1C1A18" stroke="#1C1A18" strokeWidth="2" />
        
        {/* Rubber Feet */}
        <rect x="130" y="340" width="20" height="8" rx="2" fill="#2E2A26" />
        <rect x="350" y="340" width="20" height="8" rx="2" fill="#2E2A26" />

        {/* Lower Iron Housing */}
        <path d="M 90,260 L 410,260 L 400,320 L 100,320 Z" fill="#2E2A26" stroke="#1C1A18" strokeWidth="3" />
        
        {/* Drip Tray Drawer (Copper accent) */}
        <rect x="190" y="295" width="120" height="15" rx="3" fill="#B87333" stroke="#1C1A18" strokeWidth="2" />
        <circle cx="250" cy="302.5" r="4" fill="#1C1A18" />

        {/* Hinge Mechanism Backing */}
        <path d="M 120,260 L 140,200 L 170,200 L 160,260 Z" fill="#1C1A18" />
        <path d="M 380,260 L 360,200 L 330,200 L 340,260 Z" fill="#1C1A18" />

        {/* Top Iron Housing (Closed) */}
        <path d="M 90,195 L 410,195 L 410,250 L 90,250 Z" fill="#1C1A18" stroke="#1C1A18" strokeWidth="3" />
        {/* Texture detail line */}
        <line x1="100" y1="210" x2="400" y2="210" stroke="#F5EFE6" strokeWidth="1" opacity="0.1" />

        {/* Brand Plaque (Copper) */}
        <rect x="200" y="212" width="100" height="18" fill="#B87333" stroke="#1C1A18" strokeWidth="1.5" />
        <text x="250" y="225" textAnchor="middle" fill="#F5EFE6" fontFamily="var(--font-serif)" fontSize="10" fontWeight="bold" letterSpacing="2">WROUGHT</text>

        {/* Plate Config Tag (stamped look) */}
        <rect x="185" y="235" width="130" height="10" rx="1" fill="#A9782F" stroke="#1C1A18" strokeWidth="1" />
        <text x="250" y="242" textAnchor="middle" fill="#F5EFE6" fontFamily="var(--font-mono)" fontSize="6" fontWeight="bold" className="tabular-nums" letterSpacing="0.5">
          PLATES: {activePlateId === 'grille' ? 'THE GRILLE' : activePlateId === 'lattice' ? 'THE LATTICE' : 'THE ANVIL'}
        </text>

        {/* Indicator Lights (Patina green for ready state, copper for heating) */}
        <circle cx="130" cy="225" r="5" fill="#B87333" stroke="#1C1A18" strokeWidth="1" />
        <circle cx="150" cy="225" r="5" fill="#6E8871" stroke="#1C1A18" strokeWidth="1" className="animate-pulse" />

        {/* Heavy Iron Handle Arms */}
        <path d="M 110,225 L 80,225 L 120,130 L 150,130" fill="none" stroke="#2E2A26" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 390,225 L 420,225 L 380,130 L 350,130" fill="none" stroke="#2E2A26" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Handle grip (Copper wood/forged style) */}
        <rect x="140" y="122" width="220" height="16" rx="8" fill="#B87333" stroke="#1C1A18" strokeWidth="2.5" />
        {/* Handle wrap details */}
        <line x1="180" y1="122" x2="180" y2="138" stroke="#1C1A18" strokeWidth="2" />
        <line x1="250" y1="122" x2="250" y2="138" stroke="#1C1A18" strokeWidth="2" />
        <line x1="320" y1="122" x2="320" y2="138" stroke="#1C1A18" strokeWidth="2" />
      </svg>
    );
  };

  const renderOpenView = () => {
    return (
      <svg viewBox="0 0 500 400" className="w-full h-full max-h-[260px] lg:max-h-[300px] drop-shadow-2xl">
        {/* Shadow */}
        <ellipse cx="250" cy="360" rx="190" ry="12" fill="rgba(28,26,24,0.15)" />
        
        {/* Base */}
        <path d="M 90,300 L 410,300 L 390,350 L 110,350 Z" fill="#2E2A26" stroke="#1C1A18" strokeWidth="3" />
        <rect x="180" y="325" width="140" height="15" rx="2" fill="#1C1A18" />

        {/* Bottom Plate (Dynamic depending on active selection) */}
        {renderPlateSVG(activePlateId, 110, 280, 280, 25, false)}

        {/* Hinge Arm (Parallel Mechanism) */}
        <path d="M 120,300 L 70,200 L 100,100" fill="none" stroke="#1C1A18" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        {/* Copper Hinge Pivot pins */}
        <circle cx="120" cy="300" r="6" fill="#B87333" stroke="#1C1A18" strokeWidth="2" />
        <circle cx="70" cy="200" r="6" fill="#B87333" stroke="#1C1A18" strokeWidth="2" />
        <circle cx="100" cy="100" r="6" fill="#B87333" stroke="#1C1A18" strokeWidth="2" />

        {/* Top Housing (Opened angled up at 45deg) */}
        <g transform="translate(100, 100) rotate(-35)">
          {/* Upper Housing Shell */}
          <path d="M -10,-40 L 290,-40 L 290,10 L -10,10 Z" fill="#2E2A26" stroke="#1C1A18" strokeWidth="3" />
          
          {/* Top Plate */}
          {renderPlateSVG(activePlateId, 0, 10, 280, 25, true)}

          {/* Handle */}
          <path d="M 260,-40 L 290,-70 L 250,-70" fill="none" stroke="#1C1A18" strokeWidth="6" strokeLinecap="round" />
          <rect x="100" y="-80" width="160" height="12" rx="6" fill="#B87333" stroke="#1C1A18" strokeWidth="2" />
        </g>

        {/* Steam rising indicator */}
        <path d="M 200,240 Q 210,210 195,180" fill="none" stroke="rgba(245,239,230,0.4)" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
        <path d="M 280,235 Q 295,215 285,185" fill="none" stroke="rgba(245,239,230,0.4)" strokeWidth="4" strokeLinecap="round" className="animate-pulse delay-75" />
      </svg>
    );
  };

  const renderExplodedView = () => {
    return (
      <svg viewBox="0 0 500 440" className="w-full h-full max-h-[260px] lg:max-h-[300px] drop-shadow-2xl">
        {/* Layer 1: Top Handle & Cast Cover (Y: 50) */}
        <g transform="translate(0, 0)">
          <path d="M 150,80 L 350,80 L 330,110 L 170,110 Z" fill="#1C1A18" stroke="#1C1A18" strokeWidth="2" />
          <rect x="180" y="55" width="140" height="12" rx="6" fill="#B87333" stroke="#1C1A18" strokeWidth="2" />
          <text x="250" y="100" textAnchor="middle" fill="#F5EFE6" fontFamily="var(--font-sans)" fontSize="10" opacity="0.7">FORGED IRON CAP</text>
          
          <line x1="250" y1="110" x2="250" y2="130" stroke="#B87333" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Layer 2: Removable Heating Element (Y: 140) */}
        <g transform="translate(0, 50)">
          <rect x="160" y="100" width="180" height="20" rx="3" fill="#B87333" stroke="#1C1A18" strokeWidth="2" fillOpacity="0.8" />
          {/* Heating Coil lines */}
          <path d="M 180,110 L 320,110 M 190,115 L 310,115" stroke="#1C1A18" strokeWidth="2" />
          <text x="250" y="93" textAnchor="middle" fill="#1C1A18" fontFamily="var(--font-sans)" fontSize="9" fontWeight="bold" letterSpacing="1">REPLACEABLE HEATING BLOCK</text>
          
          <line x1="250" y1="120" x2="250" y2="150" stroke="#B87333" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Layer 3: Cooking Plate Insert (Y: 220) */}
        <g transform="translate(0, 110)">
          {renderPlateSVG(activePlateId, 150, 110, 200, 20, false)}
          <text x="250" y="100" textAnchor="middle" fill="#1C1A18" fontFamily="var(--font-sans)" fontSize="10" fontWeight="bold">
            SWAPPABLE PLATE ({activePlateId.toUpperCase()})
          </text>
          
          <line x1="250" y1="130" x2="250" y2="170" stroke="#B87333" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Layer 4: Heavy Iron Base & Hinge (Y: 300) */}
        <g transform="translate(0, 180)">
          <path d="M 130,130 L 370,130 L 350,170 L 150,170 Z" fill="#2E2A26" stroke="#1C1A18" strokeWidth="2.5" />
          {/* Floating Hinge representation */}
          <path d="M 140,130 L 110,70 L 130,50" fill="none" stroke="#1C1A18" strokeWidth="6" strokeLinecap="round" />
          <circle cx="130" cy="50" r="4" fill="#B87333" />
          
          {/* Pull-out drip tray */}
          <rect x="210" y="150" width="80" height="10" fill="#B87333" stroke="#1C1A18" strokeWidth="1.5" />
          
          <text x="250" y="148" textAnchor="middle" fill="#F5EFE6" fontFamily="var(--font-sans)" fontSize="9" opacity="0.8">CAST BASE & PARALLEL HINGE</text>
        </g>
      </svg>
    );
  };

  // Helper to draw the specific plate texture
  const renderPlateSVG = (id: string, x: number, y: number, w: number, h: number, isTop: boolean) => {
    return (
      <g>
        {/* Plate Base Shape */}
        <rect x={x} y={y} width={w} height={h} rx="3" fill="#1C1A18" stroke="#F5EFE6" strokeWidth="1.5" />
        
        {/* Textures */}
        {id === 'grille' && (
          // Vertical ridges
          <g opacity="0.6">
            {Array.from({ length: 12 }).map((_, i) => {
              const rx = x + 15 + i * (w - 30) / 11;
              return <line key={i} x1={rx} y1={y + 2} x2={rx} y2={y + h - 2} stroke="#B87333" strokeWidth="3" strokeLinecap="round" />;
            })}
          </g>
        )}
        
        {id === 'lattice' && (
          // Lattice Grid
          <g opacity="0.6">
            {Array.from({ length: 8 }).map((_, i) => {
              const rx = x + 15 + i * (w - 30) / 7;
              return <line key={`h-${i}`} x1={rx} y1={y + 2} x2={rx} y2={y + h - 2} stroke="#B87333" strokeWidth="2" />;
            })}
            {Array.from({ length: 4 }).map((_, i) => {
              const ry = y + 4 + i * (h - 8) / 3;
              return <line key={`v-${i}`} x1={x + 10} y1={ry} x2={x + w - 10} y2={ry} stroke="#B87333" strokeWidth="2" />;
            })}
          </g>
        )}

        {id === 'anvil' && (
          // Smooth finish with simple edge highlight
          <rect x={x + 4} y={y + 3} width={w - 8} height={h - 6} fill="#2E2A26" opacity="0.5" stroke="#B87333" strokeWidth="1" />
        )}
      </g>
    );
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#eae1d4] border-2 border-iron-black rounded-lg p-4 lg:p-5 relative overflow-hidden">
      {/* Scrollwork Border Pattern Top & Bottom */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-iron-black opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-iron-black opacity-80" />
      
      {/* Headline banner */}
      <div className="w-full flex justify-between items-center mb-4 lg:mb-5 border-b border-iron-black/25 pb-2 lg:pb-3">
        <span className="font-mono text-[10px] tracking-widest text-iron-black/60 uppercase">Interactive Schema</span>
        <h3 className="font-serif text-lg font-bold text-iron-black">{views[viewIndex].name}</h3>
        <span className="font-mono text-xs text-wrought-copper font-bold">{views[viewIndex].label}</span>
      </div>

      {/* Viewer Box */}
      <div className="w-full flex items-center justify-center min-h-[260px] lg:min-h-[300px]">
        {isPreloading ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-iron-black/50">
            <div className="w-8 h-8 border-2 border-wrought-copper border-t-transparent rounded-full animate-spin mb-2" />
            <span className="font-mono text-[10px] uppercase tracking-wider">Forging view...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={viewIndex + activePlateId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full flex justify-center cursor-grab active:cursor-grabbing touch-pan-y"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={handleDragEnd}
            >
              {viewIndex === 0 && renderClosedView()}
              {viewIndex === 1 && renderOpenView()}
              {viewIndex === 2 && renderExplodedView()}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Controller Buttons */}
      <div className="w-full grid grid-cols-3 gap-2 mt-3 lg:mt-4">
        {views.map((view, i) => (
          <button
            key={i}
            onClick={() => {
              setIsPreloading(true);
              setTimeout(() => {
                setViewIndex(i);
                setIsPreloading(false);
              }, 200);
            }}
            className={`py-2 px-2 text-[11px] font-mono tracking-wider uppercase border border-iron-black rounded transition-all duration-300 ${
              viewIndex === i
                ? 'bg-iron-black text-wrought-cream font-bold shadow-md'
                : 'bg-wrought-cream text-iron-black hover:bg-iron-black/5'
            }`}
          >
            {view.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="w-full text-center mt-2 lg:mt-3 flex flex-col gap-0.5">
        <span className="font-mono text-[9px] text-iron-black/50 uppercase tracking-widest">
          Active Plate: {activePlateId === 'grille' ? 'The Grille' : activePlateId === 'lattice' ? 'The Lattice' : 'The Anvil'}
        </span>
        <span className="font-mono text-[8px] text-iron-black/35 uppercase tracking-wider block">
          ← Swipe or drag to rotate schema →
        </span>
      </div>
    </div>
  );
}
