import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-8 h-8 rounded-b-none"
              disabled={zoom === map.getMaxZoom()}
              onClick={() => map.zoomIn()}
              size="icon"
              aria-label="zoom in button"
            >
              <ZoomIn size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Zoom in</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-8 h-8 rounded-t-none"
              disabled={zoom === map.getMinZoom()}
              onClick={() => map.zoomOut()}
              size="icon"
              aria-label="zoom out button"
            >
              <ZoomOut size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Zoom out</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ZoomControl;
