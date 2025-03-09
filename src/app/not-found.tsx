"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/app/components/Loader";

export default function NotFound() {
  const pathname = usePathname(); // Get the current path
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Define regex patterns for allowed paths with trailing slashes
    const allowedPathsRegex = [
      /^\/products\/[^\/]+\/$/, // Matches /products/[id]/
      /^\/order-confirmation\/[^\/]+\/$/, // Matches /order-confirmation/[order-id]/
      /^\/payment-confirmation\/[^\/]+\/$/, // Matches /payment-confirmation/[order-id]/
    ];

    // Check if the current path matches any of the allowed patterns
    const shouldRefresh = allowedPathsRegex.some((regex) => regex.test(pathname));

    if (shouldRefresh) {
      // Get the current counter value from sessionStorage
      const counter = parseInt(sessionStorage.getItem(`counter-${pathname}`) || "0", 10);

      if (counter < 3) {
        // Increment the counter and store it in sessionStorage
        sessionStorage.setItem(`counter-${pathname}`, String(counter + 1));

        // Refresh the page
        window.location.reload();
      } else {
        // Page has already been refreshed 3 times, stop loading
        setIsLoading(false);
      }
    } else {
      // Path is not allowed, stop loading
      setIsLoading(false);
    }

    // Reset the counter when the user navigates away from the page
    const handleBeforeUnload = () => {
      sessionStorage.removeItem(`counter-${pathname}`);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  // If the path is allowed and the page is refreshing, show the loader
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
        <Loader size="large" />
      </div>
    );
  }

  // Render the 404 page for non-allowed paths or after the first refresh
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl">
          Oops! The page you're looking for doesn't exist.
        </p>
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