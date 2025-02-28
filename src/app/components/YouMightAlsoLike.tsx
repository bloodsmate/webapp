"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import QuickView from "@/app/components/QuickView";
import { Product } from "@/app/data/products";
import Loader from "@/app/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchProducts } from "@/app/redux/productSlice";

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper default styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface YouMightAlsoLikeProps {
  currentProductId: number;
}

export default function YouMightAlsoLike({ currentProductId }: YouMightAlsoLikeProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading, error } = useSelector((state: RootState) => state.products);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setRelatedProducts(products.filter((product) => product.id !== currentProductId));
    }
  }, [products, currentProductId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader size="small" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-6">You Might Also Like</h3>

      {/* Swiper Slider */}
      <Swiper
        spaceBetween={20} // Spacing between slides
        slidesPerView={1} // Mobile view (default)
        breakpoints={{
          640: { slidesPerView: 3 }, // Show 2 products on medium screens
          1024: { slidesPerView: 4 }, // Show 3 products on large screens
        }}
        navigation
        // pagination={{ clickable: true }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative border rounded-lg overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={300}
                height={600}
                className="w-full h-96 md:h-[500px] object-cover"
              />
              {/* Discount Price Tag */}
              {(product.discountPercentage ?? 0) > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Save {product.discountPercentage}%
                </div>
              )}
              <div className="p-4">
                <h4 className="font-semibold mb-2">{product.name}</h4>
                <div className="flex items-center gap-2 mb-3">
                  {product.discountPercentage && product.discountPercentage > 0 ? (
                    <>
                      <p className="text-gray-500 font-semibold">
                        LKR {(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400 line-through">LKR {product.price.toFixed(2)}</p>
                      {/* <span className="ml-2 text-green-400 font-semibold">Save {product.discountPercentage}%</span> */}
                    </>
                  ) : (
                    <p className="text-gray-500 font-semibold">LKR {product.price.toFixed(2)}</p>
                  )}
                </div>
                <Button
                  onClick={() => setSelectedProduct(product)}
                  variant="outline"
                  className="w-full hover:bg-black hover:text-white"
                >
                  Quick View
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      {selectedProduct && <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}
