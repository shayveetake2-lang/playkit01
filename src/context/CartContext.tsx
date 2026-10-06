"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variantId?: string) => void;
  removeItem: (idOrKey: string) => void;
  updateQuantity: (idOrKey: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  itemsCount: number;
  subtotal: number;
  isCheckingOut: boolean;
  setIsCheckingOut: (checkingOut: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "playkit01_archive_bag_v1";

export function getItemKey(item: { product: Product; variantId?: string }): string {
  return item.variantId ? `${item.product.id}__${item.variantId}` : item.product.id;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Hydrate from localStorage once mounted on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        queueMicrotask(() => {
          setItems(parsed);
          setIsHydrated(true);
        });
        return;
      }
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
    }
    queueMicrotask(() => {
      setIsHydrated(true);
    });
  }, []);

  // Sync back to localStorage on change (after initial hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  }, [items, isHydrated]);

  const addItem = (product: Product, quantity = 1, variantId?: string) => {
    const selectedVariantId = variantId || product.fourthwallVariantId;
    const targetKey = selectedVariantId
      ? `${product.id}__${selectedVariantId}`
      : product.id;

    setItems((prev) => {
      const existing = prev.find((item) => getItemKey(item) === targetKey);
      if (existing) {
        return prev.map((item) =>
          getItemKey(item) === targetKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, variantId: selectedVariantId }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (idOrKey: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          getItemKey(item) !== idOrKey &&
          item.product.id !== idOrKey &&
          item.variantId !== idOrKey
      )
    );
  };

  const updateQuantity = (idOrKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(idOrKey);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        const matches =
          getItemKey(item) === idOrKey ||
          item.product.id === idOrKey ||
          item.variantId === idOrKey;
        return matches ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        itemsCount,
        subtotal,
        isCheckingOut,
        setIsCheckingOut,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
