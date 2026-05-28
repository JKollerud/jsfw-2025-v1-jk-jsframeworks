import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import {
  formatPrice,
  getDiscountPercent,
  getEffectivePrice,
} from '@/lib/utils';

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const hasDiscount = product.discountedPrice < product.price;

  const discountPercent = hasDiscount
    ? getDiscountPercent(product.price, product.discountedPrice)
    : 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      {hasDiscount && (
        <div className="absolute left-3 top-3 z-11 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
          -{discountPercent}%
        </div>
      )}

      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        {product.image?.url ? (
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No image
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-1 font-medium text-black">{product.title}</h3>
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="font-semibold text-black">
                {formatPrice(getEffectivePrice(product))}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-black">
              {formatPrice(getEffectivePrice(product))}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-600">Rating: {product.rating}</div>
      </div>
    </Link>
  );
}
