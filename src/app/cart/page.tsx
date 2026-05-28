'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatPrice, getEffectivePrice } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const { items, total, setQuantity, removeFromCart, clearCart } = useCart();

  function handleCheckout() {
    clearCart();
    router.push('/success');
  }

  return (
    <main className="mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-semibold">Your Cart</h1>
      {items.length === 0 ? (
        <div className="mt-6 space-y-3">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link className="underline" href="/">
            Go back to shop
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 rounded-lg border bg-white p-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-black">{product.title}</p>
                  <p className="text-sm text-black">
                    {formatPrice(getEffectivePrice(product))}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(product.id, Number(e.target.value))
                    }
                    className="w-16 rounded-md border px-2 py-1 text-black"
                  />
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-lg font-semibold">Total: {formatPrice(total)}</p>
            <button
              onClick={handleCheckout}
              className="rounded-md bg-black px-4 py-2 text-white shadow-sm transition duration-200 hover:bg-gray-800 hover:shadow-md hover:scale-105 active:scale-95"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}
