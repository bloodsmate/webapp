import PaymentConfirmationClient from './paymentConfirmationClient';

export function generateStaticParams() {
  return [{ orderId: "test" }];
}
export default async function PaymentConfirmationPage({ params }: { params: { orderId: string } }) {
  return <PaymentConfirmationClient params={params} />;
}