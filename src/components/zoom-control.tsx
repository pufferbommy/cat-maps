"use client";

import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

import { Button } from "@/components/ui/button";

const ZoomControl = () => {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(map.getZoom());

  useEffect(() => {
    map.on("zoomend", () => {
      setZoom(map.getZoom());
    });
  }, [map]);

  return (
    <div className="flex flex-col">
      <Button
        className="w-8 h-8 rounded-b-none"
        disabled={zoom === map.getMaxZoom()}
        onClick={() => map.zoomIn()}
        size="icon"
      >
        <ZoomIn size={16} />
      </Button>
      <Button
        className="w-8 h-8 rounded-t-none"
        disabled={zoom === map.getMinZoom()}
        onClick={() => map.zoomOut()}
        size="icon"
      >
        <ZoomOut size={16} />
      </Button>
    </div>
  );
};

export default ZoomControl;
