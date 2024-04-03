"use client";
import Image from "next/image";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { isMobile } from "@/utils/device";
import { Button } from "@/components/ui/button";
import { getPositionInArray } from "@/utils/array";
import { MenuKey, menuList } from "@/constants/navbar";
import { Skeleton } from "./skeleton";

const Navbar = () => {
  const [menu, setMenu] = useState<MenuKey>("home");
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const cameraWrapperRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleMenuClick = (key: MenuKey) => {
    setMenu(key);
    if (menu !== "camera") {
      setIsCameraActive(false);
      setImageSrc(null);
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
    setImageSrc(null);
  };

  const handleCaptureClick = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImageSrc(imageSrc!);
    setIsCameraActive(false);
  };

  const handleUploadClick = () => {
    // upload image
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
            className="bg-white/50 fixed inset-0 z-[50]"
          />
        )}
      </AnimatePresence>
      <nav className="flex gap-1 fixed shadow-sm rounded-full bg-white p-2 z-[51] bottom-4 left-1/2 -translate-x-1/2">
        {isMenuActive("camera") && (
          <div className="absolute flex flex-col gap-4 items-center rounded-md p-4 bottom-full left-1/2 -translate-x-1/2 bg-white shadow-sm mb-4">
            <div
              ref={cameraWrapperRef}
              className="w-[75dvw] aspect-square rounded-md overflow-hidden relative md:w-[50dvw] max-w-[500px]"
            >
              {!imageSrc ? (
                <>
                  {!isCameraActive && <Skeleton className="w-full h-full" />}
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
                <Image src={imageSrc} alt="" fill />
              )}
            </div>
            {!imageSrc ? (
              <div
                className={`grid ${isMobile() ? "grid-cols-2" : "grid-cols-1"} gap-4 w-full`}
              >
                {isMobile() && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={toggleFacingMode}
                  >
                    Switch Camera
                  </Button>
                )}
                <Button size="lg" onClick={handleCaptureClick}>
                  Capture
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button size="lg" variant="outline" onClick={handleRetakeClick}>
                  Retake
                </Button>
                <Button size="lg" onClick={handleUploadClick}>
                  Upload
                </Button>
              </div>
            )}
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
