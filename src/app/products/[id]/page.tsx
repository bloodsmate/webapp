import ProductPageClient from './product';
// import * as api from "@/app/api/apiClient";
import { DEFAULT_BACKEND_URL } from '@/app/data/constants';
import { Product } from "@/app/data/products";
import { notFound } from 'next/navigation';

// export async function generateStaticParams() {
//   // Fetch products from the API
//   const products: Product[] = await api.getProducts();

//   // Map products to the required format for static params
//   return products.map((product: Product) => ({
//     id: product.id.toString(), // Ensure the ID is a string
//   }));
// }

export async function generateStaticParams() {
  let products: Product[] = [];
  try {
    const response = await fetch(`${DEFAULT_BACKEND_URL}/products`);
    if (!response.ok) {
      notFound();
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();

    // Extract the `products` array from the response
    if (data.products && Array.isArray(data.products)) {
      products = data.products;
    } else {
      console.warn('Unexpected API response structure:', data);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  // Map the products to the required format for static params
  return products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}

export const dynamicParams = true;
export const revalidate = 60;

export default async function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient id={params.id} />;
}