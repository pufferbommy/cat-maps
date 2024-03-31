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
      zoom={15}
      className="z-[49] w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={L.divIcon({
          html: "🐱",
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

{
  /* <Map
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
        /> */
}
{
  /* <Marker latitude={37.78} longitude={-122.41}>
          <div className="text-2xl">🐱</div>
          </Marker>
        </Map> */
}
