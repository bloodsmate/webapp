'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, InstagramIcon as Tiktok } from 'lucide-react'
import Image from 'next/image'
import { logo_white_url } from '../data/constants'
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Wave = () => {
  const wave1Ref = useRef<SVGSVGElement>(null);
  const wave2Ref = useRef<SVGSVGElement>(null);
  const wave3Ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (wave1Ref.current && wave2Ref.current && wave3Ref.current) {
      // Wave 1 Animation (Fastest)
      gsap.to(wave1Ref.current, {
        y: '-=20', // Move up and down by 20px
        duration: 2, // Faster animation
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Wave 2 Animation (Medium speed)
      gsap.to(wave2Ref.current, {
        y: '-=15', // Move up and down by 15px
        duration: 3, // Medium speed
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Wave 3 Animation (Slowest)
      gsap.to(wave3Ref.current, {
        y: '-=10', // Move up and down by 10px
        duration: 4, // Slowest animation
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 h-[200px]">
      {/* Wave Layer 1 */}
      <div className="absolute bottom-0 left-0 w-full h-full">
        <svg
          ref={wave1Ref}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-full"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-900 opacity-70"
          ></path>
        </svg>
      </div>

      {/* Wave Layer 2 */}
      <div className="absolute bottom-0 left-0 w-full h-full">
        <svg
          ref={wave2Ref}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-full"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-900 opacity-50"
          ></path>
        </svg>
      </div>

      {/* Wave Layer 3 */}
      <div className="absolute bottom-0 left-0 w-full h-full">
        <svg
          ref={wave3Ref}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-full"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-900 opacity-30"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default function Footer() {

  return (
    <footer className="bg-black text-white pt-20 pb-8 relative overflow-hidden">
      {/* 3D Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-gray-900 to-black transform -skew-y-3 origin-bottom"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:items-start"
          >
            <Image
              src={logo_white_url}
              alt="Logo"
              width={150}
              height={100}
              className="mb-4"
            />
            <p className="text-gray-400 text-center md:text-left">
              Wear your passion with our unique T-shirts.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Tiktok className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-semibold mb-4">Payment Methods</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <FaCcVisa size={32} className="text-blue-900" />
              <FaCcMastercard size={32} className="text-red-600" />
              <img
                src="https://res.cloudinary.com/midefulness/image/upload/v1736096286/BloodsMate/koko-pay_d6id9w.png"
                alt="koko pay"
                className="h-8"
              />
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 BloodsMate. All rights reserved.</p>
        </div>
      </div>

      {/* 3D Wave */}
      <Wave />
    </footer>
  )
}