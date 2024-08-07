import ZoomControl from "@/components/map/components/zoom-control";
import CurrentPositionMarker from "@/components/map/components/current-position-marker";

const MapControl = () => {
  return (
    <div className="z-[999] flex gap-2 flex-col absolute top-4 right-4">
      <ZoomControl />
      <CurrentPositionMarker />
    </div>
  );
};

export default MapControl;
