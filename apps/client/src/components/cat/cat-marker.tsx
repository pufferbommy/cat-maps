"use client";

import * as L from "leaflet";
import { Marker, useMap } from "react-leaflet";

import { setFocusedCatId } from "@/store/cats";

const icon = L.divIcon({
  html: "<div class='text-4xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>🐱</div>",
});

const CatMarker = ({ cat }: { cat: Cat }) => {
  const map = useMap();

  const position = {
    lat: cat.latitude,
    lng: cat.longitude,
  };

  return (
    <Marker
      eventHandlers={{
        click: () => {
          setFocusedCatId(cat._id);
          map.flyTo(
            [cat.latitude, cat.longitude],
            map.getZoom() > 12 ? map.getZoom() : 12
          );
          document.getElementById(`cat-${cat._id}`)?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        },
      }}
      icon={icon}
      position={position}
    />
  );
};

export default CatMarker;
