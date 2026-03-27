import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/api';
import ProductBrowser from '@/components/ProductBrowser';

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="mx-auto max-w-6xl p-4">
      {products.length === 0 ? (
        <p>Products are currently unavailable.</p>
      ) : (
        <>
          <ProductBrowser products={products} />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
