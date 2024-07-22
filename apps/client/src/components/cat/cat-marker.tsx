"use client";

import * as L from "leaflet";
import { useContext } from "react";
import { Marker, useMap } from "react-leaflet";

import { ActiveCatContext } from "@/contexts/active-cat-context";

const icon = L.divIcon({
  html: "<div class='text-4xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>🐱</div>",
});

const CatMarker = ({ cat }: { cat: Cat }) => {
  const map = useMap();
  const activeCatContext = useContext(ActiveCatContext);

  return (
    <Marker
      eventHandlers={{
        click: () => {
          map.flyTo(
            [cat.latitude, cat.longitude],
            map.getZoom() > 12 ? map.getZoom() : 12
          );
          document.getElementById(`cat-${cat.id}`)?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          activeCatContext?.setId(cat.id);
        },
      }}
      icon={icon}
      position={[cat.latitude, cat.longitude]}
    />
  );
};

export default CatMarker;
