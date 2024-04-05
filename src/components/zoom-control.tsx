"use client";

import { useState } from "react";
import { useMap } from "react-leaflet";
import { ZoomIn, ZoomOut } from "lucide-react";

import { Button } from "./ui/button";

const ZoomControl = () => {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(map.getZoom());

  const handleZoomClick = (type: "in" | "out") => {
    const oldZoom = map.getZoom();
    const newZoom = type === "in" ? oldZoom + 1 : oldZoom - 1;
    map.setZoom(newZoom);
    setZoom(newZoom);
  };

  return (
    <div className="z-[999] flex flex-col fixed top-12 right-0">
      <Button
        disabled={zoom === map.getMaxZoom()}
        onClick={() => handleZoomClick("in")}
        size="icon"
      >
        <ZoomIn />
      </Button>
      <Button
        disabled={zoom === map.getMinZoom()}
        onClick={() => handleZoomClick("out")}
        size="icon"
      >
        <ZoomOut />
      </Button>
    </div>
  );
};

export default ZoomControl;
