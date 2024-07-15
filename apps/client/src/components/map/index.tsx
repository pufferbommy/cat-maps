"use client";

import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, AttributionControl } from "react-leaflet";

import CatMarker from "@/components/cat/cat-marker";
import MapControl from "@/components/map/components/map-control";
import { useCatQuery } from "@/hooks/use-cat-query";

const Map = () => {
  const { data: cats } = useQuery(useCatQuery());

  const maxBounds: any = [
    [-90, -180],
    [90, 180],
  ];

  return (
    <MapContainer
      center={{
        lat: 0,
        lng: 0,
      }}
      zoom={2}
      minZoom={2}
      maxZoom={16}
      className="z-[49] relative h-full w-full"
      zoomControl={false}
      attributionControl={false}
      maxBounds={maxBounds}
      maxBoundsViscosity={1}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <AttributionControl position="bottomleft" />
      <MapControl />
      {cats?.map((cat) => <CatMarker key={cat.id} cat={cat} />)}
    </MapContainer>
  );
};

export default Map;
