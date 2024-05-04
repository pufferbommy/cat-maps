import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "./logo";
import { cn } from "@/lib/utils";
import { $isLoading } from "@/store/full-loader";

const FullLoader = () => {
  const isLoading = useStore($isLoading);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className={cn(
            "fixed inset-0 bg-black/25 z-[999999] flex items-center pointer-events-none justify-center"
          )}
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
              duration: 1,
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{
                rotate: 360,
              }}
              exit={{
                rotate: 0,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Logo isVeryBig />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullLoader;
