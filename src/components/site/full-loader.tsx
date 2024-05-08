"use client";

import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "./logo";
import { $isLoading } from "@/store/full-loader";

const FullLoader = () => {
  const isLoading = useStore($isLoading);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div className="fixed inset-0 bg-black/25 z-[999999] flex flex-col gap-4 items-center justify-center">
          <motion.div
            initial={{
              scale: 0.5,
              opacity: 0.5,
              rotate: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 360,
            }}
            transition={{
              opacity: {
                duration: 0.5,
                ease: "linear",
              },
              scale: {
                duration: 1,
                ease: "linear",
              },
              rotate: {
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            exit={{
              scale: 0.5,
              opacity: 0.5,
            }}
          >
            <Logo isVeryBig />
          </motion.div>
          <p className="text-lg tracking-wider text-white font-bold">
            Loading...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullLoader;
