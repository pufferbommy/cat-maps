"use client";

import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import ZoomControl from "@/components/zoom-control";
import CurrentPositionMarker from "@/components/current-position-marker";

const Map = () => {
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
      <Marker
        icon={L.divIcon({
          html: "<div class='text-4xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>🐱</div>",
        })}
        position={{
          lat: 51.505,
          lng: -0.09,
        }}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CurrentPositionMarker />
      <ZoomControl />
    </MapContainer>
  );
};

export default Map;
