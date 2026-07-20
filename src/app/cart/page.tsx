'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const estShipping = cartTotal > 0 ? 15.00 : 0.00;
  const estTax = cartTotal * 0.08; // 8% average tax
  const orderTotal = cartTotal + estShipping + estTax;

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 md:px-8 bg-wrought-cream min-h-[60vh]">
      {/* Back link */}
      <Link 
        href="/" 
        className="font-mono text-[10px] uppercase tracking-widest text-iron-black/60 hover:text-wrought-copper font-bold flex items-center gap-1.5 mb-8"
      >
        <ArrowLeft size={12} /> Back to Product Configurator
      </Link>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-iron-black mb-8 border-b border-iron-black/15 pb-4">
        Your Forge Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-iron-black/15 rounded-lg bg-[#eae1d4]/30">
          <p className="font-serif text-lg text-charcoal/70 mb-6">Your Forge Cart is currently empty.</p>
          <Link
            href="/"
            className="py-3 px-8 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase text-xs tracking-widest font-bold rounded shadow transition-all"
          >
            Configure a Wrought Press
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Line Items */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {cartItems.map((item) => {
                const itemUnitPrice = 
                  item.basePrice + 
                  item.plateOption.priceDelta + 
                  item.addons.reduce((sum, a) => sum + a.priceDelta, 0);
                const lineTotal = itemUnitPrice * item.quantity;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[#eae1d4]/40 border-2 border-iron-black rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-iron-black opacity-60" />
                    
                    {/* Item Description */}
                    <div className="flex-grow">
                      <h2 className="font-serif text-lg font-bold text-iron-black">{item.name}</h2>
                      
                      {/* Configuration Details */}
                      <div className="mt-2 flex flex-col gap-1 font-sans text-xs text-charcoal/80">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-iron-black/50">Casting Plate: </span>
                          <span className="font-semibold text-iron-black">{item.plateOption.name}</span>
                          {item.plateOption.priceDelta > 0 && (
                            <span className="font-mono text-wrought-copper ml-1.5">(+${item.plateOption.priceDelta.toFixed(2)})</span>
                          )}
                        </div>

                        {item.addons.length > 0 && (
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-iron-black/50">Attachments: </span>
                            <ul className="list-disc pl-4 mt-0.5 flex flex-col gap-0.5 text-charcoal/70">
                              {item.addons.map((a) => (
                                <li key={a.id}>
                                  {a.name} <span className="font-mono text-wrought-copper font-bold ml-1">(+${a.priceDelta.toFixed(2)})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center gap-6 self-stretch md:self-auto justify-between border-t border-iron-black/10 md:border-0 pt-4 md:pt-0">
                      {/* Qty controller */}
                      <div className="flex items-center border border-iron-black rounded overflow-hidden bg-wrought-cream">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs hover:bg-iron-black hover:text-wrought-cream border-r border-iron-black transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 font-mono text-xs font-bold text-iron-black tabular-nums min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs hover:bg-iron-black hover:text-wrought-cream border-l border-iron-black transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Price Readout */}
                      <div className="text-right min-w-[80px]">
                        <div className="font-mono text-sm font-bold text-iron-black tabular-nums">
                          ${lineTotal.toFixed(2)}
                        </div>
                        <span className="font-mono text-[9px] text-iron-black/40 block mt-0.5">
                          ${itemUnitPrice.toFixed(2)} ea
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-iron-black/40 hover:text-wrought-copper transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Side: Order Summary Panel */}
          <div className="lg:col-span-4 bg-[#eae1d4] border-2 border-iron-black rounded-lg p-6 relative">
            {/* Decorative rivets */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-iron-black/20" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-iron-black/20" />
            
            <h3 className="font-serif text-xl font-bold text-iron-black border-b border-iron-black/15 pb-3 mb-4">
              Order Summary
            </h3>

            <div className="flex flex-col gap-3 font-mono text-xs border-b border-iron-black/15 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-iron-black/60">Subtotal:</span>
                <span className="font-bold text-iron-black tabular-nums">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-iron-black/60">Est. Shipping:</span>
                <span className="font-bold text-iron-black tabular-nums">${estShipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-iron-black/60">Est. Sales Tax (8%):</span>
                <span className="font-bold text-iron-black tabular-nums">${estTax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end font-serif mb-6">
              <span className="font-bold text-sm text-iron-black">Order Total:</span>
              <span className="font-mono text-xl font-bold text-iron-black tabular-nums">
                ${orderTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/checkout"
                className="w-full py-3.5 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase tracking-widest text-xs font-bold rounded shadow transition-colors flex items-center justify-center gap-1.5"
              >
                Proceed to Checkout <ArrowRight size={14} />
              </Link>

              <div className="flex items-center gap-2 justify-center text-[10px] text-charcoal/70 font-mono mt-2">
                <ShieldCheck size={12} className="text-wrought-copper" /> Secure Stripe Test Sandbox
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
