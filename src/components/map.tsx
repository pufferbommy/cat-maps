"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer
      center={{
        lat: 51.505,
        lng: -0.09,
      }}
      zoom={2}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      minZoom={2}
      className="z-[49] w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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
    </MapContainer>
  );
};

export default Map;
