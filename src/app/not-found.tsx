"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/app/components/Loader";

export default function NotFound() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!pathname) {
      setIsLoading(false);
      return;
    }

    const allowedPathsRegex = [
      /^\/products\/[^\/]+\/$/,
      /^\/order-confirmation\/[^\/]+\/$/,
      /^\/payment-confirmation\/[^\/]+\/$/,
    ];

    const shouldRefresh = allowedPathsRegex.some((regex) => regex.test(pathname));

    if (shouldRefresh) {
      const hasRefreshed = sessionStorage.getItem(`hasRefreshed-${pathname}`);

      if (!hasRefreshed) {
        sessionStorage.setItem(`hasRefreshed-${pathname}`, "true");
        window.location.reload();
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }

    const handleBeforeUnload = () => {
      sessionStorage.removeItem(`hasRefreshed-${pathname}`);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl">Oops! The page you're looking for doesn't exist.</p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all"
        >
          Go Back to Products
        </Link>
      </div>
    </div>
  );
}