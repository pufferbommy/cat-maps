import ZoomControl from "@/components/zoom-control";
import CurrentPositionMarker from "@/components/current-position-marker";

const MapControl = () => {
  return (
    <div className="z-[999] flex gap-2 flex-col fixed top-2 right-2">
      <ZoomControl />
      <CurrentPositionMarker />
    </div>
  );
};

export default MapControl;
