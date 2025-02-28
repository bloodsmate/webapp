"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import ProductDetails from "@/app/components/ProductDetails";
import { Input } from "@/app/components/ui/input";
import { Product } from "@/app/data/products";
import QuickView from "@/app/components/QuickView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchProduct } from "../../redux/productSlice";
import Loader from "@/app/components/Loader";
import YouMightAlsoLike from "@/app/components/YouMightAlsoLike";
import SubscribeSection from "@/app/components/SubscribeSection";

function Breadcrumb({ product }: { product: Product }) {
  return (
    <nav className="main-content flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <svg
              className="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <Link
              href="/products"
              className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
            >
              Products
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              className="w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
              {product.name}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProduct: productData, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { items: products, loading: productLoading, error: ProductError } = useSelector((state: RootState) => state.products);
  const product = products.find(p => p.id === parseInt(params.id))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("Binali Modaya");
    dispatch(fetchProduct(Number(params.id)));
    setIsLoading(false);
  }, [dispatch, params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
        <Loader size="large" /> {/* Ensure this component exists */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!productData) {
    notFound(); // Redirect to 404 page only after confirming the product is not found
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb product={product} />
        <div className="mt-8">
          <ProductDetails product={product} />
        </div>
        <div className="mt-8 space-y-6"></div>
        <YouMightAlsoLike currentProductId={product.id} />
      </div>
      <SubscribeSection />
    </>
    )
} 