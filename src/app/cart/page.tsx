'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import FeaturedProducts from '@/app/components/FeaturedProducts';
import { toast } from '@/app/hooks/use-toast';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '@/app/redux/cartSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsCartOpen(true);
    }
  }, [cartItems]);

  const handleUpdateQuantity = async (id: number, size: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast({
        title: 'Invalid quantity',
        description: 'Quantity must be at least 1.',
        variant: 'destructive',
      });
      return;
    }

    try {
      dispatch(updateQuantity({ id, size, quantity: newQuantity }));
    } catch (error) {
      toast({
        title: 'Error updating quantity',
        description: 'Failed to update the quantity in the database.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveItem = async (id: number, size: string) => {
    try {
      dispatch(removeFromCart({ id, size }));
      toast({
        title: 'Item removed',
        description: 'The item has been removed from your cart.',
      });
    } catch (error) {
      toast({
        title: 'Error removing item',
        description: 'Failed to remove the item from the database.',
        variant: 'destructive',
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const afterDiscount = cartItems.reduce((sum, item) => sum + (item.discountPrice > 0 ? item.discountPrice : item.price) * item.quantity, 0);
  const discount = subtotal - afterDiscount;
  const deliveryFee = 5.00;
  const total = subtotal - discount + deliveryFee;

  return (
    <>
    <div className="min-h-screen main-content container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-6">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600">
                      LKR{(item.discountPrice > 0 ? (item.discountPrice * item.quantity).toFixed(2) : (item.price * item.quantity).toFixed(2))}
                    </p>
                    {item.discountPrice > 0 && (
                      <p className="text-gray-400 line-through">
                        LKR{(item.price * item.quantity).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="text-lg">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(item.id, item.size)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-lg">Subtotal:</p>
                <p className="text-lg font-semibold">LKR{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg">Discount:</p>
                <p className="text-lg font-semibold text-red-500">-LKR{discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg">Delivery Fee:</p>
                <p className="text-lg font-semibold">LKR{deliveryFee.toFixed(2)}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <p className="text-lg">Estimated Delivery:</p>
                <p className="text-lg font-semibold sm:text-right">3-5 business days</p>
              </div>
              <div className="flex justify-between border-t pt-4">
                <p className="text-xl font-semibold">Total:</p>
                <p className="text-xl font-semibold text-primary">LKR{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/checkout">
                <Button size="lg">Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
    <FeaturedProducts />
    </>
  );
}