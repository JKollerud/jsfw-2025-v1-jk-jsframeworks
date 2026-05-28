'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-lg font-semibold text-black">
          Online Shop
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/contact" className="text-sm hover:underline text-black">
            Contact
          </Link>
          <Link
            href="/cart"
            className="relative rounded-md bg-black px-3 py-2 text-sm text-white hover:opacity-90 transition-opacity"
          >
            🛒 Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-bounce">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
