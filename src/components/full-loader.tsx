import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@nanostores/react";

import { $isLoading } from "@/store/full-loader";

const FullLoader = () => {
  const isLoading = useStore($isLoading);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{
            opacity: 0,
            pointerEvents: "none",
          }}
          animate={{
            opacity: 1,
            pointerEvents: "auto",
          }}
          exit={{
            opacity: 0,
            pointerEvents: "none",
          }}
          className="fixed inset-0 bg-black/25 z-[999999] flex justify-center items-center before:w-16 before:h-16 before:animate-spin before:border-8 before:rounded-full before:border-white before:border-t-primary"
        />
      )}
    </AnimatePresence>
  );
};

export default FullLoader;
