"use client";

import Image from "next/image";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { isMobile } from "@/utils/device";
import { Button } from "@/components/ui/button";
import { getPositionInArray } from "@/utils/array";
import { Skeleton } from "@/components/ui/skeleton";
import { MenuKey, menuList } from "@/constants/navbar";

const Navbar = () => {
  const [menu, setMenu] = useState<MenuKey>("home");
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [image, setImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const cameraWrapperRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleMenuClick = (key: MenuKey) => {
    setMenu(key);
    if (menu !== "camera") {
      setIsCameraActive(false);
      setImage(null);
    }
  };

  const isMenuActive = useCallback((key: MenuKey) => menu === key, [menu]);

  const videoConstraints: MediaTrackConstraints = {
    facingMode,
    width: 500,
    height: 500,
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const handleRetakeClick = () => {
    setImage(null);
  };

  const handleCaptureClick = () => {
    const image = webcamRef.current?.getScreenshot()!;
    setImage(image);
    setIsCameraActive(false);
  };

  const handleUploadClick = () => {
    fetch("/api/cats", {
      method: "POST",
      body: JSON.stringify({
        image,
      }),
    }).then((response) => {
      console.log(response);
    });
  };

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
            className="bg-primary/25 fixed inset-0 z-[50]"
          />
        )}
      </AnimatePresence>
      <nav className="flex gap-1 fixed backdrop-blur rounded-full bg-primary p-2 z-[51] bottom-4 left-1/2 -translate-x-1/2">
        <AnimatePresence>
          {isMenuActive("camera") && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex flex-col rounded-md gap-4 p-4 items-center bg-primary shadow-sm mb-4"
              >
                <div
                  ref={cameraWrapperRef}
                  className="w-[75dvw] aspect-square rounded-md overflow-hidden relative md:w-[50dvw] max-w-[500px]"
                >
                  {!image ? (
                    <>
                      {!isCameraActive && (
                        <Skeleton className="w-full h-full" />
                      )}
                      <Webcam
                        onLoadedData={() => setIsCameraActive(true)}
                        mirrored={facingMode === "user" || !isMobile()}
                        audio={false}
                        ref={webcamRef}
                        className="w-full h-full "
                        videoConstraints={videoConstraints}
                        screenshotFormat="image/jpeg"
                      />
                    </>
                  ) : (
                    <Image src={image} alt="" fill />
                  )}
                </div>
                {!image ? (
                  <div
                    className={`grid ${isMobile() ? "grid-cols-2" : "grid-cols-1"} gap-4 w-full`}
                  >
                    {isMobile() && (
                      <Button onClick={toggleFacingMode}>Switch Camera</Button>
                    )}
                    <Button variant="secondary" onClick={handleCaptureClick}>
                      Capture
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Button onClick={handleRetakeClick}>Retake</Button>
                    <Button variant="secondary" onClick={handleUploadClick}>
                      Upload
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
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
              isMenuActive(item.key) && "bg-white/15 hover:bg-white/15"
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
