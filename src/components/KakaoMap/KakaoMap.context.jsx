import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { searchPlaces } from '../../api/kakao/searchPlaces';

const KakaoMapContext = createContext();

export const useKakaoMap = () => useContext(KakaoMapContext);

export function KakaoMapProvider({ children }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('홍대 소품샵');
  const [mapInstance, setKakaoMapInstance] = useState(null);
  const mapContainerElRef = useRef(null);

  const { data: places = [] } = useQuery({
    queryKey: ['places', { searchKeyword }],
    queryFn: () => searchPlaces(searchKeyword)
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
    (async () => {
      if (isMapLoaded && mapContainerElRef.current) {
        const { lat, lon } = await getCurrentPosition();

        const options = {
          center: new window.kakao.maps.LatLng(lat, lon),
          level: 5
        };
        const mapInstance = new window.kakao.maps.Map(mapContainerElRef.current, options); // 지도 생성
        setKakaoMapInstance(mapInstance); // 현재 지도 객체

        // // 현재 위치로 핑 찍기 🔥
        // new window.kakao.maps.Marker({
        //   map: mapInstance,
        //   position: options.center
        // });
      }
    })();
  }, [isMapLoaded]);

  const value = {
    searchKeyword,
    setSearchKeyword,
    mapInstance,
    places,
    mapContainerElRef
  };

  return <KakaoMapContext.Provider value={value}>{children}</KakaoMapContext.Provider>;
}

function loadKakaoMapSDK(onLoadCallback) {
  const script = document.createElement('script');
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=cb8906a483c5671f6f94b58a926ef09c&autoload=false&libraries=services`;
  script.async = true;
  document.head.appendChild(script);

  // 스크립트 로드 성공
  script.onload = onLoadCallback;

  // 스크립트 로드 실패
  script.onerror = () => {
    console.error('Failed to load Kakao Maps API script');
  };
}

async function getCurrentPosition() {
  const promise = new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 위도
          const lon = position.coords.longitude; // 경도

          resolve({ lat, lon });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });

  const currentPosition = await promise;

  return currentPosition;
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
