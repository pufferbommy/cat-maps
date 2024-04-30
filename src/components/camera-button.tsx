"use client";

import Image from "next/image";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { CameraIcon } from "lucide-react";
import { useStore } from "@nanostores/react";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { $profile } from "@/store/profile";
import * as catsService from "@/services/cats";
import { setFullLoader } from "@/store/full-loader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const CameraButton = () => {
  const profile = useStore($profile);

  const [isUploading, setIsUploading] = useState(false);

  const isMobile =
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

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

  const handleUploadClick = async () => {
    if (!image) return;
    window.navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        setFullLoader(true);
        setIsUploading(true);
        await catsService.addCat({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          image,
        });
        setOpen(false);
      } catch (error) {
        console.error(error);
      } finally {
        setFullLoader(false);
        setIsUploading(false);
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setImage(null);
      }}
    >
      <Button
        onClick={() => {
          if (!profile) {
            alert("Please login first");
            return;
          }
          setOpen(true);
        }}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full z-50"
      >
        <CameraIcon size={20} />
      </Button>
      <DialogContent className="w-[75dvw] max-w-[500px] md:w-[50dvw]">
        <DialogHeader>
          <DialogTitle>{image ? "View Image" : "Take a picture"}</DialogTitle>
        </DialogHeader>
        <div
          ref={cameraWrapperRef}
          className="aspect-square rounded-md overflow-hidden relative "
        >
          {!image ? (
            <>
              {!isCameraActive && <Skeleton className="w-full h-full" />}
              <Webcam
                id="webcam"
                onLoadedData={() => setIsCameraActive(true)}
                mirrored={facingMode === "user" || !isMobile}
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
            className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-1"} gap-2 w-full`}
          >
            {isMobile && (
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
            <Button onClick={handleUploadClick}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CameraButton;
