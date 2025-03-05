import OrderConfirmationClient from './orderConfirmationClient';

export function generateStaticParams() {
  return [{ orderId: "test" }];
}
export default async function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  return <OrderConfirmationClient orderId={params.orderId} />;
}