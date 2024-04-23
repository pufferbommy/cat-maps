"use client";

import "leaflet/dist/leaflet.css";
import { useStore } from "@nanostores/react";
import { MapContainer, TileLayer, AttributionControl } from "react-leaflet";

import MapControl from "@/components/map-control";
import { $previewCats } from "@/store/preview-cats";
import PreviewCatMarker from "@/components/preview-cat-marker";

const Map = () => {
  const previewCats = useStore($previewCats);

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
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AttributionControl position="bottomleft" />
      <MapControl />
      {previewCats.map((previewCat) => (
        <PreviewCatMarker key={previewCat._id} previewCat={previewCat} />
      ))}
    </MapContainer>
  );
};

export default Map;
