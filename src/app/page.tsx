"use client";
import Map, { GeolocateControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Webcam from "react-webcam";
import { useRef, useState } from "react";

export default function Home() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleTakePhoto = () => {
    setIsCameraOpen((prev) => !prev);
  };

  return (
    <main className="h-screen">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          zoom: 0,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        attributionControl={false}
      >
        <GeolocateControl position="top-right" />
        {isCameraOpen && (
          <Webcam
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        )}
        <Button
          onClick={handleTakePhoto}
          className="absolute h-12 w-12 rounded-full right-4 bottom-4"
        >
          <Camera />
        </Button>
      </Map>
    </main>
  );
}
