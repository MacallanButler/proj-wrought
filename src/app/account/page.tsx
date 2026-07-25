'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Star, Settings, Award, History, Thermometer, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderItem {
  name: string;
  plate: string;
  addons: string[];
  qty: number;
  price: number;
}

interface OrderSummary {
  orderNumber: string;
  email: string;
  name: string;
  address: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  date: string;
  timestamp: number;
  items: OrderItem[];
}

const LOCAL_RECIPES = [
  {
    id: 'a4d95221-d1c0-4321-ba2a-ea9121a97d91',
    title: 'Sourdough Prosciutto Melt',
    slug: 'sourdough-prosciutto-melt',
    desc: 'Thinly sliced prosciutto, gruyère, and fresh heirloom tomato brushed with rosemary olive oil.',
    plate: 'The Anvil or The Grille',
    image: '/images/recipe-prosciutto.jpg',
  },
  {
    id: 'b2c83210-b74d-4521-a477-ba912fa92c31',
    title: 'Lattice-Iron Liège Waffles',
    slug: 'lattice-iron-liege-waffles',
    desc: 'Traditional Belgian brioche dough waffles caramelizing pearl sugar for a crisp glaze.',
    plate: 'The Lattice',
    image: '/images/recipe-waffles.jpg',
  },
  {
    id: 'c6d59421-4fa2-432d-9477-019bbccaa211',
    title: 'Pressed Croque Monsieur',
    slug: 'pressed-croque-monsieur',
    desc: 'Decadent black forest ham, creamy Béchamel, and bubbly melted Emmental cheese.',
    plate: 'The Grille or The Anvil',
    image: '/images/recipe-croque.jpg',
  }
];

export default function AccountDashboardPage() {
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites'>('profile');
  const [daysToMaintenance, setDaysToMaintenance] = useState(60);
  const [maintenanceDateStr, setMaintenanceDateStr] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. Fetch order history
      const lastOrderStr = localStorage.getItem('last_order');
      let currentOrder: OrderSummary | null = null;
      if (lastOrderStr) {
        try {
          currentOrder = JSON.parse(lastOrderStr);
          setOrder(currentOrder);
        } catch (e) {
          console.error(e);
        }
      }

      // 2. Fetch favorites
      const favsStr = localStorage.getItem('wrought_favorites');
      if (favsStr) {
        try {
          setFavorites(JSON.parse(favsStr));
        } catch (e) {
          console.error(e);
        }
      }

      // 3. Compute maintenance countdown (90 days interval)
      const orderTime = currentOrder?.timestamp || (Date.now() - 30 * 24 * 60 * 60 * 1000); // fallback to 30 days ago
      const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;
      const maintenanceTime = orderTime + ninetyDaysMs;
      const timeLeftMs = maintenanceTime - Date.now();
      const daysLeft = Math.max(0, Math.ceil(timeLeftMs / (24 * 60 * 60 * 1000)));
      setDaysToMaintenance(daysLeft);

      const mDate = new Date(maintenanceTime);
      setMaintenanceDateStr(mDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    }
  }, []);

  const favoriteRecipes = LOCAL_RECIPES.filter(r => favorites.includes(r.id));

  // Determine current active config
  const activePlate = order?.items[0]?.plate || 'The Grille';
  const activeAddons = order?.items[0]?.addons || [];

  return (
    <div className="w-full max-w-6xl mx-auto pt-6 pb-12 px-4 sm:px-6 md:px-8 bg-wrought-cream text-charcoal">
      
      {/* 1. Header Area */}
      <div className="border-b border-iron-black/15 pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-mono text-xs text-wrought-copper font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Award size={14} /> Registered Wrought Owner
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-iron-black mt-2">
            Welcome back, {order ? order.name.split(' ')[0] : 'Patriot'}
          </h1>
          <p className="text-[11px] font-mono text-charcoal/50 uppercase tracking-wider mt-1">
            Owner ID: {order ? `WR-${order.orderNumber.split('-')[1]}` : 'WR-GUEST'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-[#eae1d4] border border-iron-black/10 p-1 rounded font-mono text-[10px] uppercase tracking-wider font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-1.5 px-4 rounded transition-all cursor-pointer ${activeTab === 'profile' ? 'bg-iron-black text-wrought-cream' : 'text-iron-black/60 hover:text-iron-black'}`}
          >
            Press Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-1.5 px-4 rounded transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-iron-black text-wrought-cream' : 'text-iron-black/60 hover:text-iron-black'}`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-1.5 px-4 rounded transition-all cursor-pointer ${activeTab === 'favorites' ? 'bg-iron-black text-wrought-cream' : 'text-iron-black/60 hover:text-iron-black'}`}
          >
            Favorites ({favorites.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left 8 Cols: Dynamic Tab Content */}
        <div className="lg:col-span-8">
          {activeTab === 'profile' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-8"
            >
              {/* Configuration Profile */}
              <div className="bg-[#eae1d4]/40 border-2 border-iron-black rounded-lg p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-iron-black mb-4 border-b border-iron-black/10 pb-2 flex items-center gap-2">
                  <Settings size={18} className="text-wrought-copper" /> Active Press Configuration
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-mono text-[9px] uppercase text-charcoal/50">Base Press Chassis</span>
                    <span className="font-serif font-bold text-sm text-iron-black">Wrought Panini Press (Modular 1800W)</span>
                    <span className="font-mono text-[10px] text-patina-green mt-1 flex items-center gap-1">
                      <ShieldCheck size={12} /> Standard Parallel-Hinge Frame
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-mono text-[9px] uppercase text-charcoal/50">Casting Plate Configuration</span>
                    <span className="font-serif font-bold text-sm text-iron-black">{activePlate} Installed</span>
                    <span className="text-[10px] text-charcoal/65 mt-1">Hand-wash / seasoning-care only.</span>
                  </div>
                </div>

                {activeAddons.length > 0 && (
                  <div className="mt-6 border-t border-iron-black/10 pt-4">
                    <span className="font-mono text-[9px] uppercase text-charcoal/50 block mb-2">Equipped Attachments</span>
                    <div className="flex flex-wrap gap-2">
                      {activeAddons.map((addon, idx) => (
                        <span key={idx} className="bg-iron-black text-wrought-cream text-[9px] font-mono py-1 px-2.5 rounded border border-iron-black font-bold uppercase tracking-wider">
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cast Iron Care Guide */}
              <div className="bg-wrought-cream border-2 border-iron-black rounded-lg p-6 md:p-8 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-iron-black mb-4 border-b border-iron-black/15 pb-2">
                  Cast Iron Care & Seasoning Guide
                </h3>
                
                <div className="flex flex-col gap-6 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-iron-black mb-1.5">1. Daily Cleaning Protocol</h4>
                    <p>
                      Never put plates in the dishwasher or soak them in the sink. Immediately after cooking, while plates are still warm, run Wrought's Flat Paddle Comb-Scraper over the ridges. Use warm water and a stiff nylon brush to clean off residue. Dry completely with a towel right away.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm text-iron-black mb-1.5">2. Moisture and Drying</h4>
                    <p>
                      Standing moisture is the enemy of raw cast iron. After towel-drying, we recommend locking the plates into Wrought, turning both zones to 250°F, and running it dry for 3-5 minutes. This evaporates microscopic droplets in the iron pores before storage.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm text-iron-black mb-1.5">3. Polymerization & Seasoning</h4>
                    <p>
                      To maintain a natural, slick non-stick surface, season plates every 90 days. Rub a thin coat of organic grape seed oil or flaxseed oil over the entire plate surfaces. Wipe off excess oil until plates look dry. Install plates, lock Wrought closed, set both zones to 450°F, and bake for one hour. Let cool slowly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              {order ? (
                <div className="bg-wrought-cream border-2 border-iron-black rounded-lg p-6 shadow-sm">
                  {/* Order Header */}
                  <div className="flex justify-between items-start border-b border-iron-black/15 pb-4 mb-6">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-wrought-copper font-bold">Order Received & Calibrated</span>
                      <h3 className="font-serif text-lg font-bold text-iron-black mt-1">Invoice: {order.orderNumber}</h3>
                    </div>
                    <span className="font-mono text-[10px] text-charcoal/50 bg-[#eae1d4] px-2 py-0.5 rounded uppercase font-bold">
                      {order.date}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="flex flex-col gap-4 border-b border-iron-black/10 pb-4 mb-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs gap-4">
                        <div>
                          <span className="font-serif font-bold text-sm text-iron-black block">{item.name}</span>
                          <span className="font-mono text-[9px] text-charcoal/60">
                            Plates: {item.plate} {item.addons.length > 0 && `• Add-ons: ${item.addons.join(', ')}`}
                          </span>
                          <span className="text-[10px] text-charcoal/50 block mt-1">Quantity: {item.qty}</span>
                        </div>
                        <span className="font-mono font-bold text-iron-black">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="flex flex-col gap-2 font-mono text-[11px] border-b border-iron-black/10 pb-4 mb-4">
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">Subtotal:</span>
                      <span className="font-semibold text-iron-black">${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">Shipping:</span>
                      <span className="font-semibold text-iron-black">${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">Estimated Tax:</span>
                      <span className="font-semibold text-iron-black">${order.tax.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total & Shipping Info */}
                  <div className="flex justify-between items-end font-serif">
                    <span className="font-bold text-sm text-iron-black">Total Paid:</span>
                    <span className="font-mono text-base font-bold text-iron-black">${order.total.toFixed(2)}</span>
                  </div>

                  <div className="mt-6 p-4 bg-[#eae1d4]/40 border border-iron-black/10 rounded text-xs text-charcoal/80 flex flex-col gap-1">
                    <span className="font-mono text-[9px] uppercase text-charcoal/50">Shipping Destination</span>
                    <span className="font-bold text-iron-black">{order.name}</span>
                    <span>{order.address}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-[#eae1d4]/30 border-2 border-iron-black border-dashed rounded-lg p-12 text-center">
                  <History className="text-iron-black/30 w-12 h-12 mx-auto mb-4" />
                  <p className="font-serif text-base text-charcoal/70 mb-4">No order history found for this device.</p>
                  <Link
                    href="/#configure"
                    className="inline-block py-2.5 px-6 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase text-[10px] tracking-widest font-bold rounded"
                  >
                    Configure First Press
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'favorites' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {favoriteRecipes.length > 0 ? (
                favoriteRecipes.map((recipe) => (
                  <div 
                    key={recipe.id} 
                    className="bg-[#eae1d4]/30 border-2 border-iron-black rounded-lg flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                    {recipe.image && (
                      <div className="w-full h-40 border-b-2 border-iron-black overflow-hidden relative">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-base text-iron-black group-hover:text-wrought-copper transition-colors mb-2">
                          {recipe.title}
                        </h3>
                        <p className="text-xs text-charcoal/80 leading-relaxed mb-4 line-clamp-2">{recipe.desc}</p>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-iron-black/50 mb-4">
                          Recommended: <span className="text-iron-black font-bold">{recipe.plate}</span>
                        </div>
                        
                        <Link
                          href={`/blog/${recipe.slug}`}
                          className="w-full block py-2 text-center bg-wrought-cream hover:bg-wrought-copper hover:text-wrought-cream text-iron-black font-mono text-[9px] uppercase tracking-widest font-bold rounded border border-iron-black transition-all"
                        >
                          View Calibration
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 bg-[#eae1d4]/30 border-2 border-iron-black border-dashed rounded-lg p-12 text-center w-full">
                  <Star className="text-iron-black/30 w-12 h-12 mx-auto mb-4" />
                  <p className="font-serif text-base text-charcoal/70 mb-4">You haven't favorited any recipes yet.</p>
                  <Link
                    href="/blog"
                    className="inline-block py-2.5 px-6 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase text-[10px] tracking-widest font-bold rounded"
                  >
                    Browse Recipes
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Right 4 Cols: Maintenance Countdown Widget */}
        <div className="lg:col-span-4 bg-[#eae1d4] border-2 border-iron-black rounded-lg p-6 relative shadow-sm">
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-iron-black/20" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-iron-black/20" />

          <h3 className="font-serif text-lg font-bold text-iron-black mb-3 border-b border-iron-black/15 pb-2">
            Seasoning Timer
          </h3>

          <div className="flex flex-col items-center py-6 text-center">
            {/* Visual Circular countdown representation */}
            <div className="w-32 h-32 rounded-full border-4 border-iron-black/10 flex flex-col justify-center items-center relative bg-wrought-cream mb-4">
              <span className="font-mono text-3xl font-black text-iron-black tabular-nums">{daysToMaintenance}</span>
              <span className="font-mono text-[8px] uppercase tracking-wider text-charcoal/50">Days Left</span>
              
              {/* Outer copper progress ring */}
              <svg className="absolute inset-0 w-full h-full rotate-270">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="transparent"
                  stroke="#B87333"
                  strokeWidth="4"
                  strokeDasharray="377"
                  strokeDashoffset={377 - (377 * daysToMaintenance) / 90}
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <span className="font-serif font-bold text-sm text-iron-black mb-1">Recommended Seasoning Due</span>
            <span className="font-mono text-[10px] text-wrought-copper uppercase font-bold">{maintenanceDateStr || 'September 24, 2026'}</span>
          </div>

          <div className="border-t border-iron-black/10 pt-4 flex flex-col gap-2">
            <p className="text-[10px] text-charcoal/75 leading-relaxed">
              Based on Wrought's heavy cast-iron thermal absorption characteristics, seasoning polymerization degrades over cooking cycles. Re-apply grape seed oil every 90 days to retain optimal non-stick protection.
            </p>
            
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const newTimestamp = Date.now();
                  if (order) {
                    const updatedOrder = { ...order, timestamp: newTimestamp, date: new Date().toLocaleDateString() };
                    localStorage.setItem('last_order', JSON.stringify(updatedOrder));
                    setOrder(updatedOrder);
                  } else {
                    const dummyOrder = {
                      orderNumber: "WR-RESET",
                      email: "owner@forge.com",
                      name: "Wrought Owner",
                      address: "Local Foundry",
                      subtotal: 0, shipping: 0, tax: 0, total: 0,
                      date: new Date().toLocaleDateString(),
                      timestamp: newTimestamp,
                      items: []
                    };
                    localStorage.setItem('last_order', JSON.stringify(dummyOrder));
                  }
                  setDaysToMaintenance(90);
                  const mDate = new Date(newTimestamp + 90 * 24 * 60 * 60 * 1000);
                  setMaintenanceDateStr(mDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
                  alert('Casting maintenance log updated. Seasoning timer reset to 90 days!');
                }
              }}
              className="w-full py-2 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase tracking-widest text-[9px] font-bold rounded shadow transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Droplet size={10} className="fill-currentColor" /> Log Seasoning Event
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
