import { fetchProducts } from '@/lib/api';
import ProductBrowser from '@/components/ProductBrowser';

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="mx-auto max-w-6xl p-4">
      {products.length === 0 ? (
        <p>Products are currently unavailable.</p>
      ) : (
        <ProductBrowser products={products} />
      )}
    </main>
  );
}
