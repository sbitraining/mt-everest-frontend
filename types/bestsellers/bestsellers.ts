// Product interface for type safety
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  backgroundColor?: string;
  isNew?: boolean;
  isFavorite?: boolean;
}

// Props interface for the component
export interface BestSellersProps {
  products?: Product[];
  title?: string;
  showViewAllButton?: boolean;
  onViewAll?: () => void;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: number) => void;
  className?: string;
}
