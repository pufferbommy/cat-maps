import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MapContainer, TileLayer, AttributionControl } from "react-leaflet";

import { useGetAllCats } from "@/hooks/use-cats";
import CatMarker from "@/components/cat/cat-marker";
import MapControl from "@/components/map/components/map-control";

const Map = () => {
  const { theme } = useTheme();
  const { data: cats = [] } = useGetAllCats();

  const tileLayerUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      minZoom={2}
      className="z-[49] relative h-full w-full"
      zoomControl={false}
      attributionControl={false}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      maxBoundsViscosity={1}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url={tileLayerUrl}
      />
      <AttributionControl position="bottomleft" />
      <MapControl />
      <MarkerClusterGroup>
        {cats.map((cat) => (
          <CatMarker key={cat.id} cat={cat} />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
