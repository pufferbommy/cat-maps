"use client";

import Image from "next/image";
import axios from "@/lib/axios";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { CameraIcon } from "lucide-react";
import { useStore } from "@nanostores/react";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

import { $profile } from "@/store/profile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const Camera = () => {
  const profile = useStore($profile);

  const isMobile = () =>
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
    window.navigator.geolocation.getCurrentPosition(async (position) => {
      await axios.post("cats", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        image,
      });
      setOpen(false);
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
            alert("กรุณาเข้าสู่ระบบก่อนใช้งาน");
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
          <DialogTitle>กล้อง</DialogTitle>
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
                เปลี่ยนกล้อง
              </Button>
            )}
            <Button onClick={handleCaptureClick}>ถ่ายรูป</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" onClick={handleRetakeClick}>
              ถ่ายใหม่
            </Button>
            <Button onClick={handleUploadClick}>อัพโหลด</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Camera;
