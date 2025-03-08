import { DEFAULT_BACKEND_URL } from '@/app/data/constants';
import { Product } from "@/app/data/products";
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

export async function generateStaticParams() {
  let products: Product[] = [];
  try {
    const response = await fetch(`${DEFAULT_BACKEND_URL}/products`);
    if (!response.ok) {
      notFound();
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();

    if (data.products && Array.isArray(data.products)) {
      products = data.products;
    } else {
      console.warn('Unexpected API response structure:', data);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}

export const dynamicParams = true;
export const revalidate = 60;

const ProductPageClient = dynamic(() => import('./product'), {
  ssr: false,
});

export default async function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient id={params.id} />;
}