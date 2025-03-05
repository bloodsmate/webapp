'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import { useDispatch } from 'react-redux';
import { Product } from '@/app/data/products';
import { addToCart } from '@/app/redux/cartSlice';
import sizeChartImage from '@/app/assets/bloodsmate_size_chart.png';
import { toast } from '@/app/hooks/use-toast';

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(null);
  const dispatch = useDispatch();
  const sizeChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle mouse-following zoom effect
  useEffect(() => {
    const sizeChart = sizeChartRef.current;
    if (!sizeChart || isMobile) return; // Disable zoom on mobile

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = sizeChart.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      sizeChart.style.transformOrigin = `${x}% ${y}%`;
      sizeChart.style.transform = 'scale(2)'; // Adjust zoom level here
    };

    const handleMouseLeave = () => {
      sizeChart.style.transformOrigin = 'center';
      sizeChart.style.transform = 'scale(1)';
    };

    sizeChart.addEventListener('mousemove', handleMouseMove);
    sizeChart.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      sizeChart.removeEventListener('mousemove', handleMouseMove);
      sizeChart.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  // Update available quantity when size is selected
  useEffect(() => {
    if (selectedSize) {
      const stockItem = product.stock.find((item) => item.size === selectedSize);
      setAvailableQuantity(stockItem ? stockItem.quantity : 0);
    } else {
      setAvailableQuantity(null);
    }
  }, [selectedSize, product.stock]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Error',
        description: 'Please select a size.',
        variant: 'destructive',
      });
      return;
    }

    if (availableQuantity === null || availableQuantity <= 0) {
      toast({
        title: 'Error',
        description: 'This size is out of stock.',
        variant: 'destructive',
      });
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        image: product.images[0],
        discountPrice: Number(
          product.discountPercentage && product.discountPercentage > 0
            ? discountedPrice
            : 0
        ),
      })
    );
    onClose();
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price;

  // Check if a size is out of stock
  const isSizeOutOfStock = (size: string) => {
    const stockItem = product.stock.find((item) => item.size === size);
    return stockItem ? stockItem.quantity === 0 : true;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-8 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto" // Enable scrolling for mobile
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image Section */}
          <div className="flex-1 relative h-full">
            <div className="relative h-full">
              <AnimatePresence>
                {!isImageLoaded && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gray-200"
                  />
                )}
              </AnimatePresence>
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                width={500}
                height={500}
                className={isMobile ? 'w-full h-full object-cover mt-2' : 'w-full h-full object-cover'}
                onLoadingComplete={() => setIsImageLoaded(true)}
                priority
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>

            {/* Product Color */}
            {product.color && (
              <p className="text-sm text-gray-500">Color: {product.color}</p>
            )}

            {/* Price Section */}
            <div className="flex items-center gap-2 mb-3">
              {product.discountPercentage && product.discountPercentage > 0 ? (
                <>
                  <p className="text-xl text-gray-600 font-semibold">
                    LKR {discountedPrice}
                  </p>
                  <p className="text-gray-400 line-through">
                    LKR {product.price.toFixed(2)}
                  </p>
                  <span className="ml-2 text-xl text-green-400 font-semibold">
                    Save {product.discountPercentage}%
                  </span>
                </>
              ) : (
                <p className="text-gray-500 font-semibold">LKR {product.price.toFixed(2)}</p>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <RadioGroup onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div key={size} className="relative">
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="peer sr-only"
                      disabled={isSizeOutOfStock(size)}
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className={`flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary ${
                        isSizeOutOfStock(size) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {size}
                    </Label>
                    {isSizeOutOfStock(size) && (
                      <span className="absolute inset-0 flex items-center justify-center text-red-600 text-lg font-bold">✕</span>
                    )}
                  </div>
                ))}
              </RadioGroup>
              {selectedSize && availableQuantity !== null && (
                <p className="mt-2 text-sm text-gray-600">
                  {availableQuantity <= 3
                    ? `Only ${availableQuantity} items left!`
                    : `${availableQuantity} items available`}
                </p>
              )}
            </div>

            {/* Size Chart Image with Mouse-Following Zoom (Hidden on Mobile) */}
            <div className="overflow-hidden">
              {!isMobile && (
                <div
                  ref={sizeChartRef}
                  className="mt-4 relative cursor-zoom-in overflow-hidden"
                  style={{
                    height: 'auto',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={sizeChartImage}
                    alt="Size Chart"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover overflow-hidden"
                    style={{ borderRadius: 0 }} // Remove rounded corners
                    priority // Preload the image
                  />
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button onClick={handleAddToCart} className="w-full" disabled={!selectedSize || availableQuantity === 0}>
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}