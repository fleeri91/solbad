"use client";

import { useState } from "react";
import { Map } from "@/components/Map";
import type { Spot } from "@/components/Map";
import { useGeolocation } from "@/lib/useGeolocation";

const DEMO_SPOTS: Spot[] = [
  { id: "1", name: "Långholmen", lat: 59.3208, lng: 18.0275, isSunny: true },
  { id: "2", name: "Smedsuddsbadet", lat: 59.3254, lng: 18.0072, isSunny: false },
  { id: "3", name: "Ralambshovsparken", lat: 59.3318, lng: 18.0072, isSunny: true },
];

export default function Page() {
  const { lat, lng, loading, error } = useGeolocation();
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  const userLocation = lat && lng ? { lat, lng } : null;

  return (
    <main className="relative w-full h-screen">
      {/* Map fills the screen */}
      <div className="absolute inset-0">
        <Map
          userLocation={userLocation}
          spots={DEMO_SPOTS}
          selectedSpotId={selectedSpot?.id}
          onSpotClick={setSelectedSpot}
          cluster={true}
        />
      </div>

      {/* Status overlay */}
      {(loading || error) && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 rounded-lg px-4 py-2 shadow text-sm">
          {loading && "Getting your location…"}
          {error && `Location unavailable: ${error}`}
        </div>
      )}

      {/* Selected spot card */}
      {selectedSpot && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-6 py-4 w-72">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-base">{selectedSpot.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {selectedSpot.isSunny ? "☀️ Sunny" : "🏊 Spot"}
              </p>
            </div>
            <button
              onClick={() => setSelectedSpot(null)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
