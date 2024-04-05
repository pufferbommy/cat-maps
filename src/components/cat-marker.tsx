"use client";

import * as L from "leaflet";
import { Marker } from "react-leaflet";

interface CatMarkerProps {
  cat: {
    id: string;
    position: {
      lat: number;
      lng: number;
    };
  };
}

const CatMarker = ({ cat }: CatMarkerProps) => {
  return (
    <Marker
      icon={L.divIcon({
        html: "<div class='text-4xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>🐱</div>",
      })}
      position={cat.position}
    />
  );
};

export default CatMarker;
