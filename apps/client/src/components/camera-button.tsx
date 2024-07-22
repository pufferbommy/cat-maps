import Image from "next/image";
import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { CameraIcon } from "lucide-react";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useAddCat } from "@/hooks/use-cats";
import { Dialog, DialogContent } from "./ui/dialog";
import { useGetUserProfile } from "@/hooks/use-user";
import LoginRequiredAlertDialog, {
  LoginRequiredAlertDialogHandle,
} from "./auth/login-required-dialog";

const CameraButton = () => {
  const { data: userProfile, isLoading } = useGetUserProfile();

  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const cameraWrapperRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleRetakeClick = () => {
    setImage(null);
  };

  const handleCaptureClick = () => {
    const image = webcamRef.current?.getScreenshot()!;
    setImage(image);
    setIsCameraActive(false);
  };

  const addCat = useAddCat();

  const handleUploadClick = async () => {
    if (!image) return;
    window.navigator.geolocation.getCurrentPosition((position) => {
      const data: AddCatData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        image,
      };
      addCat.mutate(data);
      setOpen(false);
    });
  };

  const loginRequiredAlertDialogRef =
    useRef<LoginRequiredAlertDialogHandle>(null);

  const handleCameraClick = () => {
    if (!userProfile) {
      return loginRequiredAlertDialogRef.current?.open();
    }
    setOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <LoginRequiredAlertDialog
        ref={loginRequiredAlertDialogRef}
        description="You need to login to capture a cat"
      />
      <Button
        onClick={handleCameraClick}
        disabled={isLoading}
        className="fixed size-14 right-4 bottom-4 z-50 rounded-full"
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
              {/* <Webcam
                id="webcam"
                onLoadedData={() => setIsCameraActive(true)}
                audio={false}
                ref={webcamRef}
                className="w-full h-full"
                videoConstraints={{
                  facingMode: "environment",
                  width: 500,
                  height: 500,
                }}
                screenshotFormat="image/jpeg"
              /> */}
            </>
          ) : (
            <Image src={image} alt="" fill />
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 w-full h-12">
          {!image ? (
            <div className="col-span-2 flex justify-center">
              <Button
                className="w-12 h-12 bg-gradient-to-br rounded-full from-orange-500 to-pink-500 outline outline-white outline-3 after:bg-gradient-to-br after:rounded-full after:from-orange-500 after:to-pink-500 after:-inset-1 after:absolute relative after:-z-10"
                onClick={handleCaptureClick}
                aria-label="capture button"
              />
            </div>
          ) : (
            <>
              <Button variant="outline" onClick={handleRetakeClick}>
                Retake
              </Button>
              <Button onClick={handleUploadClick}>
                {addCat.isPending ? "Uploading..." : "Upload"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CameraButton;
