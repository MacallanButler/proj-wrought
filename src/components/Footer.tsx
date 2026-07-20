'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-iron-black text-wrought-cream/80 border-t-2 border-iron-black pt-16 pb-8 px-4 sm:px-6 md:px-8 mt-auto font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Col 1: Brand & Philosophy */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-serif text-lg font-black tracking-widest text-wrought-cream uppercase">
            Wrought
          </Link>
          <p className="text-xs text-wrought-cream/60 leading-relaxed max-w-xs font-sans">
            Forged in steel and designed for generation-spanning durability. Built on user-replaceable modules and precision cooking controls.
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] tracking-widest text-wrought-cream/50 uppercase font-bold">
            Navigation
          </span>
          <ul className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-wider text-wrought-cream/80">
            <li>
              <Link href="/#product" className="hover:text-wrought-copper transition-colors">
                The Product
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-wrought-copper transition-colors">
                Recipes
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-wrought-copper transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/repair-sustainability" className="hover:text-wrought-copper transition-colors">
                Repair Guides
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-wrought-copper transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Social & Support */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] tracking-widest text-wrought-cream/50 uppercase font-bold">
            Company & Trust
          </span>
          <ul className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-wider text-wrought-cream/80">
            <li>
              <a href="#" className="hover:text-wrought-copper transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-wrought-copper transition-colors">
                YouTube
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-wrought-copper transition-colors">
                Lifetime Warranty
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-wrought-copper transition-colors">
                Contact Forge
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter Signup */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] tracking-widest text-wrought-cream/50 uppercase font-bold">
            Stay Updated
          </span>
          <p className="text-xs text-wrought-cream/60 leading-relaxed max-w-xs font-sans">
            Receive recipe releases and updates regarding modular attachments.
          </p>
          <form onSubmit={handleSubmit} className="flex border border-wrought-cream/20 rounded overflow-hidden mt-1">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-wrought-cream placeholder-wrought-cream/40 text-xs px-3.5 py-2.5 outline-none flex-grow"
            />
            <button
              type="submit"
              className="bg-wrought-cream text-iron-black hover:bg-wrought-copper hover:text-wrought-cream px-3 flex items-center justify-center transition-colors"
              aria-label="Subscribe"
            >
              {subscribed ? <Check size={14} className="text-patina-green" /> : <Send size={14} />}
            </button>
          </form>
          {subscribed && (
            <span className="text-[10px] text-patina-green font-bold font-mono">
              Successfully subscribed to our list!
            </span>
          )}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto border-t border-wrought-cream/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[9px] text-wrought-cream/40 tracking-wider">
          © {new Date().getFullYear()} WROUGHT CO. ALL RIGHTS RESERVED. FORGED IN OREGON, USA.
        </span>
        <span className="font-mono text-[9px] text-wrought-cream/40 tracking-wider">
          STRIPE TEST MODE • TERMS & PRIVACY
        </span>
      </div>
    </footer>
  );
}
