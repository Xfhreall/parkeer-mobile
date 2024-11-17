"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/public/assets/icon.svg";
import wave from "@/public/fragments/wave.svg";
import { motion } from "framer-motion";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);
    const text = setTimeout(() => {
      setLoadingText("Parkeer");
    }, 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(text);
    };
  }, []);

  return (
    <div className="absolute min-h-screen w-full overflow-hidden">
      <motion.div
        className="fixed top-0 h-1/2 w-full bg-[#76ADFF] z-50"
        initial={{ y: 0 }}
        animate={{ y: isLoading ? 0 : "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <motion.div
        className="fixed bottom-0 w-full h-2/3 bg-[#76ADFF] z-50"
        initial={{ y: 0 }}
        animate={{ y: isLoading ? 0 : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 2.5, ease: "easeInOut" }}
          className="absolute bottom-0"
        >
          <Image src={wave} alt="wave" className="w-full h-auto" />
        </motion.div>
        <motion.div
          className="text-xs w-10/12 text-center mx-auto text-neutral-200 absolute bottom-28 font-bold left-0 right-0"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 2.9 }}
        >
          Temukan Tempat Parkir dengan Cepat dengan Parkeer
        </motion.div>
      </motion.div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none`}
      >
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: loadingText === "Parkeer" ? -48 : 0,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 300,
            }}
          >
            <Image
              src={icon}
              alt="Parkeer icon"
              className="w-24 h-24 md:w-32 md:h-32"
              width={128}
              height={128}
            />
          </motion.div>
          <motion.div
            className={`font-bayon text-neutral-200 text-xl font-bold ${
              loadingText !== "Parkeer" ? "animate-pulse" : ""
            }`}
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: loadingText === "Parkeer" ? -48 : 0,
              opacity: loadingText === "Parkeer" ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 200,
              ease: "easeOut",
              delay: loadingText === "Parkeer" ? 0.4 : 0,
            }}
          >
            {loadingText}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
