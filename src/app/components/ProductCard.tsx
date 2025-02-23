import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { Product } from '../data/products';
import QuickView from './QuickView';

export default function ProductCard({ product, index }: { product: Product; index?: number }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { id, name, price, discountPercentage, images, color, sizes, stock } = product;

  const discountedPrice = (product: Product) => {
    return product.discountPercentage
      ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
      : product.price.toFixed(2);
  };

  return (
    <>
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index ? index * 0.1 : 0 }}
        className="bg-white shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
        style={{ height: '835px' }}
      >
        {/* Image Container */}
        <div className="relative h-96 md:h-[600px]">
          <Link href={`/products/${product.id}`} prefetch={false}>
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              className="object-cover"
            />
          </Link>

          {product.discountPercentage && product.discountPercentage > 0 && (
            <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
              Save {product.discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 h-48 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1 text-gray-800 group-hover:text-gray-900 transition-colors">
              {product.name}
            </h3>

            {product.color && (
              <p className="text-sm text-gray-500 mb-2">Color: {product.color}</p>
            )}

            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-sm font-semibold ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              {product.discountPercentage && product.discountPercentage > 0 ? (
                <>
                  <p className="text-base md:text-lg text-gray-500 font-semibold">
                    LKR {discountedPrice(product)}
                  </p>
                  <p className="text-sm md:text-base text-gray-400 line-through">LKR {product.price.toFixed(2)}</p>
                </>
              ) : (
                <p className="text-base md:text-lg text-gray-500 font-semibold">LKR {product.price.toFixed(2)}</p>
              )}
            </div>
          </div>

          <Button
            onClick={() => setSelectedProduct(product)}
            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg"
          >
            Quick View
          </Button>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </>
  );
}