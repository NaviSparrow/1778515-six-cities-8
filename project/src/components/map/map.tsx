import React, {useEffect} from 'react';
import {useRef} from 'react';
import leaflet, {LayerGroup, Marker} from 'leaflet';
import {Offer} from '../../types/offer';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';

type MapProps = {
  offers: Offer[];
  activeOffer: Offer | null;
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

  const markerGroup = new LayerGroup();

  const center = {
    lat: offers[0].city.location.latitude,
    lng: offers[0].city.location.longitude,
  };

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {icon: (offer.id === activeOffer?.id)
          ? currentCustomIcon
          : defaultCustomIcon,
        });
        marker.addTo(markerGroup);
      });
      markerGroup.addTo(map);
    }
    return () => {markerGroup.remove();};
  }, [map, offers, activeOffer]);

  useEffect(() => {
    map?.setView(center);
  }, [center, map]);

  return (
    <section className="cities__map map">
      <div
        style={{height: '762px'}}
        ref={mapRef}
      >
      </div>
    </section>);
}

export default Map;
