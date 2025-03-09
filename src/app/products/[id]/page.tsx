import { DEFAULT_BACKEND_URL } from '@/app/data/constants';
import dynamic from 'next/dynamic';

// export const dynamic = "force-dynamic"; // Ensure server-side rendering on every request

const ProductPageClient = dynamic(() => import('./product'), {
  ssr: false,
});

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${DEFAULT_BACKEND_URL}/products/${params.id}`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.error(`Failed to fetch product ${params.id}:`, response.status);
      return <div>Product not found</div>;
    }

    const product = await response.json();
    console.log("Fetched product:", product); // Debugging log

    return <ProductPageClient id={params.id} />;
  } catch (error) {
    console.error(`Error fetching product ${params.id}:`, error);
    return <div>Product not found</div>;
  }
}
