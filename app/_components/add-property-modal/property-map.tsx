"use client";

import { forwardRef } from "react";
import type { LatLngTuple, Map } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { createStyles } from "@mantine/core";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  COUNTRY_MAP_DEFAULT_ZOOM,
  COUNTRY_MAP_MAX_ZOOM,
  COUNTRY_MAP_MIN_ZOOM,
  MAP_TILE_LAYER_DARK,
  MAP_TILE_LAYER_LIGHT,
} from "@/utils/constants";

type Props = {
  center: LatLngTuple;
};
export type PropertyMapProps = Props;

export const PropertyMap = forwardRef<Map, Props>(function PropertyMap(
  props,
  ref
) {
  const { classes, center, tileLayerUrl } = usePropertyMap(props);

  return (
    <MapContainer
      ref={ref}
      className={classes.map}
      center={center}
      attributionControl={false}
      zoomControl={false}
      scrollWheelZoom={false}
      zoom={COUNTRY_MAP_DEFAULT_ZOOM}
      minZoom={COUNTRY_MAP_MIN_ZOOM}
      maxZoom={COUNTRY_MAP_MAX_ZOOM}
    >
      <TileLayer url={tileLayerUrl} />
    </MapContainer>
  );
});

function usePropertyMap({ center }: Props) {
  const { classes } = useStyles();
  const [{ isDarkTheme }] = useColorScheme();
  const tileLayerUrl = isDarkTheme ? MAP_TILE_LAYER_DARK : MAP_TILE_LAYER_LIGHT;

  return { classes, center, tileLayerUrl };
}

const useStyles = createStyles((theme) => ({
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: theme.radius.md,
  },
}));
