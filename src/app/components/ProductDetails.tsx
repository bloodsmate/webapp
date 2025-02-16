"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Heart } from "lucide-react";
import { Product } from "@/app/data/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/app/redux/wishlistSlice";
import { toast } from "@/app/hooks/use-toast";
import Waitlist from "@/app/components/Waitlist";
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
                    <td className="py-2 px-4 border-b text-center">S</td>
                    <td className="py-2 px-4 border-b text-center">36-38</td>
                    <td className="py-2 px-4 border-b text-center">28</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">M</td>
                    <td className="py-2 px-4 border-b text-center">39-41</td>
                    <td className="py-2 px-4 border-b text-center">29</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b text-center">L</td>
                    <td className="py-2 px-4 border-b text-center">42-44</td>
                    <td className="py-2 px-4 border-b text-center">30</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-center">XL</td>
                    <td className="py-2 px-4 text-center">45-47</td>
                    <td className="py-2 px-4 text-center">31</td>
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
          <p className="mb-2">Free standard delivery on orders over $50</p>
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
            <div className="relative aspect-square">
              <Image
                src={product.images[mainImage]}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden ${
                    mainImage === index ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Section - Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-semibold text-blue-600">
                ${discountedPrice}
              </p>
              {product.discountPercentage && (
                <>
                  <p className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-lg font-semibold text-green-500">
                    Save {product.discountPercentage}%
                  </p>
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
                          ? "border-blue-600 bg-blue-100"
                          : "border-gray-300"
                      } ${isOutOfStock ? "opacity-50" : "hover:border-blue-600"}`}
                      // disabled={isOutOfStock}
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
                  <AccordionContent>{product.description}</AccordionContent>
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