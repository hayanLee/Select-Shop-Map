import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { searchPlaces } from '../../api/kakao/searchPlaces';
import Marker from '../Marker/Marker';

const KakaoMapContext = createContext();

export const useKakaoMap = () => useContext(KakaoMapContext);

export function KakaoMapProvider({ children }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('홍대 소품샵');
  const [mapInstance, setKakaoMapInstance] = useState(null);
  const mapContainerElRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);

  const { data: places = [], isSuccess } = useQuery({
    queryKey: ['places', { searchKeyword }],
    queryFn: () => searchPlaces(searchKeyword),
    enabled: isMapLoaded
  });

  useEffect(() => {
    loadKakaoMapSDK(() => setIsSDKLoaded(true));
  }, []);

  useEffect(() => {
    if (isSDKLoaded) {
      window.kakao.maps.load(() => setIsMapLoaded(true));
    }
  }, [isSDKLoaded]);

  useEffect(() => {
    const initializeMap = async () => {
      if (isMapLoaded && mapContainerElRef.current) {
        const { lat, lon } = await getCurrentPosition();
        const options = {
          center: new window.kakao.maps.LatLng(lat, lon),
          level: 5
        };
        const mapInstance = new window.kakao.maps.Map(mapContainerElRef.current, options);
        setKakaoMapInstance(mapInstance);

        const currentMarker = new window.kakao.maps.Marker({
          map: mapInstance,
          position: options.center
        });

        window.kakao.maps.event.addListener(currentMarker, 'click', () => {
          console.log('Current location marker clicked!');
        });
      }
    };

    initializeMap();
  }, [isMapLoaded]);

  useEffect(() => {
    if (mapInstance && places.length) {
      clearMarkers();
      const bounds = new window.kakao.maps.LatLngBounds();
      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
          map: mapInstance,
          position: markerPosition,
          title: place.place_name
        });

        const content = `
          <div style="padding:16px; background-color:white; border:1px solid #d1d5db; border-radius:12px; max-width:400px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1);">
            <h4 style="font-weight:bold; font-size:1.125rem; margin-bottom:8px;">${place.place_name}</h4>
            <img src="path/to/your/image.jpg" alt="${place.place_name}" style="margin-bottom:8px; width:100%; height:128px; object-fit:cover; border-radius:8px;"/>
            <p style="font-size:0.875rem; color:#6b7280;">${place.road_address_name || place.address_name}</p>
            <p style="font-size:0.875rem; color:#6b7280;">${place.phone ? '☎️: ' + place.phone : '전화번호 정보 없음'}</p>
            <a href="${place.place_url}" target="_blank" style="color:#3b82f6; text-decoration:underline; margin-top:8px; display:block;">상세정보</a>
          </div>
        `;

        const infowindow = new window.kakao.maps.InfoWindow({
          content: content,
          removable: true,
          zIndex: 1
        });

        const handleMarkerClick = () => {
          infoWindowsRef.current.forEach((iw) => iw.close());
          infowindow.open(mapInstance, marker);

          // 인포윈도우의 기본 스타일을 직접 제거
          const iwElement = infowindow.a;
          if (iwElement) {
            iwElement.style.border = 'none';
            iwElement.style.background = 'none';
            iwElement.style.boxShadow = 'none';
          }
        };

        window.kakao.maps.event.addListener(marker, 'click', handleMarkerClick);

        markersRef.current.push(marker);
        infoWindowsRef.current.push(infowindow);

        bounds.extend(markerPosition);
      });

      mapInstance.setBounds(bounds);
    }
  }, [mapInstance, places]);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    infoWindowsRef.current.forEach((infowindow) => infowindow.close());
    infoWindowsRef.current = [];
  };

  const value = {
    searchKeyword,
    setSearchKeyword,
    mapInstance,
    places,
    mapContainerElRef
  };

  return (
    <KakaoMapContext.Provider value={value}>
      {children}
      {isSuccess &&
        mapInstance &&
        places.map((place) => (
          <Marker
            key={place.id}
            place={place}
            mapInstance={mapInstance}
            markersRef={markersRef}
            infoWindowsRef={infoWindowsRef}
          />
        ))}
    </KakaoMapContext.Provider>
  );
}

function loadKakaoMapSDK(onLoadCallback) {
  const script = document.createElement('script');
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=cb8906a483c5671f6f94b58a926ef09c&autoload=false&libraries=services`;
  script.async = true;
  script.onload = onLoadCallback;
  script.onerror = () => {
    console.error('Failed to load Kakao Maps API script');
  };
  document.head.appendChild(script);
}

async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => reject(error)
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

// 컴포넌트 자체 (지도 로드 + 검색)

// useQuery (keyword를 queryKey,
// or "searchPlaces"✨ <- queryFn

// 하나의 함수느 ㄴ하나의 작업
// 이름은 명시화
// makemarkersonMap, placeonmakersonmap(place, mapinstance)
// const loadMap = async (isMapLoaded, keyword, mapRef, markersRef, setPlaces, mapContainerId) => {
//   console.log('mapRef', mapRef);

// markersRef.current.forEach((marker) => marker.setMap(null)); // 기존에 저장된 마커 제거
//         markersRef.current = []; // 새로운 마커 저장을 위해 빈 배열 만듦

//         setPlaces(data); // 검색 결과를 Maps로 전달 (옆에 리스트로 보여주려고)

//         // 검색 된 결과를 기준으로 지도 범위 재설정
//         const bounds = new window.kakao.maps.LatLngBounds(); // 재설정할 범위를 가지고 있을 객체
//         data.forEach((place) => {
//           createMarker(place, mapInstance, markersRef); // 마커 생성
//           bounds.extend(new window.kakao.maps.LatLng(place.y, place.x)); // 위치 기억
//         });

//         mapInstance.setBounds(bounds); // 추가된 좌표들을 기준으로 지도 범위 재설정
