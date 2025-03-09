import { DEFAULT_BACKEND_URL } from '@/app/data/constants';
import dynamic from 'next/dynamic';

const ProductPageClient = dynamic(() => import('./product'), {
  ssr: false, // Client-side rendering only
});

// Generate static params (equivalent to getStaticPaths in the App Directory)
export async function generateStaticParams() {
  let products: { id: string }[] = [];

  try {
    const response = await fetch(`${DEFAULT_BACKEND_URL}/products`, {
      cache: 'force-cache', // Fetch data at build time
    });

    if (!response.ok) {
      console.error("Failed to fetch products:", response.status);
      return [];
    }

    const data = await response.json();
    if (Array.isArray(data.products)) {
      products = data.products;
    } else {
      console.warn("Unexpected API response structure:", data);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// export async function getStaticPaths() {
//   const paths = await generateStaticParams();
//   return {
//     paths,
//     fallback: true, // or 'blocking'
//   };
// }

// Main product page component
export default async function ProductPage({ params }: { params: { id: string } }) {
  let product = null;

  try {
    const response = await fetch(`${DEFAULT_BACKEND_URL}/products/${params.id}`, {
      cache: 'force-cache', // Fetch data at build time
    });

    if (!response.ok) {
      console.error(`Failed to fetch product ${params.id}:`, response.status);
      return <div>Product not found</div>;
    }

    product = await response.json();
  } catch (error) {
    console.error(`Error fetching product ${params.id}:`, error);
    return <div>Product not found</div>;
  }

  if (!product) {
    return <div>Loading...</div>; // or a 404 page
  }

  return <ProductPageClient id={params.id.toString()} />;
}