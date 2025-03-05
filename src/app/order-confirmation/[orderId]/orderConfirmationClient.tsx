'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { CheckCircle, AlertCircle, Loader as LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { logo_black_url } from '@/app/data/constants';
import { fetchOrdersByOrderId } from '@/app/redux/orderSlice';
import { toast } from '@/app/hooks/use-toast';
import Loader from '@/app/components/Loader';
import { notFound } from "next/navigation";
import { Order, OrderItem } from '@/app/data/orderTypes';

export default function OrderConfirmationClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.items);
  const [order, setOrder] = useState<Order | null>(null); // Initialize as null
  const orderConfirmationRef = useRef<HTMLDivElement>(null); // Ref to capture the order confirmation section
  const [showWarning, setShowWarning] = useState(false); // State to show warning for non-logged-in users
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const resultAction = await dispatch(fetchOrdersByOrderId(orderId));
        if (fetchOrdersByOrderId.fulfilled.match(resultAction)) {
          setOrder(resultAction.payload);
        } else {
          toast({
            title: 'Failed to fetch order details',
            description: 'An error occurred while tracking your order.',
            variant: 'destructive',
          });
          router.push('/order-tracking'); // Redirect to order tracking page
        }
      } catch (error) {
        console.error('Error tracking order:', error);
        toast({
          title: 'Error tracking order',
          description: 'An error occurred while tracking your order. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    fetchOrder();
  }, [dispatch, orderId, router]);

  // Function to handle PDF export
  const handleExportPDF = async () => {
    const input = orderConfirmationRef.current;

    if (input && order) {
      // Ensure all images are loaded before capturing
      const images = input.getElementsByTagName('img');
      const imageLoadPromises = Array.from(images).map((img: HTMLImageElement) => {
        if (!img.complete) {
          return new Promise((resolve) => {
            img.onload = resolve;
          });
        }
        return Promise.resolve();
      });

      // Wait for all images to load
      await Promise.all(imageLoadPromises);

      // Add custom strikethrough for PDF export
      const strikethroughElements = input.querySelectorAll<HTMLElement>('.strikethrough');
      strikethroughElements.forEach((element: HTMLElement) => {
        const span = document.createElement('span');
        span.style.position = 'absolute';
        span.style.borderTop = '1px solid black';
        span.style.width = '100%';
        span.style.top = '50%';
        span.style.left = '0';
        element.style.position = 'relative';
        element.appendChild(span);
      });

      // Capture the content
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // Create a PDF in portrait mode with A4 size
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height to maintain aspect ratio

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`order_${order.orderId}.pdf`); // Save the PDF with the order ID as the filename
      });
    }
  };

  // Calculate subtotal, discount, and total
  const subtotal = order?.OrderItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const discount = order?.OrderItems?.reduce((sum, item) => sum + (item.price * item.quantity - item.totalPrice), 0) || 0;
  const total = (order?.totalAmount || 0) + (order?.shippingCost || 0);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-500">Order not found. Please check your order ID and try again.</p>
        <Button onClick={() => router.push('/order-tracking')}>Go to Order Tracking</Button>
      </div>
    );
  }

  const checkPaymentMethod = (paymentMethod: string) => {
    if (paymentMethod == "COD") {
      return "Cash On Delivery";
    } else if (paymentMethod == "DEBIT_CARD") {
      return "Debit Card/Credit Card";
    } else if (paymentMethod == "KOKO") {
      return "KOKO";
    } else {
      return "AMEX";
    }
  }

  return (
    <div className="container main-content mx-auto px-4 py-12">
      {/* Order Confirmation Section */}
      <div ref={orderConfirmationRef} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        {/* Logo */}
        <div className="flex justify-center my-8">
          <Image
            src={logo_black_url}
            alt="Logo"
            width={150} // Adjust width as needed
            height={50} // Adjust height as needed
            className="object-contain"
          />
        </div>

        {/* Success Icon - Indicates Order Placed Successfully */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Order Confirmation Title */}
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="text-gray-600 mb-8">Your order has been successfully placed. Below are the details of your purchase.</p>

        {/* Order Status */}
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-8">
          <div className="flex items-center">
            <p>
              <strong>Order Status:</strong> {order.status}
            </p>
          </div>
        </div>

        {/* Payment Status */}
        {order.paymentStatus === null && (
          <div className="flex items-center justify-center space-x-2 mb-6">
            <LoaderIcon className="w-6 h-6 animate-spin" />
            <p>Loading payment status...</p>
          </div>
        )}

        {order.paymentStatus === 'NOT_COMPLETED' && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8">
            <div className="flex items-center">
              <p>
                <strong>Payment Status:</strong> Not Completed
              </p>
            </div>
            <p className="mt-2">Your order has been placed successfully. Please have the payment ready upon delivery.</p>
          </div>
        )}

        {order.paymentStatus === 'PENDING' && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8">
            <div className="flex items-center">
              <p>
                <strong>Payment Status:</strong> Pending
              </p>
            </div>
            <p className="mt-2">Your payment is still being processed. Please check back later.</p>
          </div>
        )}

        {order.paymentStatus === 'COMPLETED' && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8">
            <div className="flex items-center">
              <p>
                <strong>Payment Status:</strong> Success
              </p>
            </div>
            <p className="mt-2">Your payment has been successfully processed.</p>
          </div>
        )}

        {order.paymentStatus === 'FAILED' && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8">
            <div className="flex items-center">
              <p>
                <strong>Payment Status:</strong> Failed
              </p>
            </div>
            <p className="mt-2">Your payment failed. Please try again or contact support.</p>
          </div>
        )}

        {/* Order Details */}
        <div className="text-left space-y-6">
          {/* Order ID and Date */}
          <div className="flex flex-col sm:flex-row justify-between border-b pb-4">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-semibold">{order.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-semibold">{order.orderDate}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-2">
              <p>{order.shippingAddress}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <p className="text-gray-600">{checkPaymentMethod(order.paymentMethod)}</p>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <ul className="space-y-4">
              {order.OrderItems?.map((item: OrderItem) => (
                <li key={item.id} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.Product.images[0]} // Use the first image from the Product
                      alt={item.Product.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold">{item.Product.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 strikethrough">LKR {item.price.toFixed(2)}</p>
                    <p className="font-semibold">LKR {item.totalPrice.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>LKR {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-red-500">- LKR {discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Cost</span>
              <span>LKR {order.shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>LKR {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={() => router.push('/products')}>Continue Shopping</Button>
        <Button onClick={handleExportPDF}>Export as PDF</Button>
      </div>
    </div>
  );
}