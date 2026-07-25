'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PlateOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface AddonOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface CartItem {
  id: string; // Unique combination key: e.g., "grille-butter_roller_steam_vent" or "part-heating_core"
  productId: string;
  name: string;
  basePrice: number;
  plateOption?: PlateOption; // Optional for parts
  addons?: AddonOption[];     // Optional for parts
  quantity: number;
  isPart?: boolean;
  partId?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (plateOption: PlateOption, addons: AddonOption[], quantity: number) => void;
  addPartToCart: (partId: string, partName: string, price: number, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('wrought_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('wrought_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage', error);
    }
  }, [cartItems, isLoaded]);

  const addToCart = (plateOption: PlateOption, addons: AddonOption[], quantity: number) => {
    setCartItems((prevItems) => {
      // Create a unique identifier for this configuration
      const sortedAddonIds = [...addons].map((a) => a.id).sort().join('_');
      const configId = `${plateOption.id}${sortedAddonIds ? `-${sortedAddonIds}` : ''}`;

      const existingIndex = prevItems.findIndex((item) => item.id === configId);

      if (existingIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += quantity;
        return updatedItems;
      }

      const newItem: CartItem = {
        id: configId,
        productId: 'd7647240-7ecb-432d-862d-947761019688', // Standard Seeded UUID
        name: 'Wrought Panini Press',
        basePrice: 349.00,
        plateOption,
        addons,
        quantity,
      };

      return [...prevItems, newItem];
    });
  };

  const addPartToCart = (partId: string, partName: string, price: number, quantity: number) => {
    setCartItems((prevItems) => {
      const configId = `part-${partId}`;
      const existingIndex = prevItems.findIndex((item) => item.id === configId);

      if (existingIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += quantity;
        return updatedItems;
      }

      const newItem: CartItem = {
        id: configId,
        productId: partId,
        name: partName,
        basePrice: price,
        quantity,
        isPart: true,
        partId,
      };

      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => {
    if (item.isPart) {
      return acc + item.basePrice * item.quantity;
    }
    const plateCost = item.plateOption?.priceDelta || 0;
    const addonsCost = item.addons?.reduce((sum, a) => sum + a.priceDelta, 0) || 0;
    const itemUnitPrice = item.basePrice + plateCost + addonsCost;
    return acc + itemUnitPrice * item.quantity;
  }, 0);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addPartToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
