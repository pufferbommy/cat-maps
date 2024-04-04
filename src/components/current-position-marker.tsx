import * as L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";

import { Button } from "./ui/button";
import { LocateFixed, LocateOff } from "lucide-react";

const CurrentPositionMarker = () => {
  const fg = useRef(L.featureGroup());
  const [isSearchable, setIsSearchable] = useState(false);
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });

  const map = useMap();

  const handleToggleSearchClick = () => {
    setIsSearchable((prev) => !prev);
  };

  useEffect(() => {
    if (!isSearchable) {
      fg.current.clearLayers();
      return;
    }

    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 16);
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius * 0.5);
      const outerCircle = L.circle(e.latlng, radius);
      fg.current.addLayer(circle);
      fg.current.addLayer(outerCircle);
      map.addLayer(fg.current);
    });
  }, [map, isSearchable]);

  return (
    <>
      <Button
        onClick={handleToggleSearchClick}
        className="z-[999] fixed top-0 left-0"
        size="icon"
      >
        {isSearchable ? <LocateFixed size={16} /> : <LocateOff size={16} />}
      </Button>
      {isSearchable && <Marker position={position} />}
    </>
  );
};

export default CurrentPositionMarker;
