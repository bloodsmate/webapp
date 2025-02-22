'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/app/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Fonts (Add these to your global CSS or Tailwind config)
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-inter' });

const shirts = [
  { id: 1, image: 'https://res.cloudinary.com/midefulness/image/upload/v1740234114/BloodsMate/Hero%20Images/1_nonewp.png' },
  { id: 2, image: 'https://res.cloudinary.com/midefulness/image/upload/v1740234100/BloodsMate/Hero%20Images/4_am1eef.png' },
  { id: 3, image: 'https://res.cloudinary.com/midefulness/image/upload/v1740234095/BloodsMate/Hero%20Images/3_xurgpu.png' },
  { id: 4, image: 'https://res.cloudinary.com/midefulness/image/upload/v1740234076/BloodsMate/Hero%20Images/5_djdzkt.png' },
  { id: 5, image: 'https://res.cloudinary.com/midefulness/image/upload/v1740234042/BloodsMate/Hero%20Images/2_muwwtm.png' },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shirts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? shirts.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shirts.length);
  };

  return (
    <section className={`relative h-screen bg-white flex items-center justify-center p-6 overflow-hidden ${playfair.variable} ${inter.variable}`}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Slider (Left Side) */}
        <div className="relative w-full flex justify-center items-center order-1 md:order-1">
          <button 
            onClick={prevSlide} 
            className="absolute left-4 md:left-8 bg-white text-black p-3 rounded-full z-10 hover:bg-gray-100 transition-all shadow-lg"
          >
            <FaChevronLeft size={24} />
          </button>
          <div className="relative w-[80%] md:w-[90%] h-auto flex justify-center overflow-hidden items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-auto flex justify-center"
              >
                <Image
                  src={shirts[currentIndex].image}
                  alt="T-shirt Model"
                  width={window.innerWidth < 1400 ? 500 : 900} // Adjust image size for mobile
                  height={window.innerWidth < 1400 ? 600 : 1100} // Adjust image size for mobile
                  className={window.innerWidth < 1400 ? "object-cover w-[80%] h-full self-center" : "object-cover w-full h-full"}
                  priority={currentIndex === 0} // Prioritize the first image
                  loading={currentIndex === 0 ? "eager" : "lazy"} // Lazy load other images
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <button 
            onClick={nextSlide} 
            className="absolute right-4 md:right-8 bg-white text-black p-3 rounded-full z-10 hover:bg-gray-100 transition-all shadow-lg"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Text Content (Right Side) */}
        <div className="text-center md:text-left w-full md:w-1/2 text-black order-2 md:order-2 flex flex-col justify-center items-center md:items-start">
          <h1 className="text-5xl sm:text-6xl 2xl:text-7xl font-playfair font-bold tracking-wide leading-[1.2]">
            ONE TEE <br /> ENDLESS <br /> POSSIBILITIES
          </h1>
          <p className="text-lg md:text-xl mt-6 text-gray-600 font-inter font-medium max-w-md">
            Crafted with Premium Fabric for Unmatched Comfort
          </p>
          <Button className="mt-8 bg-black text-white px-8 py-4 text-lg rounded-full shadow-lg hover:bg-gray-900 transition-all font-inter font-medium">
            SHOP NOW
          </Button>
        </div>
      </div>

      {/* Pagination Dots (Hidden on Mobile) */}
      <div className="absolute bottom-6 flex gap-2 hidden md:flex">
        {shirts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === index ? 'bg-black scale-110' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}