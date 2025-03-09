import { DEFAULT_BACKEND_URL } from '@/app/data/constants';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load the client component
const ProductPageClient = dynamic(() => import('./product'), {
  ssr: false, // Client-side rendering only
});

export async function generateStaticParams() {
  try {
    const response = await fetch(`${DEFAULT_BACKEND_URL}/products`, {
      cache: 'force-cache', // Fetch data at build time
    });

    if (!response.ok) {
      console.error("Failed to fetch products:", response.status);
      return [];
    }

    const data = await response.json();
    if (!Array.isArray(data.products)) {
      console.warn("Unexpected API response structure:", data);
      return [];
    }

    // Generate static paths for each product
    return data.products.map((product: { id: string }) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  let product = null;

  try {
    const response = await fetch(`${DEFAULT_BACKEND_URL}/products/${params.id}`, {
      cache: 'force-cache', // Fetch data at build time for better performance
    });

    if (!response.ok) {
      console.error(`Failed to fetch product ${params.id}:`, response.status);
      return <div>Product not found</div>;
    }

    product = await response.json();
    console.log("Fetched product:", product);
  } catch (error) {
    console.error(`Error fetching product ${params.id}:`, error);
    return <div>Product not found</div>;
  }

  // Show a loading indicator while the product data is being fetched
  return (
    <Suspense fallback={<div>Loading product...</div>}>
      <ProductPageClient id={params.id} />
    </Suspense>
  );
}
