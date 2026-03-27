export type Review = {
  id: string;
  username: string;
  rating: number;
  description: string;
};

export type ProductImage = {
  url: string;
  alt?: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image?: ProductImage;
  rating: number;
  tags: string[];
  reviews: Review[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};
