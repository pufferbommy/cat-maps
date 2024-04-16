"use client";

import * as L from "leaflet";
import { Marker } from "react-leaflet";

interface CatMarkerProps {
  cat: {
    _id: string;
    description: string;
    latitude: number;
    longitude: number;
    comments: any[];
    imageUrl: string;
    createdByUser: {
      _id: string;
      displayName: string;
    };
    createdAt: string;
  };
}

const CatMarker = ({ cat }: CatMarkerProps) => {
  return (
    <Marker
      icon={L.divIcon({
        html: "<div class='text-4xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>🐱</div>",
      })}
      position={{
        lat: cat.latitude,
        lng: cat.longitude,
      }}
    />
  );
};

export default CatMarker;
