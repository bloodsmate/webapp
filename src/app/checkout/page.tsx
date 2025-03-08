'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Progress } from "@/app/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/components/ui/alert-dialog"
import { AppDispatch, RootState } from '@/app/redux/store';
import { clearCart } from "@/app/redux/cartSlice"
import { createOrder } from "@/app/redux/orderSlice"
import { createPayHerePayment } from "@/app/redux/paymentSlice"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { deliveryFee } from '@/app/data/constants'
import Loader from '@/app/components/Loader'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Info } from "lucide-react";
import * as api from "@/app/api/apiClient"
import { toast } from '../hooks/use-toast'

function CheckoutForm() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)
  const [shippingErrors, setShippingErrors] = useState<{ [key: string]: string }>({})
  const [billingErrors, setBillingErrors] = useState<{ [key: string]: string }>({})
  const [orderId, setOrderId] = useState<string | null>(null)
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const authUser = useSelector((state: RootState) => state.auth.user)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    zipCode: "",
  })
  const [billingData, setBillingData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    zipCode: "",
  })

  const shippingCost = deliveryFee
  const subtotal = cartItems.reduce((sum, item) => sum + (item.discountPrice > 0 ? item.discountPrice : item.price) * item.quantity, 0)
  const total = subtotal + shippingCost

  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.name,
        email: authUser.email,
        address: "",
        city: "",
        phone: "",
        zipCode: "",
      })
    }
  }, [authUser])

  // Auto-fill billing address when checkbox is checked
  useEffect(() => {
    if (isBillingSameAsShipping) {
      setBillingData({
        name: formData.name,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        zipCode: formData.zipCode,
      })
    }
  }, [isBillingSameAsShipping, formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (shippingErrors[name]) {
      setShippingErrors({
        ...shippingErrors,
        [name]: "",
      })
    }
  }

  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBillingData({
      ...billingData,
      [name]: value,
    })
    if (billingErrors[name]) {
      setBillingErrors({
        ...billingErrors,
        [name]: "",
      })
    }
  }

  const validateStep1 = () => {
    const newShippingErrors: { [key: string]: string } = {}
    const newBillingErrors: { [key: string]: string } = {}

    // Validate shipping details
    if (!formData.name) newShippingErrors.name = "Name is required"
    if (!formData.email) newShippingErrors.email = "Email is required"
    if (!formData.address) newShippingErrors.address = "Address is required"
    if (!formData.city) newShippingErrors.city = "City is required"
    if (!formData.phone) newShippingErrors.phone = "Phone is required"

    // Validate billing details if different from shipping
    if (!isBillingSameAsShipping) {
      if (!billingData.name) newBillingErrors.name = "Billing Name is required"
      if (!billingData.address) newBillingErrors.address = "Billing Address is required"
      if (!billingData.city) newBillingErrors.city = "Billing City is required"
      if (!billingData.phone) newBillingErrors.phone = "Billing Phone is required"
    }

    setShippingErrors(newShippingErrors)
    setBillingErrors(newBillingErrors)

    return Object.keys(newShippingErrors).length === 0 && Object.keys(newBillingErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
  }

  const generateOrderId = () => {
    return `BLOODSMATE-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }

  // const doPayments = (paymentData: any) => {
  //   const form = document.createElement('form')
  //   form.method = 'POST'
  //   form.action = 'https://sandbox.payhere.lk/pay/checkout'
  //   form.style.display = 'none'

  //   for (const key in paymentData) {
  //     const input = document.createElement('input')
  //     input.type = 'hidden'
  //     input.name = key
  //     input.value = paymentData[key]
  //     form.appendChild(input)
  //   }

  //   document.body.appendChild(form)
  //   form.submit()
  // }

  // const handleConfirmOrder = async () => {
  //   const orderId = generateOrderId()
  //   setOrderId(orderId)

  //   if (paymentMethod === 'COD') {
  //     setIsConfirmDialogOpen(true)
  //   } else if (paymentMethod === 'DEBIT_CARD') {
  //     setLoading(true)
  //     try {
  //       await saveOrderAndClearCart(orderId)

  //       const data = await dispatch(createPayHerePayment(
  //         { amount: total, email: formData.email, orderId, name: billingData.name, address: billingData.address, city: billingData.city, phone: billingData.phone }
  //       ))

  //       doPayments(data.payload.paymentData)
        
  //     } catch (error) {
  //       console.error('Error preparing payment:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   } else if (paymentMethod === 'KOKO') {
  //     router.push('/koko-pay-redirect')
  //   }
  // }

  const handleConfirmOrder = async () => {
    const orderId = generateOrderId();
    setOrderId(orderId);
  
    if (paymentMethod === 'COD') {
      setIsConfirmDialogOpen(true);
    } else if (paymentMethod === 'DEBIT_CARD' || paymentMethod === 'AMEX') {
      setLoading(true);
      try {
        // Step 1: Save the order in your backend
        const orderInitiated = await saveOrderAndClearCart(orderId);
  
        if (!orderInitiated) {
          console.error('Failed to initiate order');
          return;
        }
  
        console.log('Order initiated successfully');
  
        // Step 2: Call your backend to create a Marx IPG order
        const createPaymentData = JSON.stringify({
          orderId,
          amount: total,
          email: formData.email,
          customerName: billingData.name,
          customerMobile: billingData.phone,
          paymentMethod: paymentMethod === 'AMEX' ? 'AMEX' : 'VISA_MASTERCARD',
          returnUrl: `${window.location.origin}/payment-confirmation/${orderId}`,
        });
  
        const response = await api.createMarxOrder(createPaymentData);
  
        if (!response) {
          toast({
            title: "Failed to create order.",
            variant: "destructive",
          })
          throw new Error('Failed to create Marx order');
        }

        // const data = response.json();
  
        if (response.payUrl) {
          // Step 3: Redirect the user to the Marx payment URL
          window.location.href = response.payUrl;
        } else {
          toast({
            title: "Failed to create order.",
            variant: "destructive",
          })
          console.error('Failed to create Marx order:', response.message);
        }
      } catch (error) {
        toast({
          title: "Error processing payment.",
          variant: "destructive"
        })
        console.error('Error processing payment:', error);
      } finally {
        setLoading(false);
      }
    } else if (paymentMethod === 'KOKO') {
      router.push('/koko-pay-redirect');
    }
  };
  
  const saveOrderAndClearCart = async (orderId: string) => {
    setIsProcessingOrder(true);
    try {
      const orderData = {
        orderId: orderId,
        userId: authUser?.id || null,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
        billingAddress: `${billingData.address}, ${billingData.city}, ${billingData.zipCode}`,
        paymentMethod: paymentMethod.toUpperCase(),
        shippingCost: deliveryFee,
        email: formData.email,
        cartItems: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          totalAmount: item.discountPrice > 0 ? item.discountPrice * item.quantity : item.price * item.quantity,
          size: item.size,
          image: item.image,
        })),
      };
  
      // Dispatch the createOrder action
      const resultAction = await dispatch(createOrder(orderData));
  
      if (createOrder.fulfilled.match(resultAction)) {
        // Clear the cart only if the order is successfully created
        await dispatch(clearCart());
  
        // Redirect to order confirmation page for COD
        if (paymentMethod.toUpperCase() === 'COD') {
          router.push(`/order-confirmation/${orderId}`);
        }
  
        // Return true to indicate the order was successfully initiated
        return true;
      } else {
        const errorMessage = resultAction.payload
          ? String(resultAction.payload)
          : 'Failed to create order';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Failed to save order:', error);
      return false; // Return false if the order initiation fails
    } finally {
      setIsProcessingOrder(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {isProcessingOrder ? (
        <Loader size="large" />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Shipping Information & Payment Methods */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Bar */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}>
                      1
                    </div>
                    <span className={step >= 1 ? 'font-semibold' : 'text-gray-600'}>Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}>
                      2
                    </div>
                    <span className={step >= 2 ? 'font-semibold' : 'text-gray-600'}>Payment</span>
                  </div>
                </div>
                <Progress value={(step / 2) * 100} className="w-full" />
              </div>

              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input id="name" name="name" required value={formData.name} onChange={handleInputChange} />
                      {shippingErrors.name && <p className="text-red-500 text-sm">{shippingErrors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} />
                      {shippingErrors.email && <p className="text-red-500 text-sm">{shippingErrors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                      <Input id="address" name="address" required value={formData.address} onChange={handleInputChange} />
                      {shippingErrors.address && <p className="text-red-500 text-sm">{shippingErrors.address}</p>}
                    </div>
                    <div>
                      <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                      <Input id="city" name="city" required value={formData.city} onChange={handleInputChange} />
                      {shippingErrors.city && <p className="text-red-500 text-sm">{shippingErrors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                    </div>
                    <div className="relative">
                      <Label htmlFor="phone">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pr-10"
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500">
                                <Info size={16} />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end">
                              <p>This is used in case we need to contact you about your order.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      {shippingErrors.phone && <p className="text-red-500 text-sm">{shippingErrors.phone}</p>}
                    </div>

                    {/* Billing Address Section */}
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-6">Billing Address</h2>
                      <div className="flex items-center space-x-2 mb-6">
                        <Checkbox
                          id="sameAsShipping"
                          checked={isBillingSameAsShipping}
                          onCheckedChange={(checked) => setIsBillingSameAsShipping(!!checked)}
                        />
                        <Label htmlFor="sameAsShipping">Same as Shipping Address</Label>
                      </div>
                      {!isBillingSameAsShipping && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="billingName">Full Name <span className="text-red-500">*</span></Label>
                            <Input id="billingName" name="name" required value={billingData.name} onChange={handleBillingInputChange} />
                            {billingErrors.name && <p className="text-red-500 text-sm">{billingErrors.name}</p>}
                          </div>
                          <div>
                            <Label htmlFor="billingAddress">Address <span className="text-red-500">*</span></Label>
                            <Input id="billingAddress" name="address" required value={billingData.address} onChange={handleBillingInputChange} />
                            {billingErrors.address && <p className="text-red-500 text-sm">{billingErrors.address}</p>}
                          </div>
                          <div>
                            <Label htmlFor="billingCity">City <span className="text-red-500">*</span></Label>
                            <Input id="billingCity" name="city" required value={billingData.city} onChange={handleBillingInputChange} />
                            {billingErrors.city && <p className="text-red-500 text-sm">{billingErrors.city}</p>}
                          </div>
                          <div>
                            <Label htmlFor="billingZipCode">Zip Code</Label>
                            <Input id="billingZipCode" name="zipCode" value={billingData.zipCode} onChange={handleBillingInputChange} />
                          </div>
                          <div className="relative">
                            <Label htmlFor="billingPhone">
                              Phone <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                              <Input
                                id="billingPhone"
                                name="phone"
                                required
                                value={billingData.phone}
                                onChange={handleBillingInputChange}
                                className="pr-10"
                              />
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500">
                                      <Info size={16} />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" align="end">
                                    <p>This is used in case we need to contact you about your order.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            {billingErrors.phone && <p className="text-red-500 text-sm">{billingErrors.phone}</p>}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={handleNextStep} disabled={loading}>
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Methods */}
              {step === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold">Standard Delivery</h3>
                        <p className="text-sm text-gray-600">It takes 2-3 business days to deliver</p>
                        <p className="text-sm text-gray-600">Delivery Charge: LKR {shippingCost.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mt-8 mb-6">Payment Method</h2>
                  
                  <RadioGroup defaultValue={paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="COD" id="cash_on_delivery" />
                      <Label htmlFor="cash_on_delivery" className="flex-1">Cash on Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="DEBIT_CARD" id="card" />
                      <Label htmlFor="card" className="flex-1">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="AMEX" id="amex" />
                      <Label htmlFor="amex" className="flex-1">American Express (AMEX)</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="KOKO" id="koko_pay" />
                      <Label htmlFor="koko_pay" className="flex-1">KOKO Pay</Label>
                    </div>
                  </RadioGroup>

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={handleConfirmOrder} disabled={!paymentMethod}>
                      Confirm Order
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm self-start sticky top-20">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li key={`${item.id}-${item.size}`} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="rounded-md object-cover"
                        />
                        <span className="absolute top-0 right-0 bg-black text-white text-xs px-2 py-1 rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                        {item.discountPrice > 0 ? (
                          <>
                            <p className="text-sm text-gray-600 line-through">
                              LKR {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              LKR {(item.discountPrice * item.quantity).toFixed(2)}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-600">
                            LKR {(item.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>LKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Shipping</span>
                  <span>LKR {shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold mt-4">
                  <span>Total</span>
                  <span>LKR {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Dialog for Cash on Delivery */}
          <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Order</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to place this order with Cash on Delivery?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => orderId && saveOrderAndClearCart(orderId)}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="container main-content mx-auto px-4 py-8">
      <CheckoutForm />
    </div>
  )
}