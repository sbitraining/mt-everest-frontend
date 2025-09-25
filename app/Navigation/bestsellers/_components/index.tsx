import React, { useState, useEffect } from "react";
import { Product } from "@/types/bestsellers/bestseller-nav";
import ProductGrid from "./product-grid";
import ProductModal from "./product-modal";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:8000/api/AllProducts/");
        const data = await res.json();
        const mapped: Product[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          originalPrice: item.original_price
            ? parseFloat(item.original_price)
            : null,
          rating: item.rating,
          reviews: item.reviews,
          image: `http://localhost:8000${item.image}`,
          category: item.category,
          tags: item.tags || [],
          description: item.description,
          features: item.features,
          stock: item.stock,
          shipping: item.shipping,
          warranty: item.warranty,
          expiry: item.expiry,
        }));
        setProducts(mapped);
      } catch (err) {
        console.error("❌ Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <p>Loading products…</p>;

  return (
    <>
      <div className="min-h-screen bg-[#fffff6]">
        <div className="container mx-auto px-4 py-8">
          {/* 🔥 pass backend products here */}
          <ProductGrid products={products} onViewDetails={handleViewDetails} />
        </div>

        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
};

export default ProductsPage;
