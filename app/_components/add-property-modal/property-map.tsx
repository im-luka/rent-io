"use client";

import { forwardRef } from "react";
import type { LatLngTuple, Map } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  COUNTRY_MAP_DEFAULT_ZOOM,
  COUNTRY_MAP_MAX_ZOOM,
  COUNTRY_MAP_MIN_ZOOM,
} from "@/utils/constants";

type Props = {
  center: LatLngTuple;
};
export type PropertyMapProps = Props;

export const PropertyMap = forwardRef<Map, Props>(function PropertyMap(
  { center },
  ref
) {
  return (
    <MapContainer
      ref={ref}
      center={center}
      attributionControl={false}
      zoomControl={false}
      scrollWheelZoom={false}
      zoom={COUNTRY_MAP_DEFAULT_ZOOM}
      minZoom={COUNTRY_MAP_MIN_ZOOM}
      maxZoom={COUNTRY_MAP_MAX_ZOOM}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        borderRadius: "8px",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
});
