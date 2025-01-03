import { useEffect, useRef, useState, MutableRefObject } from 'react';
import { CityData } from '../types';
import { ZOOM } from '../types/constant';
import leaflet from 'leaflet';

type useMapProps = {
  mapRef: MutableRefObject<HTMLDivElement | null>;
  currentCity: CityData;
}

const setNewCenter = (
  map: leaflet.Map | null,
  currentCity: CityData
) => {
  if (map) {
    map.setView(
      {
        lat: currentCity.location.latitude,
        lng: currentCity.location.longitude,
      },
      ZOOM
    );
  }
};

export function useMap({mapRef, currentCity}: useMapProps) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: currentCity.location.latitude,
          lng: currentCity.location.longitude,
        },
        zoom: ZOOM,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    } else {
      setNewCenter(map, currentCity);
    }
  }, [map, mapRef, currentCity]);

  return map;
}
