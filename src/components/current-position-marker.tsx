import * as L from "leaflet";
import { useState } from "react";
import { Marker, useMap } from "react-leaflet";
import { LocateFixed, LocateOff } from "lucide-react";

import { Button } from "./ui/button";

const CurrentPositionMarker = () => {
  const [isSearchable, setIsSearchable] = useState(false);
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });

  const map = useMap();

  const handleToggleSearchClick = () => {
    const newIsSearchable = !isSearchable;
    setIsSearchable(newIsSearchable);
    if (newIsSearchable && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        map.flyTo(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          16
        );
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
      <Button
        onClick={handleToggleSearchClick}
        className="z-[999] fixed top-0 left-0"
        size="icon"
      >
        {isSearchable ? <LocateFixed size={16} /> : <LocateOff size={16} />}
      </Button>
      {isSearchable && <Marker position={position} icon={markerIcon} />}
    </>
  );
};

export default CurrentPositionMarker;
