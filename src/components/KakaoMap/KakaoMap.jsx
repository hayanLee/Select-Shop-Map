import React, { useState, useEffect, useRef } from 'react';
import { useKakaoMapApi } from '../../api/KakaoApi';

const KakaoMap = ({ className }) => {
  const mapContainerId = 'map';
  const [keyword, setKeyword] = useState('소모품 샵');
  const [places, setPlaces] = useState([]);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const isInitialLoad = useRef(true);  // 처음 로드를 체크하는 플래그

  const initializeMap = (lat, lon) => {
    const container = document.getElementById(mapContainerId);
    if (container) {
      const options = {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 10
      };
      const mapInstance = new window.kakao.maps.Map(container, options);
      mapRef.current = mapInstance;

      new window.kakao.maps.Marker({
        map: mapInstance,
        position: new window.kakao.maps.LatLng(lat, lon)
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
        // 기존 마커 삭제
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // 검색 결과 상태 업데이트
        setPlaces(data);

        // 새 마커 추가
        data.forEach((place) => {
          const marker = new window.kakao.maps.Marker({
            map: mapInstance,
            position: new window.kakao.maps.LatLng(place.y, place.x)
          });

          // 이미지 URL 추출
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
            content: content
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
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        if (!mapRef.current) {
          const mapInstance = initializeMap(lat, lon);
          searchPlaces(keyword, mapInstance);
        } else if (isInitialLoad.current) {
          searchPlaces(keyword, mapRef.current);
          isInitialLoad.current = false; // 초기 로드 후 플래그 업데이트
        }
      }, (error) => {
        console.error("Error occurred while retrieving location:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useKakaoMapApi(loadMap);

  const handleSearch = (e) => {
    e.preventDefault();
    const newKeyword = e.target.elements.keyword.value;
    setKeyword(newKeyword);
  };

  useEffect(() => {
    if (!isInitialLoad.current && mapRef.current) {
      searchPlaces(keyword, mapRef.current);
    }
  }, [keyword]);

  return (
    <div className={`h-full w-full flex ${className}`}>
      <div className="w-1/4 h-full overflow-y-auto p-4 border-r border-gray-300">
        <form onSubmit={handleSearch} className="mb-4">
          <input 
            type="text" 
            name="keyword" 
            placeholder="검색어를 입력하세요" 
            className="border border-gray-300 rounded p-2 w-full mb-2"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white rounded p-2 w-full"
          >
            검색
          </button>
        </form>
        <ul>
          {places.map((place) => (
            <li key={place.id} className="mb-4 p-2 border-b border-gray-300">
              <h3 className="font-bold">{place.place_name}</h3>
              <p>{place.road_address_name || place.address_name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div id={mapContainerId} className="flex-1 h-full"></div>
    </div>
  );
};

export default KakaoMap;
