"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker } from "react-map-gl";

import { Navbar } from "@/components/ui/navbar";

export default function Home() {
  return (
    <main className="h-screen">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          zoom: 0,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        attributionControl={false}
      >
        <GeolocateControl
          fitBoundsOptions={{
            zoom: 15,
          }}
          position="top-right"
        />
        <Navbar />
        <Marker latitude={37.78} longitude={-122.41}>
          <div className="text-2xl">🐱</div>
        </Marker>
      </Map>
    </main>
  );
}
