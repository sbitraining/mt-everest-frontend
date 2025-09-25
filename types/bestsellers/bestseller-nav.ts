export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  tags: string[];
  description: string;
  features: string[];
  stock: number;
  shipping: string;
  warranty?: string;
  expiry?: string;
}
