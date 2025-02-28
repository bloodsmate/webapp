'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Button } from '@/app/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import type { RootState } from '@/app/redux/store'

export default function OrderConfirmationPage({ params }: { params: { userId: string | null } }) {
  const router = useRouter()
  const orders = useSelector((state: RootState) => state.orders.items)
  const order = params.userId
    ? orders.find((order) => order.userId === params.userId) // Find order by userId if userId is provided
    : orders[orders.length - 1] // Fallback to the most recent order if userId is null
  const orderConfirmationRef = useRef(null) // Ref to capture the order confirmation section

  // Redirect if no order is found
  useEffect(() => {
    if (!order) {
      router.push('/')
    }
  }, [order, router])

  // Function to handle PDF export
  const handleExportPDF = () => {
    const input = orderConfirmationRef.current

    if (input && order) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4') // Create a PDF in portrait mode with A4 size
        const imgWidth = 210 // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width // Calculate height to maintain aspect ratio

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save(`order_${order.id}.pdf`) // Save the PDF with the order ID as the filename
      })
    }
  }

  if (!order) return null

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Logo */}
      <div className="flex justify-center my-8">
        <Image
          src="/path-to-your-logo.png" // Replace with your logo path
          alt="Logo"
          width={150} // Adjust width as needed
          height={50} // Adjust height as needed
          className="object-contain"
        />
      </div>

      {/* Order Confirmation Section */}
      <div ref={orderConfirmationRef} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Order Confirmation Title */}
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="text-gray-600 mb-8">Your order has been successfully placed. Below are the details of your purchase.</p>

        {/* Order Details */}
        <div className="text-left space-y-6">
          {/* Order ID and Date */}
          <div className="flex flex-col sm:flex-row justify-between border-b pb-4">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-semibold">{order.id}</p>
            </div>
            <div>
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
            <p className="text-gray-600">{order.paymentMethod}</p>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <ul className="space-y-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">LKR {(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Total */}
          <div className="flex justify-between text-xl font-bold border-t pt-4">
            <span>Total</span>
            <span>LKR {order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={() => router.push('/')}>Continue Shopping</Button>
        <Button onClick={handleExportPDF}>Export as PDF</Button>
      </div>
    </div>
  )
}