import { Product } from './types';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function getDiscountPercent(
  price: number,
  discountedPrice: number,
): number {
  return Math.round(((price - discountedPrice) / price) * 100);
}

// Single source of truth for price logic used across cart, product card, etc.
export function getEffectivePrice(product: Product): number {
  return product.discountedPrice < product.price
    ? product.discountedPrice
    : product.price;
}
