'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Thermometer, Calendar } from 'lucide-react';

const LOCAL_RECIPES = [
  {
    id: 'a4d95221-d1c0-4321-ba2a-ea9121a97d91',
    title: 'Sourdough Prosciutto Melt',
    slug: 'sourdough-prosciutto-melt',
    body: 'A classic, robust melt featuring thin layers of prosciutto di Parma, sharp gruyère cheese, and fresh heirloom tomato slices nestled inside stone-baked sourdough slices brushed with rosemary-infused olive oil. We recommend using The Anvil or The Grille plates to achieve a thick, satisfying crunch.',
    top_zone_temp: 375,
    bottom_zone_temp: 400,
    plate: 'The Anvil or The Grille',
    published_at: '2026-07-15',
    image: '/images/recipe-prosciutto.jpg'
  },
  {
    id: 'b2c83210-b74d-4521-a477-ba912fa92c31',
    title: 'Lattice-Iron Liège Waffles',
    slug: 'lattice-iron-liege-waffles',
    body: 'Traditional Belgian waffles made with yeast-risen brioche dough studded with imported pearl sugar. As the waffle presses in The Lattice, the sugar caramelizes on the exterior, creating a crisp glaze. Set both zones to equal heat to ensure optimal rise and caramelization without burning.',
    top_zone_temp: 350,
    bottom_zone_temp: 350,
    plate: 'The Lattice',
    published_at: '2026-07-10',
    image: '/images/recipe-waffles.jpg'
  },
  {
    id: 'c6d59421-4fa2-432d-9477-019bbccaa211',
    title: 'Pressed Croque Monsieur',
    slug: 'pressed-croque-monsieur',
    body: 'A decadent French classic filled with thick-cut black forest ham, creamy Béchamel sauce, and dijon mustard, topped with bubbly Emmental cheese. Using a slightly cooler top zone allows the cheese to melt and brown perfectly while the hotter bottom zone toasts the brioche bread.',
    top_zone_temp: 325,
    bottom_zone_temp: 350,
    plate: 'The Grille or The Anvil',
    published_at: '2026-07-05',
    image: '/images/recipe-croque.jpg'
  }
];

export default function BlogIndexPage() {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 md:px-8 bg-wrought-cream text-charcoal">
      
      {/* Header */}
      <div className="text-center mb-16 border-b border-iron-black/15 pb-8">
        <span className="font-mono text-xs text-wrought-copper font-bold uppercase tracking-widest">Culinary Blueprints</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-iron-black mt-2">Wrought Recipes</h1>
        <p className="text-charcoal/70 text-xs sm:text-sm mt-3 max-w-md mx-auto">
          Unlock the full cooking potential of independent top and bottom thermal zones.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LOCAL_RECIPES.map((recipe) => (
          <div 
            key={recipe.id}
            className="bg-[#eae1d4]/30 border-2 border-iron-black rounded-lg p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-iron-black opacity-60" />
            
            <div>
              <div className="flex justify-between items-start gap-4 mb-3">
                <span className="font-mono text-[9px] text-iron-black/40 flex items-center gap-1.5">
                  <Calendar size={10} /> {recipe.published_at}
                </span>
                <span className="bg-iron-black text-wrought-cream text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                  {recipe.top_zone_temp}° / {recipe.bottom_zone_temp}°
                </span>
              </div>

              <h2 className="font-serif text-lg font-bold text-iron-black mb-3 hover:text-wrought-copper transition-colors">
                <Link href={`/blog/${recipe.slug}`}>
                  {recipe.title}
                </Link>
              </h2>
              
              <p className="text-xs text-charcoal/80 leading-relaxed mb-4 line-clamp-3">
                {recipe.body}
              </p>
            </div>

            <div className="border-t border-iron-black/10 pt-4 flex flex-col gap-3">
              <div className="text-[10px] font-mono text-charcoal/50">
                Recommended Plate: <span className="font-bold text-iron-black">{recipe.plate}</span>
              </div>
              <Link
                href={`/blog/${recipe.slug}`}
                className="font-mono text-xs uppercase tracking-widest text-iron-black hover:text-wrought-copper font-bold flex items-center gap-1.5"
              >
                View Full Recipe <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
