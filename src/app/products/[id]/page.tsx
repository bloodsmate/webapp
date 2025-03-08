import ProductPageClient from './product';

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }];
  // return [{ id: "test" }];
}
export default async function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient id={params.id} />;
}