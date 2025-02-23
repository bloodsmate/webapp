"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Heart } from "lucide-react";
import { Product } from "@/app/data/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/app/redux/wishlistSlice";
import { toast } from "@/app/hooks/use-toast";
import Waitlist from "@/app/components/Waitlist";
import ProductDetailsDescription from "@/app/components/ProductDetailsDescription";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import type { RootState } from "../redux/store";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import Loader from "./Loader";
import sizeChartImage from "@/app/assets/bloodsmate_size_chart.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function SizeChart() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="size-chart">
        <AccordionTrigger className="text-lg font-semibold">
          Size Chart
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 w-full">
            <div className="overflow-x-auto w-full">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Size</th>
                    <th className="py-2 px-4 border-b">Chest (inches)</th>
                    <th className="py-2 px-4 border-b">Length (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">XS</td>
                    <td className="py-2 px-4 border-b text-center">18</td>
                    <td className="py-2 px-4 border-b text-center">25</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">S</td>
                    <td className="py-2 px-4 border-b text-center">19</td>
                    <td className="py-2 px-4 border-b text-center">26</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">M</td>
                    <td className="py-2 px-4 border-b text-center">20</td>
                    <td className="py-2 px-4 border-b text-center">27</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">L</td>
                    <td className="py-2 px-4 border-b text-center">21</td>
                    <td className="py-2 px-4 border-b text-center">28</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">XL</td>
                    <td className="py-2 px-4 border-b text-center">22</td>
                    <td className="py-2 px-4 border-b text-center">29</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-center">2XL</td>
                    <td className="py-2 px-4 text-center">23</td>
                    <td className="py-2 px-4 text-center">30</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 gap-4 w-full">
              <Image
                src={sizeChartImage}
                alt="Chest Measurement"
                width={600}
                height={300}
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function PaymentOptions() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="payment-options">
        <AccordionTrigger className="text-lg font-semibold">
          Payment Options
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Credit/Debit Card</li>
            <li>PayPal</li>
            <li>KOKO Pay (3 months installment)</li>
          </ul>
          <div className="flex items-center space-x-4 mt-4">
            <FaCcVisa size={32} className="text-blue-900" />
            <FaCcMastercard size={32} className="text-red-600" />
            <img
              src="https://res.cloudinary.com/midefulness/image/upload/v1736096286/BloodsMate/koko-pay_d6id9w.png"
              alt="koko pay"
              className="h-8"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function DeliveryAndReturns() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="delivery-returns">
        <AccordionTrigger className="text-lg font-semibold">
          Delivery & Returns
        </AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Free standard delivery on orders over LKR 14,000</p>
          <p>Easy returns within 30 days</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [mainImage, setMainImage] = useState<number>(0);
  const [outOfStock, setOutOfStock] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [joinedWaitlist, setJoinedWaitlist] = useState<boolean>(false);
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  // Zoom functionality
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Size not selected",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    const stockItem = product.stock.find((item) => item.size === selectedSize);
    if (!stockItem || stockItem.quantity === 0) {
      toast({
        title: "Out of Stock",
        description: `The selected size (${selectedSize}) is out of stock.`,
        variant: "destructive",
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
        discountPrice: Number((product.discountPercentage && product.discountPercentage > 0) ? discountedPrice : 0),
      })
    );

    toast({
      title: "Added to cart",
      variant: "success",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        })
      );
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleJoinWaitlist = (email: string) => {
    // Simulate joining the waitlist
    setTimeout(() => {
      setJoinedWaitlist(true);
      toast({
        title: "Joined Waitlist",
        description: `You have joined the waitlist for ${product.name} (${selectedSize}). We will notify you when it's back in stock.`,
      });
    }, 1000);
  };

  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="col-span-2 flex justify-center items-center h-96">
          <Loader size="large" />
        </div>
      ) : (
        <>
          {/* Left Section - Images */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div
              ref={imageRef}
              className="relative aspect-square h-[60vh] lg:h-screen lg:max-h-[80vh] w-full overflow-hidden shadow-md"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.images[mainImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                style={{
                  transform: isZoomed ? `scale(1.5)` : "scale(1)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transition: "transform 0.1s ease",
                }}
              />
              {/* Discount Price Tag */}
              {product.discountPercentage > 0 && (
                <div className="absolute bottom-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Save {product.discountPercentage}%
                </div>
              )}
            </div>

            {/* Thumbnail Slider */}
            <div className="relative">
              <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={5}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  320: { slidesPerView: 3 }, // Mobile
                  640: { slidesPerView: 4 }, // Small screens
                  1024: { slidesPerView: 5 }, // Large screens
                }}
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <button
                      onClick={() => setMainImage(index)}
                      className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 shadow-md ${
                        mainImage === index ? "ring-2 ring-black" : ""
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Arrows */}
              <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors border border-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors border border-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Section - Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-semibold text-[#002366]">
                LKR {discountedPrice}
              </p>
              {product.discountPercentage && (
                <>
                  <p className="text-lg text-gray-500 line-through">
                    LKR {product.price.toFixed(2)}
                  </p>
                  {/* <p className="text-lg font-semibold text-green-500">
                    Save {product.discountPercentage}%
                  </p> */}
                </>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => {
                  const stockItem = product.stock.find((item) => item.size === size);
                  const isOutOfStock = !stockItem || stockItem.quantity === 0;

                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setOutOfStock(isOutOfStock);
                      }}
                      className={`relative flex items-center justify-center w-12 h-12 text-sm font-semibold border-2 rounded-md ${
                        selectedSize === size
                          ? "border-[#002366] bg-blue-100"
                          : "border-gray-300"
                      } ${isOutOfStock ? "opacity-50" : "hover:border-blue-600"}`}
                    >
                      {size}
                      {isOutOfStock && (
                        <span className="absolute inset-0 flex items-center justify-center text-red-600 text-lg font-bold">
                          X
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart and Wishlist Buttons */}
            <div className="flex space-x-2">
              <Button
                onClick={handleAddToCart}
                className="flex-grow"
                disabled={outOfStock}
              >
                {outOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button onClick={handleWishlist} variant="outline">
                <Heart
                  className={`w-6 h-6 ${
                    isInWishlist ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Show Waitlist if Out of Stock */}
            {outOfStock && !joinedWaitlist && (
              <Waitlist
                productId={product.id}
                productName={product.name}
                size={selectedSize}
                onJoinWaitlist={handleJoinWaitlist}
              />
            )}

            {joinedWaitlist && (
              <p className="text-green-600">
                You have joined the waitlist for this product. We will notify you when it's back in stock.
              </p>
            )}

            <div className="flex items-center space-x-4 mt-6">
              <span className="text-sm text-gray-500">We accept:</span>
              <div className="flex space-x-2">
                <FaCcVisa size={32} className="text-blue-900" />
                <FaCcMastercard size={32} className="text-red-600" />
                <img
                  src="https://res.cloudinary.com/midefulness/image/upload/v1736096286/BloodsMate/koko-pay_d6id9w.png"
                  alt="koko pay"
                  className="h-8"
                />
              </div>
            </div>

            {/* Accordion Section */}
            <div className="space-y-4 mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description">
                  <AccordionTrigger className="text-lg font-semibold">
                    Product Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <ProductDetailsDescription product={product} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <SizeChart />
              <PaymentOptions />
              <DeliveryAndReturns />
            </div>
          </div>
        </>
      )}
    </div>
  );
}