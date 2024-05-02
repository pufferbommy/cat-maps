"use client";

import { setFocusedCatId } from "@/store/cats";
import * as L from "leaflet";
import { Marker } from "react-leaflet";

const CatMarker = ({ cat }: { cat: Cat }) => {
  return (
    <Marker
      eventHandlers={{
        click: () => setFocusedCatId(cat._id),
      }}
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
