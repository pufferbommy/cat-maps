import { useStore } from "@nanostores/react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import Logo from "./logo";
import { $isLoading } from "@/store/full-loader";

const FullLoader = () => {
  const isLoading = useStore($isLoading);

  const opacity = useMotionValue(0);
  opacity.set(isLoading ? 1 : 0);

  const pointerEvents = useTransform(opacity, (latest) =>
    latest === 0 ? "none" : "auto"
  );

  return (
    <motion.div
      style={{ opacity, pointerEvents }}
      className="fixed inset-0 bg-black/25 z-[999999] flex items-center justify-center"
    >
      <motion.div
        initial={{
          scale: 0,
          rotate: 0,
        }}
        animate={{
          scale: 1,
          rotate: 360,
        }}
        exit={{
          scale: 0,
          rotate: 0,
        }}
        transition={{
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
      >
        <Logo isVeryBig />
      </motion.div>
    </motion.div>
  );
};

export default FullLoader;
