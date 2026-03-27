import Image from 'next/image';
import { fetchProduct } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/AddToCartButton';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await fetchProduct(productId);

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl p-4">
        <p>Product not found.</p>
      </main>
    );
  }

  const hasDiscount = product.discountedPrice < product.price;

  return (
    <main className="mx-auto max-w-5xl p-4">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          {product.image?.url ? (
            <Image
              src={product.image.url}
              alt={product.image.alt || product.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>

          <div className="flex items-center gap-3">
            {hasDiscount ? (
              <>
                <span className="text-xl font-semibold">
                  {formatPrice(product.discountedPrice)}
                </span>
                <span className="text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="text-sm text-gray-600">Rating: {product.rating}</div>
          <AddToCartButton product={product} />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Reviews</h2>

        {product.reviews.length === 0 ? (
          <p className="mt-2 text-gray-600">No reviews yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <p className="font-medium">{review.username}</p>
                  <p className="text-sm text-gray-600">
                    Rating: {review.rating}
                  </p>
                </div>
                <p className="mt-2 text-gray-700">{review.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
