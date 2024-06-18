import React, { useEffect, useRef } from 'react';

const MapContainer = ({ keyword, setPlaces, mapContainerId }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const initializeMap = (lat, lon) => {
    const container = document.getElementById(mapContainerId);
    if (container) {
      const options = {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 10,
      };
      const mapInstance = new window.kakao.maps.Map(container, options);
      mapRef.current = mapInstance;

      new window.kakao.maps.Marker({
        map: mapInstance,
        position: new window.kakao.maps.LatLng(lat, lon),
      });

      return mapInstance;
    } else {
      console.error(`Element with id ${mapContainerId} not found`);
    }
  };

  const searchPlaces = (keyword, mapInstance) => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        setPlaces(data);

        data.forEach((place) => {
          const marker = new window.kakao.maps.Marker({
            map: mapInstance,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          });

          const getImageUrl = (placeId) => {
            return `https://place.map.kakao.com/main/v/${placeId}`;
          };

          const content = `
            <div style="padding:5px;font-size:12px;">
              <strong>${place.place_name}</strong><br>
              <img src="${getImageUrl(place.id)}" style="width:100px;height:100px;"><br>
              ${place.road_address_name || place.address_name}<br>
              전화번호: ${place.phone}<br>
              <a href="${place.place_url}" target="_blank">상세정보</a>
            </div>
          `;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: content,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(mapInstance, marker);
          });

          markersRef.current.push(marker);
        });
      }
    });
  };

  const loadMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          if (!mapRef.current) {
            const mapInstance = initializeMap(lat, lon);
            searchPlaces(keyword, mapInstance);
          } else {
            searchPlaces(keyword, mapRef.current);
          }
        },
        (error) => {
          console.error('Error occurred while retrieving location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    loadMap();
  }, [keyword]);

  return <div id={mapContainerId} className="flex-1 h-full"></div>;
};

export default MapContainer;
