'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, User, Home, Shirt, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import type { RootState, AppDispatch } from "../redux/store"
import { smoothScroll } from '../utils/smoothScroll';
import CartPopup from './CartPopup';
import Image from 'next/image';
import { logo_black_url } from '../data/constants';
import { logout, checkAuth } from '../redux/authSlice';

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (token && !user?.name) {
      dispatch(checkAuth());
    }
  }, [token, user, dispatch]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleScroll = (id: string) => {
    smoothScroll(`#${id}`);
  };

  const handleLogout = async () => {
    await dispatch(logout());
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
              {pathname === '/' && (
                <button
                  onClick={() => handleScroll('featured')}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Featured
                </button>
              )}
              <Link href="/products" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                Products
              </Link>
              <button
                onClick={() => setIsCartOpen((prev) => !prev)}
                className="text-gray-600 hover:text-gray-800 relative transition-colors duration-200"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1">
                    <User className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors duration-200" />
                    <span className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                      {user ? user?.name : 'Loading...'}
                    </span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Link href="/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/auth">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-gray-600 text-gray-600 hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    <User className="w-4 h-4 mr-1" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Bottom App Bar (Mobile Only) */}
      <motion.div
        className={`fixed bottom-0 left-0 right-0 shadow-lg md:hidden z-50 bg-white`}
        style={{ height: '64px' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/products" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
              <Shirt className="w-6 h-6" />
              <span className="text-xs mt-1">Products</span>
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center text-gray-600 hover:text-gray-800 relative"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
              <span className="text-xs mt-1">Cart</span>
            </button>
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
                  <User className="w-6 h-6" />
                  <span className="text-xs mt-1">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="w-6 h-6" /> {/* Added LogOut icon */}
                  <span className="text-xs mt-1">Logout</span>
                </button>
              </>
            ) : (
              <Link href="/auth" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
                <User className="w-6 h-6" /> {/* Added User icon for Login */}
                <span className="text-xs mt-1">Login</span>
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Cart Popup */}
      <AnimatePresence>
        {isCartOpen && <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 768px) {
          body {
            padding-bottom: 64px; /* Match the height of the bottom navigation bar */
          }
        }
      `}</style>
    </>
  );
}