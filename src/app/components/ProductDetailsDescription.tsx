"use client";

import Link from "next/link";
import { Product } from "@/app/data/products";

interface ProductDetailsDescriptionProps {
  product: Product;
}

export default function ProductDetailsDescription({
  product,
}: ProductDetailsDescriptionProps) {
  return (
    <div className="space-y-4 p-4 md:p-8 bg-white rounded-lg shadow-lg">
      {/* Product Title */}
      <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>

      {/* Brand */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm font-medium text-gray-600">Brand:</span>
        <span className="text-sm text-gray-800">Bloodsmate</span>
      </div>

      {/* Color */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm font-medium text-gray-600">Color:</span>
        <span className="text-sm text-gray-800">{product.color}</span>
      </div>

      {/* Material */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm font-medium text-gray-600">Material:</span>
        <span className="text-sm text-gray-800">100% Pakistani Cotton</span>
      </div>

      {/* Thickness */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm font-medium text-gray-600">Thickness:</span>
        <span className="text-sm text-gray-800">220 GSM</span>
      </div>

      {/* Size Range */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm font-medium text-gray-600">Size Range:</span>
        <span className="text-sm text-gray-800">XS – 2XL</span>
      </div>

      {/* Quality Standards */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm font-medium text-gray-600">Quality Standards:</span>
        <span className="text-sm text-gray-800">100% QC Passed. Export Ready.</span>
      </div>

      {/* Specialties */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-600">Specialties:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
          <li>Distinctive Chinese Collar for a modern, sleek look</li>
          <li>Black Placket & Matt Black Buttons for a stylish contrast</li>
          <li>Sleeve cuffs with Black Stripes for added detail</li>
          <li>Comfortable, breathable fabric</li>
          <li>Anti-shrink & Excellent Colorfastness</li>
        </ul>
      </div>

      {/* Warranty */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm font-medium text-gray-600">Warranty:</span>
        <span className="text-sm text-gray-800">
          07-Day Easy Returns & Size Exchanges.{" "}
          <Link href="/return-policy" className="text-blue-600 hover:underline">
            [Insert Return & Exchange Policy]
          </Link>
        </span>
      </div>

      {/* Delivery */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm font-medium text-gray-600">Delivery:</span>
        <span className="text-sm text-gray-800">
          Estimated 1-3 Working Days within Colombo & Suburbs. 3-5 Working Days Outstation.
        </span>
      </div>

      {/* Payment Options */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm font-medium text-gray-600">Payment Options:</span>
        <span className="text-sm text-gray-800">
          Card or Cash on Delivery at Checkout.
        </span>
      </div>

      {/* Made In */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <span className="text-sm font-medium text-gray-600">Made In:</span>
        <span className="text-sm text-gray-800">Sri Lanka</span>
      </div>

      {/* Final Tagline */}
      <p className="text-sm italic text-gray-600">
        A high-quality product for a stylish, confident look.
      </p>
    </div>
  );
}