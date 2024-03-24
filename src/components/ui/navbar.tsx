"use client";
import Webcam from "react-webcam";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getPositionInArray } from "@/utils/array";
import { MenuKey, menuList } from "@/constants/navbar";

const Navbar = () => {
  const [menu, setMenu] = useState<MenuKey>("home");

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const handleToggleCamera = () => {
    setIsCameraOpen((prev) => !prev);
  };

  const handleMenuClick = (key: MenuKey) => {
    setMenu(key);
  };

  const isMenuActive = (key: MenuKey) => menu === key;

  return (
    <>
      <AnimatePresence>
        {isMenuActive("camera") && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(8px)",
            }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
            }}
            className="bg-white/50 fixed inset-0 z-[50]"
          />
        )}
      </AnimatePresence>
      <nav className="flex gap-1 fixed shadow-sm rounded-full bg-white p-2 z-[51] bottom-4 left-1/2 -translate-x-1/2">
        {isMenuActive("camera") && (
          <div className="absolute flex flex-col items-center gap-1 rounded-md p-2 bottom-full left-1/2 -translate-x-1/2 bg-white shadow-sm mb-4">
            <div onClick={handleToggleCamera} className="w-40 aspect-video">
              {isCameraOpen ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  className="w-full h-full cursor-pointer"
                  screenshotFormat="image/jpeg"
                />
              ) : (
                <div className="cursor-pointer w-full h-full flex rounded-md justify-center items-center bg-gray-50">
                  Click for open camera
                </div>
              )}
            </div>
            {/* {isCameraOpen ? (
              <div onClick={handleCloseCamera} className="w-40 aspect-video">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  className="w-full h-full"
                  screenshotFormat="image/jpeg"
                />
              </div>
            ) : (
              <div
                onClick={handleOpenCamera}
                className="w-40 aspect-video flex rounded-md justify-center items-center bg-gray-50"
              >
                Click for open camera
              </div>
            )} */}
          </div>
        )}
        {menuList.map((item, index) => (
          <Button
            size="icon"
            key={item.key}
            onClick={() => handleMenuClick(item.key)}
            className={cn(
              getPositionInArray(index, menuList.length) === "first" &&
                "rounded-l-[50%] rounded-r-md",
              getPositionInArray(index, menuList.length) === "last" &&
                "rounded-r-[50%] rounded-l-md",
              !isMenuActive(item.key) &&
                `bg-transparent text-black hover:bg-primary/5`
            )}
          >
            <item.icon size={20} />
          </Button>
        ))}
      </nav>
    </>
  );
};

export { Navbar };
