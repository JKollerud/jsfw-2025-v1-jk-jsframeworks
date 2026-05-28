'use client';

import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { CartItem, CartState, Product } from '@/lib/types';
import { getEffectivePrice } from '@/lib/utils';

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type Action =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; productId: string }
  | { type: 'SET_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR' };

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id,
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }

    case 'REMOVE':
      return {
        items: state.items.filter((i) => i.product.id !== action.productId),
      };

    case 'SET_QTY': {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((i) => i.product.id !== action.productId),
        };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      };
    }

    case 'CLEAR':
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  );

  const total = useMemo(() => {
    return state.items.reduce((sum, item) => {
      return sum + getEffectivePrice(item.product) * item.quantity;
    }, 0);
  }, [state.items]);

  const value: CartContextValue = useMemo(
    () => ({
      items: state.items,
      itemCount,
      total,
      addToCart: (product) => dispatch({ type: 'ADD', product }),
      removeFromCart: (productId) => dispatch({ type: 'REMOVE', productId }),
      setQuantity: (productId, quantity) =>
        dispatch({ type: 'SET_QTY', productId, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.items, itemCount, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
