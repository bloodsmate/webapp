import ProductPageClient from './product';

export function generateStaticParams() {
  return [{ id: "test" }];
}
export default async function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient params={params} />;
}