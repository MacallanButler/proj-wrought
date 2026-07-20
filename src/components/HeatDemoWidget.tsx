'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Thermometer, Flame } from 'lucide-react';

interface HeatDemoWidgetProps {
  presetTemps?: { top: number; bottom: number } | null;
  onClearPreset?: () => void;
}

export default function HeatDemoWidget({ presetTemps, onClearPreset }: HeatDemoWidgetProps) {
  const [topTemp, setTopTemp] = useState(350);
  const [bottomTemp, setBottomTemp] = useState(350);
  const [isHeating, setIsHeating] = useState(false);
  const [isReady, setIsReady] = useState(true); // Initially ready at default 350
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Play chime sound using Web Audio API (metallic iron ring sound)
  const playReadyChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const now = ctx.currentTime;
      // Synthesize anvil/bell strike: frequencies 880 (A5), 1235 (B5), 1760 (A6), 2200 (C#7)
      const freqs = [880, 1235, 1760, 2200];
      
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(idx * 4 - 6, now); // slight chorus detuning
        
        gainNode.gain.setValueAtTime(0, now);
        // Fast attack
        gainNode.gain.linearRampToValueAtTime(idx === 0 ? 0.35 : 0.12, now + 0.008);
        // Exponential decay
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + (idx === 0 ? 1.6 : 0.8));
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 1.8);
      });
    } catch (e) {
      console.warn('Web Audio chime play failed or blocked:', e);
    }
  };

  // Handle value changes (simulates heat up cycle)
  const handleTempChange = (zone: 'top' | 'bottom', value: number) => {
    setIsReady(false);
    setIsHeating(true);

    if (zone === 'top') {
      setTopTemp(value);
    } else {
      setBottomTemp(value);
    }

    if (onClearPreset) {
      onClearPreset();
    }

    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // After 1.5s of inactivity, show "Ready" light and ring chime
    timerRef.current = setTimeout(() => {
      setIsHeating(false);
      setIsReady(true);
      playReadyChime();
    }, 1500);
  };

  // Sync with presetTemps prop (e.g., from recipe cards)
  useEffect(() => {
    if (presetTemps) {
      setIsReady(false);
      setIsHeating(true);
      
      // Animate sliders to values
      setTopTemp(presetTemps.top);
      setBottomTemp(presetTemps.bottom);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsHeating(false);
        setIsReady(true);
        playReadyChime();
      }, 1500);
    }
  }, [presetTemps]);

  useEffect(() => {
    isInitialMount.current = false;
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const getTempLabel = (temp: number) => {
    if (temp <= 275) return 'Delicate';
    if (temp <= 325) return 'Low';
    if (temp <= 375) return 'Medium';
    if (temp <= 425) return 'High';
    return 'Sear';
  };

  const getHeatColor = (temp: number) => {
    // Red intensity increases from 250F to 450F
    const ratio = (temp - 250) / 200; // 0 to 1
    const r = Math.floor(184 + ratio * 71); // 184 (copper) to 255 (bright orange-red)
    const g = Math.floor(115 - ratio * 60); // 115 to 55
    const b = Math.floor(51 - ratio * 30);  // 51 to 21
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <section id="heat-demo" className="py-16 px-4 max-w-4xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-iron-black mb-3">
          Dual-Zone Heat Demonstration
        </h2>
        <p className="text-charcoal/80 max-w-xl mx-auto text-sm">
          Simulate Wrought's independent top and bottom element precision. Drag sliders to adjust temperatures and hear the solid iron ready chime.
        </p>
      </div>

      <div className="bg-[#f0e8dc] border-2 border-iron-black rounded-lg p-6 md:p-8 flex flex-col items-center relative overflow-hidden shadow-lg">
        {/* Decorative rivets */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-iron-black/20 border border-iron-black/40" />
        <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-iron-black/20 border border-iron-black/40" />
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-iron-black/20 border border-iron-black/40" />
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-iron-black/20 border border-iron-black/40" />

        {/* Readout Panels */}
        <div className="w-full grid grid-cols-2 gap-4 md:gap-8 mb-8">
          {/* Top Readout */}
          <div className="bg-iron-black text-wrought-cream rounded p-4 flex flex-col items-center border border-iron-black/20">
            <span className="font-mono text-[9px] uppercase tracking-widest text-wrought-cream/65 mb-1 flex items-center gap-1">
              <Thermometer size={10} className="text-wrought-copper" /> Top Zone
            </span>
            <div className="font-mono text-2xl md:text-3xl font-bold tabular-nums text-wrought-cream tracking-tight">
              {topTemp}°F
            </div>
            <span className="font-serif text-xs italic text-wrought-copper mt-1">
              {getTempLabel(topTemp)}
            </span>
          </div>

          {/* Bottom Readout */}
          <div className="bg-iron-black text-wrought-cream rounded p-4 flex flex-col items-center border border-iron-black/20">
            <span className="font-mono text-[9px] uppercase tracking-widest text-wrought-cream/65 mb-1 flex items-center gap-1">
              <Thermometer size={10} className="text-wrought-copper" /> Bottom Zone
            </span>
            <div className="font-mono text-2xl md:text-3xl font-bold tabular-nums text-wrought-cream tracking-tight">
              {bottomTemp}°F
            </div>
            <span className="font-serif text-xs italic text-wrought-copper mt-1">
              {getTempLabel(bottomTemp)}
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="w-full grid grid-cols-2 gap-6 md:gap-12 justify-center max-w-md mb-8">
          {/* Top Slider Container */}
          <div className="flex flex-col items-center">
            <div className="h-60 relative flex items-center justify-center py-2">
              {/* Vertical slider track backdrop */}
              <div className="w-2.5 h-full bg-iron-black rounded-full absolute" />
              
              {/* Thermal Fill effect */}
              <div 
                className="w-2.5 rounded-full absolute bottom-2 transition-all duration-300"
                style={{ 
                  height: `${((topTemp - 250) / 200) * 100}%`,
                  backgroundColor: getHeatColor(topTemp),
                  maxHeight: 'calc(100% - 16px)'
                }}
              />

              <input
                type="range"
                min="250"
                max="450"
                step="5"
                value={topTemp}
                onChange={(e) => handleTempChange('top', parseInt(e.target.value))}
                className="vertical-slider w-6 h-60 opacity-0 cursor-pointer z-10"
                style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' } as any}
              />

              {/* Styled Thumb */}
              <div 
                className="w-6 h-6 rounded border-2 border-iron-black absolute pointer-events-none flex items-center justify-center transition-all duration-75"
                style={{ 
                  bottom: `calc(${((topTemp - 250) / 200) * 100}% - 4px)`, 
                  backgroundColor: getHeatColor(topTemp),
                  boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
                }}
              >
                <div className="w-2.5 h-0.5 bg-iron-black" />
              </div>
            </div>
            <span className="font-mono text-[10px] tracking-wider uppercase text-iron-black/75 mt-4">Top Slider</span>
          </div>

          {/* Bottom Slider Container */}
          <div className="flex flex-col items-center">
            <div className="h-60 relative flex items-center justify-center py-2">
              {/* Vertical slider track backdrop */}
              <div className="w-2.5 h-full bg-iron-black rounded-full absolute" />
              
              {/* Thermal Fill effect */}
              <div 
                className="w-2.5 rounded-full absolute bottom-2 transition-all duration-300"
                style={{ 
                  height: `${((bottomTemp - 250) / 200) * 100}%`,
                  backgroundColor: getHeatColor(bottomTemp),
                  maxHeight: 'calc(100% - 16px)'
                }}
              />

              <input
                type="range"
                min="250"
                max="450"
                step="5"
                value={bottomTemp}
                onChange={(e) => handleTempChange('bottom', parseInt(e.target.value))}
                className="vertical-slider w-6 h-60 opacity-0 cursor-pointer z-10"
                style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' } as any}
              />

              {/* Styled Thumb */}
              <div 
                className="w-6 h-6 rounded border-2 border-iron-black absolute pointer-events-none flex items-center justify-center transition-all duration-75"
                style={{ 
                  bottom: `calc(${((bottomTemp - 250) / 200) * 100}% - 4px)`, 
                  backgroundColor: getHeatColor(bottomTemp),
                  boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
                }}
              >
                <div className="w-2.5 h-0.5 bg-iron-black" />
              </div>
            </div>
            <span className="font-mono text-[10px] tracking-wider uppercase text-iron-black/75 mt-4">Bottom Slider</span>
          </div>
        </div>

        {/* Indicator lights & Status */}
        <div className="w-full border-t border-iron-black/15 pt-6 flex flex-col items-center">
          <div className="flex items-center gap-3">
            {/* Ready LED (patina green) */}
            <div className="relative flex h-5 w-5">
              {isReady && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-patina-green opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-5 w-5 border border-iron-black/30 transition-colors duration-500 ${
                isReady 
                  ? 'bg-patina-green shadow-[0_0_12px_rgba(110,136,113,0.8)]' 
                  : isHeating 
                  ? 'bg-wrought-copper animate-pulse'
                  : 'bg-iron-black/20'
              }`}></span>
            </div>

            <span className="font-serif font-bold text-sm text-iron-black">
              {isReady ? (
                <span className="text-patina-green font-bold">TEMPERATURES REACHED — READY</span>
              ) : isHeating ? (
                <span className="text-wrought-copper font-medium italic flex items-center gap-1.5">
                  <Flame size={14} className="animate-bounce" /> Heating to target...
                </span>
              ) : (
                'STANDBY'
              )}
            </span>

            {isReady && (
              <button 
                onClick={playReadyChime}
                title="Play ready chime"
                className="p-1 rounded-full border border-iron-black/15 hover:bg-iron-black/5 text-iron-black/60 hover:text-iron-black transition-colors"
              >
                <Volume2 size={14} />
              </button>
            )}
          </div>

          <div className="mt-3 flex gap-4 text-[10px] font-mono text-iron-black/50">
            <span>250°F (Delicate)</span>
            <span>•</span>
            <span>350°F (Medium)</span>
            <span>•</span>
            <span>450°F (Sear)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
