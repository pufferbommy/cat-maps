"use client";

import * as L from "leaflet";
import { useState } from "react";
import { Marker, useMap } from "react-leaflet";
import { LocateFixed, LocateOff } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const CurrentPositionMarker = () => {
  const [isSearchable, setIsSearchable] = useState(false);
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [foundLocation, setFoundLocation] = useState(false);

  const map = useMap();

  const handleToggleSearchClick = () => {
    const newIsSearchable = !isSearchable;
    setIsSearchable(newIsSearchable);
    setFoundLocation(false);
    if (newIsSearchable && navigator.geolocation) {
      map.locate().on("locationfound", (e) => {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 16);
        setFoundLocation(true);
      });
    }
  };

  const markerIcon = L.divIcon({
    iconSize: [16, 16],
    className: `rounded-full after:bg-blue-500/25 after:absolute after:h-full after:w-full after:-z-10 after:animate-big-fade after:scale-[2] after:rounded-full`,
    html: "<div class='bg-blue-500 border-2 rounded-full border-white w-full h-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'></div>",
  });

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-8 h-8"
              onClick={handleToggleSearchClick}
              size="icon"
            >
              {isSearchable ? (
                <LocateFixed size={16} />
              ) : (
                <LocateOff size={16} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {isSearchable
              ? "Stop searching for current location"
              : "Search for current location"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {foundLocation && isSearchable && (
        <Marker position={position} icon={markerIcon} />
      )}
    </>
  );
};

export default CurrentPositionMarker;
