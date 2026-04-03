"use client";

import { useEffect, useRef } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer";
import type { Spot } from "./SpotMarker";

interface ClusteredMarkersProps {
  spots: Spot[];
  selectedId?: string | null;
  onSpotClick?: (spot: Spot) => void;
}

export function ClusteredMarkers({ spots, selectedId, onSpotClick }: ClusteredMarkersProps) {
  const map = useMap();
  const markerLib = useMapsLibrary("marker");
  const clustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map());

  // Create or destroy the clusterer when the map mounts/unmounts
  useEffect(() => {
    if (!map) return;

    clustererRef.current = new MarkerClusterer({
      map,
      algorithm: new SuperClusterAlgorithm({ radius: 80 }),
    });

    return () => {
      clustererRef.current?.clearMarkers();
      clustererRef.current = null;
    };
  }, [map]);

  // Sync markers whenever spots or selection changes
  useEffect(() => {
    if (!map || !clustererRef.current || !markerLib) return;

    // Remove markers that are no longer in spots
    const currentIds = new Set(spots.map((s) => s.id));
    for (const [id, marker] of markersRef.current) {
      if (!currentIds.has(id)) {
        clustererRef.current.removeMarker(marker);
        markersRef.current.delete(id);
      }
    }

    // Add or update markers
    const added: google.maps.marker.AdvancedMarkerElement[] = [];
    for (const spot of spots) {
      if (markersRef.current.has(spot.id)) continue;

      const pin = document.createElement("div");
      const isSelected = spot.id === selectedId;
      pin.className = [
        "flex items-center justify-center",
        "w-9 h-9 rounded-full border-2 shadow-md cursor-pointer",
        "text-lg transition-transform duration-150",
        isSelected
          ? "scale-125 border-blue-500 bg-white"
          : "scale-100 border-white bg-blue-500 hover:scale-110",
      ].join(" ");
      pin.textContent = spot.isSunny ? "☀️" : "🏊";
      pin.title = spot.name;

      const marker = new markerLib.AdvancedMarkerElement({
        position: { lat: spot.lat, lng: spot.lng },
        content: pin,
        title: spot.name,
      });

      marker.addListener("click", () => onSpotClick?.(spot));
      markersRef.current.set(spot.id, marker);
      added.push(marker);
    }

    if (added.length > 0) {
      clustererRef.current.addMarkers(added);
    }
  }, [map, markerLib, spots, selectedId, onSpotClick]);

  return null;
}
