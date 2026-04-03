"use client";

import { APIProvider, Map as GoogleMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { ClusteredMarkers } from "./ClusteredMarkers";
import type { Spot } from "./SpotMarker";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

interface MapProps {
  userLocation: { lat: number; lng: number } | null;
  spots?: Spot[];
  selectedSpotId?: string | null;
  onSpotClick?: (spot: Spot) => void;
  cluster?: boolean;
}

export function Map({
  userLocation,
  spots = [],
  selectedSpotId,
  onSpotClick,
  cluster = true,
}: MapProps) {
  const center = userLocation ?? { lat: 59.333, lng: 18.067 }; // fallback: Stockholm

  return (
    <APIProvider apiKey={API_KEY}>
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={center}
        defaultZoom={12}
        gestureHandling="greedy"
        disableDefaultUI={false}
        className="w-full h-full"
      >
        {/* User location pin */}
        {userLocation && (
          <AdvancedMarker position={userLocation} title="You are here">
            <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md ring-4 ring-blue-300/50" />
          </AdvancedMarker>
        )}

        {/* Spots — clustered or individual */}
        {cluster ? (
          <ClusteredMarkers
            spots={spots}
            selectedId={selectedSpotId}
            onSpotClick={onSpotClick}
          />
        ) : (
          spots.map((spot) => (
            <AdvancedMarker
              key={spot.id}
              position={{ lat: spot.lat, lng: spot.lng }}
              title={spot.name}
              onClick={() => onSpotClick?.(spot)}
            >
              <div
                className={[
                  "flex items-center justify-center w-9 h-9 rounded-full border-2 shadow-md text-lg cursor-pointer transition-transform duration-150",
                  spot.id === selectedSpotId
                    ? "scale-125 border-blue-500 bg-white"
                    : "scale-100 border-white bg-blue-500 hover:scale-110",
                ].join(" ")}
              >
                {spot.isSunny ? "☀️" : "🏊"}
              </div>
            </AdvancedMarker>
          ))
        )}
      </GoogleMap>
    </APIProvider>
  );
}
