'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { toast } from '@/app/hooks/use-toast';
import { AppDispatch, RootState } from '@/app/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '@/app/redux/cartSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { updateCartItemQuantity, removeCartItem } from '@/app/api/cart'; // Example API functions

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Automatically open the cart when items are added
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsCartOpen(true);
    }
  }, [cartItems]);

  // Update quantity in the database
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
      // Update quantity in the database
      // await updateCartItemQuantity(id, size, newQuantity);

      // Update quantity in the Redux store
      dispatch(updateQuantity({ id, size, quantity: newQuantity }));
    } catch (error) {
      toast({
        title: 'Error updating quantity',
        description: 'Failed to update the quantity in the database.',
        variant: 'destructive',
      });
    }
  };

  // Remove item from the database
  const handleRemoveItem = async (id: number, size: string) => {
    try {
      // Remove item from the database
      // await removeCartItem(id, size);

      // Remove item from the Redux store
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

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const afterDiscount = cartItems.reduce((sum, item) => sum + (item.discountPrice > 0 ? item.discountPrice : item.price) * item.quantity, 0);
  // const subtotal = cartItems.reduce((sum, item) => sum + (item.discountPrice > 0 ? item.discountPrice : item.price) * item.quantity, 0);
  const discount = subtotal - afterDiscount
  const deliveryFee = 5.00; // Example delivery fee
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen main-content container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex flex-col md:flex-row items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
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
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
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
                    onClick={() => handleRemoveItem(item.id, item.size)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="space-y-2">
              <p className="text-lg">
                Subtotal: <span className="font-semibold">LKR{subtotal.toFixed(2)}</span>
              </p>
              <p className="text-lg">
                Discount: <span className="font-semibold">-LKR{discount.toFixed(2)}</span>
              </p>
              <p className="text-lg">
                Delivery Fee: <span className="font-semibold">LKR{deliveryFee.toFixed(2)}</span>
              </p>
              <p className="text-lg">
                Estimated Delivery: <span className="font-semibold">3-5 business days</span>
              </p>
              <p className="text-xl font-semibold">
                Total: <span className="text-primary">LKR{total.toFixed(2)}</span>
              </p>
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
  );
}