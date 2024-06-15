"use client";

import "leaflet/dist/leaflet.css";
import { useStore } from "@nanostores/react";
import { MapContainer, TileLayer, AttributionControl } from "react-leaflet";

import { $cats } from "@/store/cats";
import CatMarker from "@/components/cat/cat-marker";
import MapControl from "@/components/map/map-control";

const Map = () => {
  const cats = useStore($cats);

  // Define the maximum bounds
  const maxBounds: any = [
    // [South, West], [North, East]
    [-90, -180], // South West
    [90, 180], // North East
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
      className="z-[49] w-full h-full relative"
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
      {cats.map((cat) => (
        <CatMarker key={cat._id} cat={cat} />
      ))}
    </MapContainer>
  );
};

export default Map;
