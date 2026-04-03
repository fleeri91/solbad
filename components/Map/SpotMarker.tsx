"use client";

import { AdvancedMarker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";

export interface Spot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  isSunny?: boolean;
}

interface SpotMarkerProps {
  spot: Spot;
  selected?: boolean;
  onClick?: (spot: Spot) => void;
}

export function SpotMarker({ spot, selected = false, onClick }: SpotMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      ref={markerRef}
      position={{ lat: spot.lat, lng: spot.lng }}
      title={spot.name}
      onClick={() => onClick?.(spot)}
    >
      <div
        className={[
          "flex items-center justify-center",
          "w-9 h-9 rounded-full border-2 shadow-md",
          "text-lg transition-transform duration-150",
          selected
            ? "scale-125 border-blue-500 bg-white"
            : "scale-100 border-white bg-blue-500 hover:scale-110",
        ].join(" ")}
        aria-label={spot.name}
      >
        {spot.isSunny ? "☀️" : "🏊"}
      </div>
    </AdvancedMarker>
  );
}
