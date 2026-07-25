'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, PlateOption, AddonOption } from '@/context/CartContext';
import { Check, ShieldCheck, RefreshCw, PenTool } from 'lucide-react';

interface ProductConfiguratorProps {
  onPlateChange: (id: string) => void;
  selectedPlateId: string;
  setSelectedPlateId: (id: string) => void;
  selectedAddonIds: string[];
  setSelectedAddonIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProductConfigurator({
  onPlateChange,
  selectedPlateId,
  setSelectedPlateId,
  selectedAddonIds,
  setSelectedAddonIds,
}: ProductConfiguratorProps) {
  const { addToCart } = useCart();

  // Seeded plates
  const plates: PlateOption[] = [
    { id: 'grille', name: 'The Grille', priceDelta: 0.00 },
    { id: 'anvil', name: 'The Anvil', priceDelta: 0.00 },
    { id: 'lattice', name: 'The Lattice', priceDelta: 25.00 },
  ];

  // Seeded add-ons
  const addonsList: AddonOption[] = [
    { id: 'butter_roller', name: 'Butter/Oil Roller Reservoir', priceDelta: 39.00 },
    { id: 'crimper_zone', name: 'Edge-Sealing Crimper Zone', priceDelta: 29.00 },
    { id: 'steam_vent', name: 'Steam Vent w/ Water Reservoir', priceDelta: 49.00 },
  ];

  const basePrice = 349.00;
  const selectedPlate = plates.find((p) => p.id === selectedPlateId) || plates[0];
  const selectedAddons = addonsList.filter((a) => selectedAddonIds.includes(a.id));
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(basePrice);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  // Notify parent of plate change to update the 360 viewer
  useEffect(() => {
    onPlateChange(selectedPlate.id);
  }, [selectedPlate, onPlateChange]);

  // Recalculate price
  useEffect(() => {
    const platePrice = selectedPlate.priceDelta;
    const addonsPrice = selectedAddons.reduce((sum, item) => sum + item.priceDelta, 0);
    const itemTotal = (basePrice + platePrice + addonsPrice) * quantity;
    setPrice(itemTotal);
  }, [selectedPlate, selectedAddons, quantity]);

  const handleAddonClick = (addon: AddonOption) => {
    setSelectedAddonIds((prev) => {
      const exists = prev.includes(addon.id);
      if (exists) {
        return prev.filter((id) => id !== addon.id);
      }
      return [...prev, addon.id];
    });
  };

  const handleAddToCart = () => {
    addToCart(selectedPlate, selectedAddons, quantity);
    setShowAddedMessage(true);
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2500);
  };

  // Plate illustrations
  const renderPlateIcon = (id: string) => {
    switch (id) {
      case 'grille':
        return (
          <svg className="w-12 h-12 stroke-iron-black fill-none" viewBox="0 0 48 48">
            <rect x="6" y="8" width="36" height="32" rx="2" strokeWidth="2" />
            <line x1="12" y1="12" x2="12" y2="36" strokeWidth="2" />
            <line x1="18" y1="12" x2="18" y2="36" strokeWidth="2" />
            <line x1="24" y1="12" x2="24" y2="36" strokeWidth="2" />
            <line x1="30" y1="12" x2="30" y2="36" strokeWidth="2" />
            <line x1="36" y1="12" x2="36" y2="36" strokeWidth="2" />
          </svg>
        );
      case 'lattice':
        return (
          <svg className="w-12 h-12 stroke-iron-black fill-none" viewBox="0 0 48 48">
            <rect x="6" y="8" width="36" height="32" rx="2" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="40" strokeWidth="1.5" />
            <line x1="18" y1="8" x2="18" y2="40" strokeWidth="1.5" />
            <line x1="24" y1="8" x2="24" y2="40" strokeWidth="1.5" />
            <line x1="30" y1="8" x2="30" y2="40" strokeWidth="1.5" />
            <line x1="36" y1="8" x2="36" y2="40" strokeWidth="1.5" />
            <line x1="6" y1="14" x2="42" y2="14" strokeWidth="1.5" />
            <line x1="6" y1="20" x2="42" y2="20" strokeWidth="1.5" />
            <line x1="6" y1="26" x2="42" y2="26" strokeWidth="1.5" />
            <line x1="6" y1="32" x2="42" y2="32" strokeWidth="1.5" />
          </svg>
        );
      case 'anvil':
      default:
        return (
          <svg className="w-12 h-12 stroke-iron-black fill-none" viewBox="0 0 48 48">
            <rect x="6" y="8" width="36" height="32" rx="2" strokeWidth="2" />
            <rect x="10" y="12" width="28" height="24" fill="rgba(28,26,24,0.05)" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );
    }
  };

  const getPlateDescription = (id: string) => {
    switch (id) {
      case 'grille':
        return 'Classic ridged cast iron plates for seared lines. Hand-wash / seasoning-care only.';
      case 'lattice':
        return 'Waffle pattern cast iron plates. For Belgian waffles (+ $25). Hand-wash / seasoning-care only.';
      case 'anvil':
      default:
        return 'Smooth flat cast iron plates. Ideal for standard griddling. Hand-wash / seasoning-care only.';
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 bg-wrought-cream border-2 border-iron-black rounded-lg p-6 md:p-8 shadow-md">
      {/* Configure Heading */}
      <div className="border-b border-iron-black/15 pb-4">
        <h3 className="font-serif text-2xl font-bold text-iron-black">Configure Your Wrought</h3>
        <p className="text-charcoal/70 text-xs mt-1">Select your casting plate style and modular attachments.</p>
      </div>

      {/* 1. Plate Style Selection */}
      <div className="flex flex-col gap-3">
        <label className="font-mono text-xs uppercase tracking-widest text-iron-black/75 font-semibold">
          1. Plate Style (Required)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {plates.map((plate) => {
            const isSelected = selectedPlate.id === plate.id;
            return (
              <button
                key={plate.id}
                type="button"
                onClick={() => setSelectedPlateId(plate.id)}
                className={`flex flex-col items-center p-4 border-2 rounded text-left transition-all ${
                  isSelected
                    ? 'border-wrought-copper bg-[#eae1d4] shadow-sm'
                    : 'border-iron-black/15 hover:border-iron-black/40 bg-transparent'
                }`}
              >
                <div className="mb-3">{renderPlateIcon(plate.id)}</div>
                <div className="font-serif font-bold text-sm text-iron-black mb-1">{plate.name}</div>
                <div className="font-mono text-[10px] text-wrought-copper font-bold mb-2">
                  {plate.priceDelta > 0 ? `+ $${plate.priceDelta.toFixed(2)}` : 'Included'}
                </div>
                <p className="text-[11px] text-charcoal/80 text-center leading-snug">{getPlateDescription(plate.id)}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Addons Selection */}
      <div className="flex flex-col gap-3">
        <label className="font-mono text-xs uppercase tracking-widest text-iron-black/75 font-semibold">
          2. Modular Attachments (Optional)
        </label>
        <div className="flex flex-col gap-2">
          {addonsList.map((addon) => {
            const isChecked = !!selectedAddons.find((item) => item.id === addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => handleAddonClick(addon)}
                className={`flex items-center justify-between p-3.5 border-2 rounded text-left transition-all ${
                  isChecked
                    ? 'border-wrought-copper bg-[#eae1d4]'
                    : 'border-iron-black/15 hover:border-iron-black/30 bg-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4.5 h-4.5 border rounded flex items-center justify-center border-iron-black ${
                    isChecked ? 'bg-wrought-copper' : 'bg-transparent'
                  }`}>
                    {isChecked && <Check size={12} className="text-wrought-cream stroke-[3]" />}
                  </div>
                  <div>
                    <div className="font-serif font-semibold text-xs text-iron-black">{addon.name}</div>
                    <div className="text-[10px] text-charcoal/65 mt-0.5">{addon.id === 'butter_roller' ? 'Attaches for automated butter distribution.' : addon.id === 'crimper_zone' ? 'Perfect for sealed hot pockets & hand pies.' : 'Adds steam functionality during grilling.'}</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-wrought-copper ml-2 tabular-nums">
                  + ${addon.priceDelta.toFixed(2)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Quantity & Pricing Details */}
      <div className="bg-[#eae1d4] border border-iron-black/15 rounded p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Quantity Controller */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase text-iron-black/70">Quantity:</span>
          <div className="flex items-center border border-iron-black rounded overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 text-sm bg-wrought-cream text-iron-black hover:bg-iron-black hover:text-wrought-cream border-r border-iron-black transition-colors"
            >
              -
            </button>
            <span className="px-4 py-1 font-mono text-sm font-bold text-iron-black tabular-nums bg-wrought-cream min-w-[32px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 text-sm bg-wrought-cream text-iron-black hover:bg-iron-black hover:text-wrought-cream border-l border-iron-black transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Dynamic Price Display */}
        <div className="text-right">
          <span className="font-mono text-[9px] uppercase tracking-wider text-iron-black/60 block mb-0.5">Total Configuration Price</span>
          <div className="font-mono text-2xl font-bold tabular-nums text-iron-black tracking-tight">
            <AnimatePresence mode="wait">
              <motion.span
                key={price}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                ${price.toFixed(2)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-4 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden active:scale-[0.98]"
        >
          Add to Forge Cart
        </button>

        {showAddedMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center font-serif text-xs text-patina-green font-bold flex items-center justify-center gap-1.5 mt-1"
          >
            <Check size={14} /> Added Wrought Panini Press configuration to cart.
          </motion.div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="border-t border-iron-black/10 pt-4 flex justify-between text-[10px] text-charcoal/70 font-mono">
        <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-wrought-copper" /> Lifetime Casting Warranty</span>
        <span className="flex items-center gap-1"><RefreshCw size={12} className="text-wrought-copper" /> Modular Right-to-Repair</span>
        <span className="flex items-center gap-1"><PenTool size={12} className="text-wrought-copper" /> American Forged</span>
      </div>
    </div>
  );
}
