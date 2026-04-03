"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface GeolocationState {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  timestamp: number | null;
  error: string | null;
  loading: boolean;
}

interface UseGeolocationOptions extends PositionOptions {
  watch?: boolean;
}

const defaultOptions: UseGeolocationOptions = {
  enableHighAccuracy: false,
  timeout: 10_000,
  maximumAge: 0,
  watch: false,
};

export function useGeolocation(
  options: UseGeolocationOptions = defaultOptions,
): GeolocationState & { refetch: () => void } {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    accuracy: null,
    timestamp: null,
    error: null,
    loading: true,
  });

  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  });

  const onSuccess = useCallback((position: GeolocationPosition) => {
    setState({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
      error: null,
      loading: false,
    });
  }, []);

  const onError = useCallback((err: GeolocationPositionError) => {
    setState((s) => ({
      ...s,
      error: err.message,
      loading: false,
    }));
  }, []);

  const refetch = useCallback(() => {
    if (!navigator.geolocation) return;
    setState((s) => ({ ...s, loading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      optionsRef.current,
    );
  }, [onSuccess, onError]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((s) => ({
        ...s,
        error: "Geolocation is not supported by your browser",
        loading: false,
      }));
      return;
    }

    if (optionsRef.current.watch) {
      const watchId = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        optionsRef.current,
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }

    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      optionsRef.current,
    );
  }, [options.watch, onSuccess, onError]);

  return { ...state, refetch };
}
