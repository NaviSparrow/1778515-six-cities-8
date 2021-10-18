import React, {useEffect} from 'react';
import {useRef} from 'react';
import leaflet from 'leaflet';
import {Offer} from '../../types/offer';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';

type MapProps = {
  offers: Offer[];
  activeOffer:Offer | undefined;
}

function Map(props: MapProps): JSX.Element {
  const {offers, activeOffer} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0].city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {icon: (offer.id === activeOffer?.id)
            ? currentCustomIcon
            : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, activeOffer]);

  return (
    <div
      style={{height: '762px'}}
      ref={mapRef}
    >
    </div>);
}

export default Map;
