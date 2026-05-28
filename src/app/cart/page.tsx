'use client';

import Link from 'next/link';
import Image from 'next/image';
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
        <div className="mt-6 space-y-3 animate-fade-in">
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
                className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                  {product.image?.url ? (
                    <Image
                      src={product.image.url}
                      alt={product.image.alt || product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-black">{product.title}</p>
                  <p className="text-sm text-gray-600">
                    {formatPrice(getEffectivePrice(product))} each
                  </p>
                  <p className="text-sm font-semibold text-black">
                    Subtotal:{' '}
                    {formatPrice(getEffectivePrice(product) * quantity)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(product.id, Number(e.target.value))
                    }
                    className="w-16 rounded-md border px-2 py-1 text-black text-center"
                  />
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-sm text-red-600 hover:underline transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <p className="text-lg font-semibold">Total: {formatPrice(total)}</p>
            <div className="flex gap-3">
              <button
                onClick={() => clearCart()}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
              >
                Clear cart
              </button>
              <button
                onClick={handleCheckout}
                className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm transition duration-200 hover:bg-indigo-700 hover:shadow-md hover:scale-105 active:scale-95"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
