import { Product } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_API_BASE_URL in .env.local');
}

export async function fetchProducts(): Promise<Product[]> {
  const url = `${BASE_URL}/online-shop`;

  try {
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      const body = await res.text();
      console.error('fetchProducts failed:', res.status, res.statusText, body);
      return [];
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('fetchProducts crashed:', error);
    return [];
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  const url = `${BASE_URL}/online-shop/${id}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      const body = await res.text();
      console.error('fetchProduct failed:', res.status, res.statusText, body);
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('fetchProduct crashed:', error);
    return null;
  }
}
