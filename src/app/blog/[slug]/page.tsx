'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Thermometer, Calendar, ShieldCheck, HelpCircle, Star } from 'lucide-react';

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
    cook_time: '5 minutes',
    image: '/images/recipe-prosciutto.jpg',
    ingredients: [
      '2 slices of stone-baked sourdough bread',
      '4 thin slices of prosciutto di Parma',
      '1.5 oz sharp gruyère cheese, grated',
      '2 thick slices of ripe heirloom tomato',
      '1 tbsp rosemary-infused olive oil',
      'A pinch of sea salt and freshly cracked black pepper'
    ],
    steps: [
      'Preheat your Wrought panini press with top zone at 375°F and bottom zone at 400°F.',
      'Brush the outer side of each sourdough slice with rosemary-infused olive oil.',
      'Assemble the melt: Layer half the gruyère, tomatoes, salt, pepper, prosciutto, and the remaining gruyère on the bottom slice.',
      'Top with the second slice of sourdough (oil side facing outwards).',
      'Place the sandwich on the bottom plate, lower the floating parallel handle until locked, and press for 4-5 minutes until the cheese core is fully melted and sourdough is crisp.'
    ]
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
    cook_time: '4 minutes',
    image: '/images/recipe-waffles.jpg',
    ingredients: [
      '2 cups all-purpose flour',
      '1.5 tsp active dry yeast',
      '1/3 cup lukewarm milk',
      '2 large eggs, room temp',
      '1/2 cup unsalted butter, softened',
      '3/4 cup Belgian pearl sugar',
      '1 tbsp honey',
      '1 tsp vanilla extract'
    ],
    steps: [
      'Preheat the Wrought press with both zones set to 350°F and The Lattice plates installed.',
      'Dissolve yeast and honey in warm milk and let stand for 5 minutes until frothy.',
      'Combine yeast mixture with eggs, flour, and vanilla extract. Knead into a soft brioche dough. Gradually incorporate softened butter.',
      'Let dough rise in a warm place for 45 minutes until doubled. Fold in pearl sugar.',
      'Divide dough into 6 equal balls. Place one ball in each quadrant of the bottom plate, press firmly, and cook for 3-4 minutes until caramel glaze is deep golden-brown.'
    ]
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
    cook_time: '6 minutes',
    image: '/images/recipe-croque.jpg',
    ingredients: [
      '2 slices of thick-cut brioche bread',
      '3 slices of premium black forest ham',
      '2 tbsp creamy homemade Béchamel sauce',
      '1 tsp Dijon mustard',
      '1/2 cup grated Emmental or Swiss cheese',
      '1 tbsp unsalted butter, melted'
    ],
    steps: [
      'Preheat Wrought with the top zone set to 325°F and the bottom zone set to 350°F.',
      'Brush the outer side of each brioche slice with melted butter.',
      'Spread Dijon mustard on the inside of the bottom slice, then layer black forest ham and half of the Emmental cheese.',
      'Spread Béchamel sauce on the inside of the top slice and place it over the cheese.',
      'Spoon a small dollop of Béchamel on the top outer slice and cover with the remaining Emmental cheese.',
      'Place sandwich on the bottom plate, lower the parallel cover to float just above the cheese without flattening it, and grill for 5-6 minutes until the cheese is browned and bubbly.'
    ]
  }
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function RecipeDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const recipe = LOCAL_RECIPES.find((r) => r.slug === resolvedParams.slug);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (recipe && typeof window !== 'undefined') {
      const favs = localStorage.getItem('wrought_favorites');
      if (favs) {
        const parsed = JSON.parse(favs) as string[];
        setIsFavorite(parsed.includes(recipe.id));
      }
    }
  }, [recipe]);

  const toggleFavorite = () => {
    if (!recipe) return;
    const favs = localStorage.getItem('wrought_favorites');
    let parsed: string[] = favs ? JSON.parse(favs) : [];
    if (parsed.includes(recipe.id)) {
      parsed = parsed.filter(id => id !== recipe.id);
      setIsFavorite(false);
    } else {
      parsed.push(recipe.id);
      setIsFavorite(true);
    }
    localStorage.setItem('wrought_favorites', JSON.stringify(parsed));
  };

  if (!recipe) {
    return (
      <div className="w-full max-w-xl mx-auto py-24 px-4 text-center">
        <p className="font-serif text-lg text-charcoal/70 mb-6">Recipe not found.</p>
        <Link
          href="/blog"
          className="py-3 px-8 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase text-xs tracking-widest font-bold rounded"
        >
          Return to Recipes
        </Link>
      </div>
    );
  }

  // Schema.org Recipe structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    'name': recipe.title,
    'description': recipe.body,
    'datePublished': recipe.published_at,
    'author': {
      '@type': 'Organization',
      'name': 'Wrought Co.'
    },
    'prepTime': 'PT15M',
    'cookTime': 'PT5M',
    'recipeYield': '1 serving',
    'recipeIngredient': recipe.ingredients,
    'recipeInstructions': recipe.steps.map((step, idx) => ({
      '@type': 'HowToStep',
      'position': idx + 1,
      'text': step
    }))
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-6 pb-12 px-4 sm:px-6 md:px-8 bg-wrought-cream text-charcoal">
      {/* JSON-LD for Search Engines */}
      <script
        type="application/ld-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <Link 
        href="/blog" 
        className="font-mono text-[10px] uppercase tracking-widest text-iron-black/60 hover:text-wrought-copper font-bold flex items-center gap-1.5 mb-8"
      >
        <ArrowLeft size={12} /> Back to Recipes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Recipe details */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Recipe Image Banner */}
          {recipe.image && (
            <div className="w-full aspect-[16/10] border-2 border-iron-black rounded-lg overflow-hidden relative bg-[#eae1d4]">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="border-b border-iron-black/15 pb-6">
            <div className="flex gap-4 items-center text-mono text-[9px] text-iron-black/55 uppercase mb-2">
              <span className="flex items-center gap-1"><Calendar size={10} /> {recipe.published_at}</span>
              <span>•</span>
              <span>Cook time: {recipe.cook_time}</span>
            </div>
            
            <div className="flex justify-between items-start gap-4">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-iron-black">{recipe.title}</h1>
              <button
                onClick={toggleFavorite}
                className="p-2 border border-iron-black/15 hover:border-iron-black rounded-full text-iron-black transition-colors focus:outline-none cursor-pointer flex-shrink-0"
                aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Star 
                  size={18} 
                  className={`transition-colors duration-200 ${isFavorite ? 'fill-wrought-copper text-wrought-copper' : 'text-iron-black/40'}`} 
                />
              </button>
            </div>
          </div>

          <p className="text-charcoal/85 text-xs sm:text-sm leading-relaxed italic border-l-2 border-wrought-copper pl-4">
            {recipe.body}
          </p>

          {/* Ingredients list */}
          <div className="bg-[#eae1d4]/40 border border-iron-black/10 rounded-lg p-5">
            <h3 className="font-serif font-bold text-sm text-iron-black mb-3 border-b border-iron-black/10 pb-2">Ingredients Needed</h3>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 text-xs text-charcoal/80">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          {/* Preparation steps */}
          <div>
            <h3 className="font-serif font-bold text-lg text-iron-black mb-4">Casting Instructions</h3>
            <div className="flex flex-col gap-4">
              {recipe.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-iron-black text-wrought-cream text-[10px] font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-charcoal/80 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Structured Info Card */}
        <div className="lg:col-span-4 bg-[#eae1d4] border-2 border-iron-black rounded-lg p-6 relative shadow-sm">
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-iron-black/20" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-iron-black/20" />

          <h3 className="font-serif text-lg font-bold text-iron-black mb-3 border-b border-iron-black/15 pb-2">
            Wrought Calibration
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 p-3.5 bg-wrought-cream rounded border border-iron-black/10 text-xs">
              <div className="flex justify-between items-center font-mono">
                <span className="text-charcoal/60 uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <Thermometer size={10} className="text-wrought-copper" /> Top Zone
                </span>
                <span className="font-bold text-iron-black tabular-nums">{recipe.top_zone_temp}°F</span>
              </div>
              <div className="flex justify-between items-center font-mono">
                <span className="text-charcoal/60 uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <Thermometer size={10} className="text-wrought-copper" /> Bottom Zone
                </span>
                <span className="font-bold text-iron-black tabular-nums">{recipe.bottom_zone_temp}°F</span>
              </div>
              <div className="border-t border-iron-black/10 pt-2 mt-1 text-[10px] text-charcoal/70 font-mono">
                Plates: <span className="font-bold text-iron-black">{recipe.plate}</span>
              </div>
            </div>

            <div className="p-3 bg-wrought-cream border border-iron-black/10 rounded flex items-start gap-2.5">
              <ShieldCheck className="text-patina-green w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="text-[10px] text-charcoal/80 leading-relaxed font-sans">
                Install recommended plate style before preheating. Insert the temperature probe into the sandwich core to automatically trigger acoustic rest mode when target melt temperatures are reached.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
