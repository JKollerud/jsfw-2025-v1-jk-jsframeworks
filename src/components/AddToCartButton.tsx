'use client';

import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-200 hover:bg-indigo-700 hover:scale-105 active:scale-95"
    >
      Add to cart
    </button>
  );
}
