"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { bloodsmate_pulse_rate } from "../data/constants";

export default function HeartPulse() {
  return (
    <div className="py-12 bg-gray-100">
      <div className="flex items-center justify-center w-full">
        {/* Left Line */}
        <motion.div
          className="h-0.5 bg-black flex-1 mt-[3px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Center Image */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-shrink-0"
        >
          <Image
            src={bloodsmate_pulse_rate}
            alt="Heart Icon"
            width={142}
            height={630}
            className="w-auto h-auto max-w-[142px]"
          />
        </motion.div>

        {/* Right Line */}
        <motion.div
        className="h-0.5 bg-black flex-1 mt-[3px]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
}
