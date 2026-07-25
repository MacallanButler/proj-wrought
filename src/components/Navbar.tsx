'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, User, Flame } from 'lucide-react';

export default function Navbar() {
  const { cartItemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#f5efe6]/95 backdrop-blur-md border-b border-iron-black/10 py-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Logo/Wordmark */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Abstract Scrollwork Motif Mark */}
          <svg className="w-6 h-6 stroke-iron-black fill-none stroke-[2] group-hover:stroke-wrought-copper transition-colors duration-300" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <span className="font-serif text-xl font-black tracking-widest text-iron-black uppercase group-hover:text-wrought-copper transition-colors duration-300">
            Wrought
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-iron-black/75">
          <Link href="/#product" className="hover:text-wrought-copper transition-colors">
            Product
          </Link>
          <Link href="/blog" className="hover:text-wrought-copper transition-colors">
            Recipes
          </Link>
          <Link href="/about" className="hover:text-wrought-copper transition-colors">
            About
          </Link>
          <Link href="/repair-sustainability" className="hover:text-wrought-copper transition-colors">
            Repair & Sustainability
          </Link>
          <Link href="/faq" className="hover:text-wrought-copper transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Right Side: Cart & Account */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Cart Icon Link */}
          <Link href="/cart" className="relative p-1.5 text-iron-black hover:text-wrought-copper transition-colors" aria-label="Shopping Cart">
            <ShoppingBag size={20} className="stroke-[1.75]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-wrought-copper text-wrought-cream text-[9px] font-mono font-bold tabular-nums flex items-center justify-center px-1 border border-[#f5efe6] animate-pulse">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Account Icon Link */}
          <Link href="/account" className="p-1.5 text-iron-black hover:text-wrought-copper transition-colors" aria-label="Customer Account">
            <User size={20} className="stroke-[1.75]" />
          </Link>
        </div>

      </div>
    </header>
  );
}
