'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, CreditCard, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51MockKeyWroughtPress123456');

// US State to Shipping Zone Mapping
const stateToZoneMap: { [key: string]: { name: string; rate: number } } = {
  // Eastern US ($15)
  NY: { name: 'Eastern US', rate: 15.00 }, NJ: { name: 'Eastern US', rate: 15.00 }, PA: { name: 'Eastern US', rate: 15.00 },
  MA: { name: 'Eastern US', rate: 15.00 }, CT: { name: 'Eastern US', rate: 15.00 }, RI: { name: 'Eastern US', rate: 15.00 },
  VT: { name: 'Eastern US', rate: 15.00 }, NH: { name: 'Eastern US', rate: 15.00 }, ME: { name: 'Eastern US', rate: 15.00 },
  DE: { name: 'Eastern US', rate: 15.00 }, MD: { name: 'Eastern US', rate: 15.00 }, VA: { name: 'Eastern US', rate: 15.00 },
  WV: { name: 'Eastern US', rate: 15.00 }, NC: { name: 'Eastern US', rate: 15.00 }, SC: { name: 'Eastern US', rate: 15.00 },
  GA: { name: 'Eastern US', rate: 15.00 }, FL: { name: 'Eastern US', rate: 15.00 },
  
  // Central US ($18)
  IL: { name: 'Central US', rate: 18.00 }, IN: { name: 'Central US', rate: 18.00 }, MI: { name: 'Central US', rate: 18.00 },
  OH: { name: 'Central US', rate: 18.00 }, KY: { name: 'Central US', rate: 18.00 }, TN: { name: 'Central US', rate: 18.00 },
  AL: { name: 'Central US', rate: 18.00 }, MS: { name: 'Central US', rate: 18.00 }, WI: { name: 'Central US', rate: 18.00 },
  MN: { name: 'Central US', rate: 18.00 }, IA: { name: 'Central US', rate: 18.00 }, MO: { name: 'Central US', rate: 18.00 },
  AR: { name: 'Central US', rate: 18.00 }, LA: { name: 'Central US', rate: 18.00 }, ND: { name: 'Central US', rate: 18.00 },
  SD: { name: 'Central US', rate: 18.00 }, NE: { name: 'Central US', rate: 18.00 }, KS: { name: 'Central US', rate: 18.00 },
  OK: { name: 'Central US', rate: 18.00 }, TX: { name: 'Central US', rate: 18.00 },
  
  // Mountain US ($20)
  CO: { name: 'Mountain US', rate: 20.00 }, WY: { name: 'Mountain US', rate: 20.00 }, MT: { name: 'Mountain US', rate: 20.00 },
  ID: { name: 'Mountain US', rate: 20.00 }, UT: { name: 'Mountain US', rate: 20.00 }, AZ: { name: 'Mountain US', rate: 20.00 },
  NM: { name: 'Mountain US', rate: 20.00 }, NV: { name: 'Mountain US', rate: 20.00 },
  
  // Pacific US ($22)
  CA: { name: 'Pacific US', rate: 22.00 }, OR: { name: 'Pacific US', rate: 22.00 }, WA: { name: 'Pacific US', rate: 22.00 },
  
  // Alaska & Hawaii ($35)
  AK: { name: 'Alaska & Hawaii', rate: 35.00 }, HI: { name: 'Alaska & Hawaii', rate: 35.00 }
};

// State to Tax Rate Map
const stateTaxMap: { [key: string]: number } = {
  CA: 0.0825,
  NY: 0.08875,
  TX: 0.0625,
  OR: 0.00, // No sales tax in Oregon (where Wrought is forged!)
};

function CheckoutForm() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();

  // Form State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [usState, setUsState] = useState('');
  const [zip, setZip] = useState('');
  
  // Calculations
  const [shippingCost, setShippingCost] = useState(15.00);
  const [shippingZone, setShippingZone] = useState('Eastern US');
  const [taxCost, setTaxCost] = useState(0.00);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync shipping/tax calculations based on State input
  useEffect(() => {
    if (usState) {
      const stateUpper = usState.toUpperCase().trim();
      
      // Calculate Shipping
      const zoneData = stateToZoneMap[stateUpper];
      if (zoneData) {
        setShippingCost(zoneData.rate);
        setShippingZone(zoneData.name);
      } else {
        // Fallback standard rate
        setShippingCost(15.00);
        setShippingZone('Standard Shipping');
      }

      // Calculate Tax
      const taxRate = stateTaxMap[stateUpper] !== undefined ? stateTaxMap[stateUpper] : 0.07;
      setTaxCost(cartTotal * taxRate);
    } else {
      // Defaults
      setShippingCost(15.00);
      setTaxCost(cartTotal * 0.07);
    }
  }, [usState, cartTotal]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsProcessing(true);

    // If Stripe is loaded, we can fetch the CardElement for a token creation
    if (stripe && elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        // Run a simulated payment confirmation/tokenization call that succeeds locally
        await stripe.createToken(cardElement).catch(() => {});
      }
    }

    // Simulate Payment Processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Generate mock order number and store detail temporarily in localStorage to show on confirmation page
      const mockOrderNo = `WR-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderSummary = {
        orderNumber: mockOrderNo,
        email,
        name: `${firstName} ${lastName}`,
        address: `${address}, ${city}, ${usState} ${zip}`,
        subtotal: cartTotal,
        shipping: shippingCost,
        tax: taxCost,
        total: cartTotal + shippingCost + taxCost,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
        items: cartItems.map(item => ({
          name: item.name,
          plate: item.plateOption?.name || 'N/A',
          addons: item.addons?.map(a => a.name) || [],
          qty: item.quantity,
          price: item.basePrice + (item.plateOption?.priceDelta || 0) + (item.addons?.reduce((sum, a) => sum + a.priceDelta, 0) || 0)
        }))
      };

      localStorage.setItem('last_order', JSON.stringify(orderSummary));
      clearCart();
      router.push('/checkout/success');
    }, 2000);
  };

  const handleMockFill = () => {
    setEmail('customer@forge.com');
    setFirstName('Wrought');
    setLastName('Patriot');
    setAddress('123 Ironworks Lane');
    setCity('Portland');
    setUsState('OR');
    setZip('97201');
  };

  const orderTotal = cartTotal + shippingCost + taxCost;

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto py-24 px-4 text-center">
        <p className="font-serif text-lg text-charcoal/70 mb-6">No items in your cart to checkout.</p>
        <Link
          href="/"
          className="py-3 px-8 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase text-xs tracking-widest font-bold rounded"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto pt-6 pb-12 px-4 sm:px-6 md:px-8 bg-wrought-cream">
      <Link 
        href="/cart" 
        className="font-mono text-[10px] uppercase tracking-widest text-iron-black/60 hover:text-wrought-copper font-bold flex items-center gap-1.5 mb-8"
      >
        <ArrowLeft size={12} /> Return to Cart
      </Link>

      <h1 className="font-serif text-3xl font-bold text-iron-black mb-8 border-b border-iron-black/15 pb-4">
        Forge Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Checkout Forms (Left) */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Guest Header & Mock Fill Button */}
          <div className="flex justify-between items-center bg-[#eae1d4]/40 border border-iron-black/15 p-4 rounded">
            <div>
              <span className="font-serif font-bold text-xs text-iron-black block">Guest Checkout</span>
              <span className="text-[10px] text-charcoal/70">No account required. Fill details below.</span>
            </div>
            <button
              type="button"
              onClick={handleMockFill}
              className="py-1 px-3 border border-wrought-copper hover:bg-wrought-copper hover:text-wrought-cream text-wrought-copper rounded font-mono text-[9px] uppercase tracking-wider font-bold transition-all"
            >
              Demo Auto-Fill
            </button>
          </div>

          {/* 1. Shipping Details */}
          <div className="bg-[#eae1d4]/30 border border-iron-black/15 rounded p-5 flex flex-col gap-4">
            <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-iron-black/75 border-b border-iron-black/10 pb-2 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-iron-black text-wrought-cream text-[9px] flex items-center justify-center">1</span> Shipping Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] uppercase text-iron-black/60">First Name *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-wrought-cream border border-iron-black/20 rounded p-2 text-xs focus:border-wrought-copper outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] uppercase text-iron-black/60">Last Name *</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-wrought-cream border border-iron-black/20 rounded p-2 text-xs focus:border-wrought-copper outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] uppercase text-iron-black/60">Contact Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-wrought-cream border border-iron-black/20 rounded p-2 text-xs focus:border-wrought-copper outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[9px] uppercase text-iron-black/60">Shipping Address *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-wrought-cream border border-iron-black/20 rounded p-2 text-xs focus:border-wrought-copper outline-none"
                placeholder="Street Address, Suite, Apt"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 flex flex-col gap-1">
                <label className="font-mono text-[9px] uppercase text-iron-black/60">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-wrought-cream border border-iron-black/20 rounded p-2 text-xs focus:border-wrought-copper outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] uppercase text-iron-black/60">State (US) *</label>
                <select
                  required
                  value={usState}
                  onChange={(e) => setUsState(e.target.value)}
                  className="bg-wrought-cream border border-iron-black/20 rounded p-2 text-xs focus:border-wrought-copper outline-none font-mono text-center cursor-pointer"
                >
                  <option value="" disabled>Select</option>
                  <option value="OR">OR</option>
                  <option value="CA">CA</option>
                  <option value="WA">WA</option>
                  <option value="TX">TX</option>
                  <option value="NY">NY</option>
                  <option value="NJ">NJ</option>
                  <option value="PA">PA</option>
                  <option value="IL">IL</option>
                  <option value="FL">FL</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[9px] uppercase text-iron-black/60">Zip Code *</label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="bg-wrought-cream border border-iron-black/20 rounded p-2 text-xs focus:border-wrought-copper outline-none text-center font-mono"
                />
              </div>
            </div>
          </div>

          {/* 2. Stripe Payments */}
          <div className="bg-[#eae1d4]/30 border border-iron-black/15 rounded p-5 flex flex-col gap-4">
            <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-iron-black/75 border-b border-iron-black/10 pb-2 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-iron-black text-wrought-cream text-[9px] flex items-center justify-center">2</span> Stripe Secure Sandbox
            </h3>

            <div className="p-4 border border-iron-black/15 bg-wrought-cream/65 rounded">
              <div className="flex items-center gap-2 border-b border-iron-black/10 pb-3.5 mb-3.5">
                <CreditCard size={16} className="text-wrought-copper" />
                <span className="font-mono text-[10px] text-iron-black/65 uppercase tracking-wide">Credit Card Details (Stripe Elements)</span>
              </div>
              
              <div className="bg-wrought-cream border border-iron-black/15 rounded p-3 text-xs outline-none focus-within:border-wrought-copper">
                <CardElement 
                  options={{
                    style: {
                      base: {
                        fontSize: '13px',
                        color: '#1C1A18',
                        fontFamily: 'var(--font-mono), monospace',
                        '::placeholder': {
                          color: '#8A847C',
                        },
                      },
                      invalid: {
                        color: '#B23A22',
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="text-[10px] text-charcoal/65 leading-relaxed flex gap-2 items-start mt-1">
              <ShieldCheck size={16} className="text-patina-green flex-shrink-0" />
              <span>
                Payments are processed through a simulated Stripe integration. Card information is never saved or transmitted. Use standard Stripe test cards for checkout.
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-iron-black hover:bg-wrought-copper text-wrought-cream font-mono uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-all flex items-center justify-center gap-2 disabled:bg-iron-black/50"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-wrought-cream border-t-transparent rounded-full animate-spin" />
                Forging Transaction...
              </span>
            ) : (
              <>
                Place Order — ${orderTotal.toFixed(2)}
              </>
            )}
          </button>
        </form>

        {/* Sidebar Order Summary (Right) */}
        <div className="lg:col-span-5 flex flex-col gap-4 bg-[#eae1d4] border-2 border-iron-black rounded-lg p-6 relative">
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-iron-black/20" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-iron-black/20" />

          <h3 className="font-serif text-xl font-bold text-iron-black border-b border-iron-black/15 pb-3 mb-4">
            Items in Order
          </h3>

          <div className="flex flex-col gap-4 border-b border-iron-black/15 pb-4 mb-4 max-h-60 overflow-y-auto no-scrollbar">
            {cartItems.map((item) => {
              const itemUnitPrice = 
                item.basePrice + 
                (item.plateOption?.priceDelta || 0) + 
                (item.addons?.reduce((sum, a) => sum + a.priceDelta, 0) || 0);
              const lineTotal = itemUnitPrice * item.quantity;
              
              return (
                <div key={item.id} className="flex justify-between items-start text-xs gap-3">
                  <div>
                    <span className="font-serif font-bold text-iron-black block">{item.name}</span>
                    <span className="font-mono text-[9px] text-charcoal/60">
                      {item.isPart ? 'Replacement Core' : `Plate: ${item.plateOption?.name || 'N/A'} ${(item.addons && item.addons.length > 0) ? `+ ${item.addons.length} Add-ons` : ''}`}
                    </span>
                    <span className="text-[10px] text-charcoal/50 block mt-0.5">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-mono font-bold text-iron-black tabular-nums">${lineTotal.toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2.5 font-mono text-xs border-b border-iron-black/15 pb-4 mb-2">
            <div className="flex justify-between">
              <span className="text-iron-black/60">Subtotal:</span>
              <span className="font-semibold text-iron-black tabular-nums">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-iron-black/60">Shipping ({shippingZone}):</span>
              <span className="font-semibold text-iron-black tabular-nums">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-iron-black/60">Estimated Tax:</span>
              <span className="font-semibold text-iron-black tabular-nums">${taxCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-end font-serif">
            <span className="font-bold text-sm text-iron-black">Total:</span>
            <span className="font-mono text-xl font-bold text-iron-black tabular-nums">
              ${orderTotal.toFixed(2)}
            </span>
          </div>

          {usState.toUpperCase() === 'OR' && (
            <div className="mt-4 p-3 bg-patina-green/10 border border-patina-green/20 rounded flex gap-2 items-center text-[10px] text-patina-green font-mono">
              <Sparkles size={14} className="flex-shrink-0" />
              <span>Tax exempt in Oregon. Handcrafted local discount applied!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
