// components/YouMightAlsoLike.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import QuickView from "@/app/components/QuickView";
import { Product } from "@/app/data/products";
import Loader from "@/app/components/Loader";

interface YouMightAlsoLikeProps {
  currentProductId: number;
}

export default function YouMightAlsoLike({
  currentProductId,
}: YouMightAlsoLikeProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          `/api/products/related?productId=${currentProductId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch related products");
        }
        const data = await response.json();
        setRelatedProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader size="small" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-4">You Might Also Like</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold mb-2">{product.name}</h4>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <Button
                onClick={() => setSelectedProduct(product)}
                variant="outline"
                className="w-full"
              >
                Quick View
              </Button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}