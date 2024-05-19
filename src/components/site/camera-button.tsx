"use client";

import Image from "next/image";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { CameraIcon, SwitchCamera } from "lucide-react";
import { useStore } from "@nanostores/react";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { $profile } from "@/store/profile";
import * as catsService from "@/services/cats";
import { setFullLoader } from "@/store/full-loader";
import { Dialog, DialogContent } from "../ui/dialog";
import whiteAndBrownCatLyingOnFloor from "@/images/white-and-brown-cat-lying-on-floor.jpg";
import LoginRequiredAlertDialog from "../auth/login-required-dialog";
import { setCats } from "@/store/cats";

const CameraButton = () => {
  const profile = useStore($profile);

  const [isUploading, setIsUploading] = useState(false);

  const isMobile =
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const fileInput = useRef<HTMLInputElement>(null);

  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoginRequiredDialogOpen, setIsLoginRequiredDialogOpen] =
    useState(false);

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
        const cats = await catsService.getCats();
        setCats(cats || []);
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
        aria-label="camera button"
        onClick={() => {
          if (!profile) {
            setIsLoginRequiredDialogOpen(true);
            return;
          }
          setOpen(true);
        }}
        size="icon"
        className="fixed w-14 h-14 bottom-4 right-4 rounded-full z-50"
      >
        <CameraIcon size={20} />
      </Button>
      <DialogContent className="w-[75dvw] max-w-[500px] md:w-[50dvw]">
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
          <div className="flex justify-between">
            <input
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setImage(reader.result as string);
                  };
                }
              }}
              ref={fileInput}
              type="file"
              accept="image/*"
              hidden
            />
            <Button
              onClick={() => {
                if (fileInput.current) {
                  fileInput.current.click();
                }
              }}
              variant="unstyled"
            >
              <Image
                width={44}
                className="aspect-square object-cover rounded-md"
                src={whiteAndBrownCatLyingOnFloor}
                alt="White and brown cat lying on floor"
              />
            </Button>
            <Button
              className="w-12 h-12 bg-gradient-to-br rounded-full from-orange-500 to-pink-500 outline outline-white outline-3 after:bg-gradient-to-br after:rounded-full after:from-orange-500 after:to-pink-500 after:-inset-1 after:absolute relative after:-z-10"
              onClick={handleCaptureClick}
              aria-label="capture button"
            />
            <Button
              disabled={!isMobile}
              size="icon"
              variant="secondary"
              onClick={toggleFacingMode}
            >
              <SwitchCamera className="w-4 h-4" />
            </Button>
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
      <LoginRequiredAlertDialog
        description="You need to login to upload a cat."
        isAlertDialogOpen={isLoginRequiredDialogOpen}
        setIsAlertDialogOpen={setIsLoginRequiredDialogOpen}
      />
    </Dialog>
  );
};

export default CameraButton;
