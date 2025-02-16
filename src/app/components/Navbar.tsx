'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ShoppingBag, User, Menu, X, Home, Shirt, Info, Mail } from 'lucide-react'; // Updated icons
import { Button } from './ui/button';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { RootState } from '../redux/store';
import { smoothScroll } from '../utils/smoothScroll';
import CartPopup from './CartPopup';
import Image from 'next/image';
import { logo_black_url } from '../data/constants';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { scrollY } = useScroll();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleScroll = (id: string) => {
    smoothScroll(`#${id}`);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        className={`z-50 fixed top-0 left-0 right-0 transition-colors duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              <Image src={logo_black_url} alt="Logo" width={150} height={100} />
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => handleScroll('featured')}
                className="text-gray-600 hover:text-gray-800"
              >
                Featured
              </button>
              <Link href="/products" className="text-gray-600 hover:text-gray-800">
                Products
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-800">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-800">
                Contact
              </Link>
              <button
                onClick={() => setIsCartOpen((prev) => !prev)}
                className="text-gray-600 hover:text-gray-800 relative"
              >
                <ShoppingBag className="w-6 h-6" /> {/* Updated icon */}
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="z-50 md:hidden py-4"
              >
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => handleScroll('featured')}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Featured
                  </button>
                  <Link href="/products" className="text-gray-600 hover:text-gray-800">
                    Products
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-gray-800">
                    About
                  </Link>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-800">
                    Contact
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="text-gray-600 hover:text-gray-800 flex items-center"
                  >
                    <ShoppingBag className="w-6 h-6 mr-2" /> {/* Updated icon */}
                    Cart ({totalItems})
                  </button>
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Bottom App Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              <Home className="w-6 h-6" />
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-800">
              <Shirt className="w-6 h-6" />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-gray-600 hover:text-gray-800 relative"
            >
              <ShoppingBag className="w-6 h-6" /> {/* Updated icon */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
            <Link href="/about" className="text-gray-600 hover:text-gray-800">
              <Info className="w-6 h-6" />
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800">
              <Mail className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Popup */}
      <AnimatePresence>
        {isCartOpen && <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>
    </>
  );
}