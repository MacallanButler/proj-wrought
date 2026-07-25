'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Mail, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderSummary {
  orderNumber: string;
  email: string;
  name: string;
  address: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: Array<{
    name: string;
    plate: string;
    addons: string[];
    qty: number;
    price: number;
  }>;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    try {
      const storedOrder = localStorage.getItem('last_order');
      if (storedOrder) {
        setOrder(JSON.parse(storedOrder));
      }
    } catch (e) {
      console.error('Failed to load order summary from localStorage', e);
    }
  }, []);

  // Shipping estimate: 4-7 business days
  const getDeliveryEstimate = () => {
    const today = new Date();
    // Add 5 days
    const minDelivery = new Date(today);
    minDelivery.setDate(today.getDate() + 5);
    // Add 8 days
    const maxDelivery = new Date(today);
    maxDelivery.setDate(today.getDate() + 8);

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${minDelivery.toLocaleDateString('en-US', options)} - ${maxDelivery.toLocaleDateString('en-US', options)}, ${maxDelivery.getFullYear()}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto pt-8 pb-16 px-4 sm:px-6 md:px-8 bg-wrought-cream text-charcoal min-h-[70vh] flex flex-col justify-center">
      <div className="bg-[#eae1d4]/40 border-2 border-iron-black rounded-lg p-6 md:p-10 relative overflow-hidden flex flex-col items-center shadow-lg text-center">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-patina-green" />

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-patina-green mb-6"
        >
          <CheckCircle2 size={56} className="stroke-[1.5]" />
        </motion.div>

        {/* Success Message */}
        <span className="font-mono text-[9px] uppercase tracking-widest text-patina-green font-bold bg-patina-green/10 px-3 py-1 rounded-full mb-3">
          Order Confirmed
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-iron-black mb-2">
          Forged & Queued
        </h1>
        <p className="text-charcoal/70 text-xs sm:text-sm max-w-md mb-8">
          Your order has been logged into our casting queue. A confirmation email has been dispatched.
        </p>

        {/* Order Details Grid */}
        {order && (
          <div className="w-full border-t border-b border-iron-black/15 py-6 mb-8 text-left grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            {/* Left Block */}
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-iron-black/55 block text-[9px] uppercase tracking-wider mb-0.5">Order Number</span>
                <span className="font-bold text-sm text-iron-black">{order.orderNumber}</span>
              </div>
              <div>
                <span className="text-iron-black/55 block text-[9px] uppercase tracking-wider mb-0.5">Destination Email</span>
                <span className="font-semibold text-iron-black flex items-center gap-1.5"><Mail size={12} /> {order.email}</span>
              </div>
              <div>
                <span className="text-iron-black/55 block text-[9px] uppercase tracking-wider mb-0.5">Estimated Casting Delivery</span>
                <span className="font-semibold text-iron-black flex items-center gap-1.5"><Calendar size={12} className="text-wrought-copper" /> {getDeliveryEstimate()}</span>
              </div>
            </div>

            {/* Right Block */}
            <div className="flex flex-col gap-3">
              <div>
                <span className="text-iron-black/55 block text-[9px] uppercase tracking-wider mb-0.5">Shipping Address</span>
                <span className="font-semibold text-iron-black flex items-start gap-1.5"><MapPin size={12} className="mt-0.5" /> {order.address}</span>
              </div>
              <div>
                <span className="text-iron-black/55 block text-[9px] uppercase tracking-wider mb-0.5">Total Paid</span>
                <span className="font-bold text-sm text-iron-black tabular-nums">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* What's Next Details */}
        <div className="w-full text-left bg-wrought-cream border border-iron-black/10 p-5 rounded-lg mb-8 font-sans text-xs text-charcoal/80 flex flex-col gap-3">
          <h3 className="font-serif font-bold text-iron-black text-sm">What happens next?</h3>
          <p>
            1. <strong>Casting & Testing:</strong> Each Wrought panini press undergoes a rigorous 4-hour high-heat testing cycle at our Portland foundry before packaging.
          </p>
          <p>
            2. <strong>Shipment Dispatch:</strong> Once certified, you will receive a tracking link via email. Replaceable guide sheets and initial cooking instructions are bundled in the box.
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="py-3 px-8 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase text-xs tracking-widest font-bold rounded shadow transition-colors flex items-center gap-1.5"
        >
          Return to Configurator <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
