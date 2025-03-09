import { DEFAULT_BACKEND_URL } from '@/app/data/constants';
import dynamic from 'next/dynamic';

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

    return data.products.map((product: { id: string }) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const ProductPageClient = dynamic(() => import('./product'), {
  ssr: false,
});

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${DEFAULT_BACKEND_URL}/products/${params.id}`, {
      cache: 'force-cache', // Fetch data at build time
    });

    if (!response.ok) {
      console.error(`Failed to fetch product ${params.id}:`, response.status);
      return <div>Product not found</div>;
    }

    const product = await response.json();
    console.log("Fetched product:", product);

    return <ProductPageClient id={params.id} />;
  } catch (error) {
    console.error(`Error fetching product ${params.id}:`, error);
    return <div>Product not found</div>;
  }
}
