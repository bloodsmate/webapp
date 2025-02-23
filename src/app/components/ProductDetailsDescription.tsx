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
    <div className="space-y-4">
      {/* Product Title */}
      <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>

      {/* Brand */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Brand:</span>
        <span className="text-sm text-gray-800">{product.brand}</span>
      </div>

      {/* Color */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Color:</span>
        <span className="text-sm text-gray-800">{product.color}</span>
      </div>

      {/* Material */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Material:</span>
        <span className="text-sm text-gray-800">{product.material}</span>
      </div>

      {/* Thickness */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Thickness:</span>
        <span className="text-sm text-gray-800">{product.thickness}</span>
      </div>

      {/* Size Range */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Size Range:</span>
        <span className="text-sm text-gray-800">{product.sizes.join(" – ")}</span>
      </div>

      {/* Quality Standards */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Quality Standards:</span>
        <span className="text-sm text-gray-800">{product.qualityStandards}</span>
      </div>

      {/* Specialties */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-600">Specialties:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
          {product.specialties.map((specialty, index) => (
            <li key={index}>{specialty}</li>
          ))}
        </ul>
      </div>

      {/* Warranty */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Warranty:</span>
        <span className="text-sm text-gray-800">
          {product.warranty}{" "}
          <Link href="/return-policy" className="text-blue-600 hover:underline">
            [Insert Return & Exchange Policy]
          </Link>
        </span>
      </div>

      {/* Delivery */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Delivery:</span>
        <span className="text-sm text-gray-800">{product.delivery}</span>
      </div>

      {/* Payment Options */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Payment Options:</span>
        <span className="text-sm text-gray-800">{product.paymentOptions}</span>
      </div>

      {/* Made In */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Made In:</span>
        <span className="text-sm text-gray-800">{product.madeIn}</span>
      </div>

      {/* Final Tagline */}
      <p className="text-sm italic text-gray-600">
        A high-quality product for a stylish, confident look.
      </p>
    </div>
  );
}