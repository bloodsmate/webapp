'use client'

import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { RootState } from '@/app/redux/store';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { removeFromCart } from '@/app/redux/cartSlice';
import { toast } from '@/app/hooks/use-toast';

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLDivElement>(null);

  // Calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice === 0 ? item.price : item.discountPrice) * item.quantity,
    0
  );

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle item removal
  const handleRemoveItem = (id: number, size: string) => {
    dispatch(removeFromCart({ id, size }));
    toast({
      title: 'Item removed',
      description: 'The item has been removed from your cart.',
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-16 right-5 w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden border"
      ref={popupRef}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="p-4 text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={`${item.id}-${item.size}`} className="flex p-4 hover:bg-gray-50">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{item.name}</h3>
                    <div className="text-right">
                      {item.discountPrice > 0 && (
                        <p className="text-sm text-gray-500 line-through">
                          LKR{(item.price * item.quantity).toFixed(2)}
                        </p>
                      )}
                      <p>
                        LKR
                        {item.discountPrice === 0
                          ? (item.price * item.quantity).toFixed(2)
                          : (item.discountPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-1 justify-items-center items-center place-content-between">
                    <div className="flex gap-4">
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>  
                    <button
                      onClick={() => handleRemoveItem(item.id, item.size)}
                      className="text-sm text-red-500 hover:text-red-700 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </button>
                   </div> 
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex justify-between text-lg font-semibold">
          <p>Total</p>
          <p>LKR {total.toFixed(2)}</p>
        </div>
        <Link href="/cart">
          <Button className="w-full mt-4" onClick={onClose}>
            <ShoppingBag className="mr-2 h-4 w-4" /> View Cart
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}