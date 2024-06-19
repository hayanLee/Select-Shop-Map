import React, { useEffect, useRef } from 'react';
import { initializeMap } from '../../api/kakao/initializeMap';
import { searchPlaces } from '../../api/kakao/searchPlaces';

// 컴포넌트 자체 (지도 로드 + 검색)

const loadMap = async (keyword, mapRef, markersRef, setPlaces, mapContainerId) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도

        if (!mapRef.current) {
          const mapInstance = await initializeMap(lat, lon, mapContainerId, mapRef); // 지도 초기화
          await searchPlaces(keyword, mapInstance, markersRef, setPlaces); // 장소 검색
        } else {
          await searchPlaces(keyword, mapRef.current, markersRef, setPlaces);
        }
      },
      (error) => {
        console.error('위치 검색 에러:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

const MapContainer = ({ keyword, setPlaces, mapContainerId }) => {
  const mapRef = useRef(null); // 현재 지도 객체
  const markersRef = useRef([]);

  // 키워드가 변경되면 로드맵
  useEffect(() => {
    (async () => await loadMap(keyword, mapRef, markersRef, setPlaces, mapContainerId))();
  }, [keyword]);

  return <div id={mapContainerId} className="h-full flex-1"></div>;
};

export default MapContainer;
