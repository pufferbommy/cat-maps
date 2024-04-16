"use client";

import Image from "next/image";
import Webcam from "react-webcam";
import { CameraIcon, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { isMobile } from "@/utils/device";
import { Badge } from "@/components/ui/badge";

const Camera = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [image, setImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const cameraWrapperRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);

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

  useEffect(() => {
    const handleResize = () => {
      setWidth(cameraWrapperRef.current?.clientWidth!);
      setHeight(cameraWrapperRef.current?.clientHeight!);
    };

    handleResize();

    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full z-50"
      >
        <CameraIcon size={20} />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              onClick={() => setIsOpen(false)}
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
            <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[50]">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex flex-col rounded-md p-4 items-end bg-white shadow-sm"
              >
                <div className="mb-2 w-full flex justify-between">
                  <Badge variant="outline">
                    {width} x {height}
                  </Badge>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="w-5 h-5 rounded-full"
                    variant="destructive"
                    size="icon"
                  >
                    <X size={14} />
                  </Button>
                </div>
                <div
                  ref={cameraWrapperRef}
                  className="w-[75dvw] mb-4 aspect-square rounded-md overflow-hidden relative md:w-[50dvw] max-w-[500px]"
                >
                  {!image ? (
                    <>
                      {!isCameraActive && (
                        <Skeleton className="w-full h-full" />
                      )}
                      <Webcam
                        id="webcam"
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
                    className={`grid ${isMobile() ? "grid-cols-2" : "grid-cols-1"} gap-2 w-full`}
                  >
                    {isMobile() && (
                      <Button variant="outline" onClick={toggleFacingMode}>
                        Switch Camera
                      </Button>
                    )}
                    <Button onClick={handleCaptureClick}>Capture</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant="outline" onClick={handleRetakeClick}>
                      Retake
                    </Button>
                    <Button onClick={handleUploadClick}>Upload</Button>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Camera;
