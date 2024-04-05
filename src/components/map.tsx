"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

import { useCats } from "@/hooks/useCats";
import CatMarker from "@/components/cat-marker";
import ZoomControl from "@/components/zoom-control";
import CurrentPositionMarker from "@/components/current-position-marker";

const Map = () => {
  const { cats } = useCats();

  return (
    <MapContainer
      center={{
        lat: 0,
        lng: 0,
      }}
      zoom={2}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      minZoom={2}
      maxZoom={16}
      className="z-[49] w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CurrentPositionMarker />
      <ZoomControl />
      {cats.map((cat) => (
        <CatMarker key={cat.id} cat={cat} />
      ))}
    </MapContainer>
  );
};

export default Map;
