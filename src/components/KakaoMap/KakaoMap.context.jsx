import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { searchPlaces } from '../../api/kakao/searchPlaces';
import mainIcon from '../../assets/mainIcon.png';
const KAKAO_KEY = import.meta.env.VITE_KAKAO_KEY;

const KakaoMapContext = createContext();

export const useKakaoMap = () => useContext(KakaoMapContext);

export function KakaoMapProvider({ children }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('홍대 소품샵'); // 검색어
  const [mapInstance, setKakaoMapInstance] = useState(null); // 지도 객체
  const [clusterer, setClusterer] = useState(null); // 클러스터
  const mapContainerElRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);

  const { data: places = [] } = useQuery({
    queryKey: ['places', { searchKeyword }],
    queryFn: () => searchPlaces(searchKeyword),
    enabled: isMapLoaded
  });

  // SDK 불러오기
  useEffect(() => {
    loadKakaoMapSDK(() => setIsSDKLoaded(true));
  }, []);

  // 지도 불러오기
  useEffect(() => {
    if (isSDKLoaded) {
      window.kakao.maps.load(() => setIsMapLoaded(true));
    }
  }, [isSDKLoaded]);

  // 지도에 현재 위치를 중심으로 지도 생성
  useEffect(() => {
    initializeMap();
  }, [isMapLoaded]);

  useEffect(() => {
    if (mapInstance && places.length) createMarkersAndClusters();
  }, [places]);

  const initializeMap = async () => {
    if (isMapLoaded && mapContainerElRef.current) {
      // const { lat, lon } = await getCurrentPosition();
      const options = {
        center: new window.kakao.maps.LatLng(37.5666, 126.9782), // 서울로 설정
        // center: new window.kakao.maps.LatLng(lat, lon),
        level: 5
      };

      // mapInstance = 지도
      const mapInstance = new window.kakao.maps.Map(mapContainerElRef.current, options);
      setKakaoMapInstance(mapInstance);

      // 클러스터러 초기화
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: mapInstance,
        averageCenter: true,
        minLevel: 6
      });

      setClusterer(clusterer);

      // 클러스터 클릭 이벤트 등록
      window.kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
        const level = mapInstance.getLevel();
        mapInstance.setLevel(level - 2, { anchor: cluster.getCenter() }); // 적절한 레벨씩 확대
      });
    }
  };

  // 마커를 생성하는 함수
  const createMarkers = () => {
    if (mapInstance && places.length) {
      clearMarkers();
      const bounds = new window.kakao.maps.LatLngBounds(); // 바운드 객체

      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);

        // 반복문 돌면서 마커 객체 만들기
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          title: place.place_name
        });

        const content = `
        <div style="padding:16px; background-color:white; border:1px solid #d1d5db; border-radius:12px; max-width:400px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1);">
          <h4 style="font-weight:bold; font-size:1.125rem; margin-bottom:8px;">${place.place_name}</h4>
          <img src="${mainIcon}" alt="${place.place_name}" style="margin-bottom:8px; width:100%; height:100%; display:flex; border-radius:8px; "/>
          <p style="font-size:0.875rem; color:#6b7280;">${place.road_address_name || place.address_name}</p>
          <p style="font-size:0.875rem; color:#6b7280;">${place.phone ? '☎️: ' + place.phone : '전화번호 정보 없음'}</p>
          <a href="${place.place_url}" target="_blank" style="color:#3b82f6; text-decoration:underline; margin-top:8px; display:block;">상세정보</a>
        </div>
      `;

        // 인포윈도우 객체 생성
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
  };

  // 클러스터러를 생성하는 함수
  const createClusters = () => {
    if (clusterer && markersRef.current.length) {
      clusterer.clear(); // 클러스터러 초기화

      // 마커를 맵에 바로 그리지 않고, 클러스터러에 추가
      clusterer.addMarkers(markersRef.current);

      window.kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
        const level = mapInstance.getLevel();
        mapInstance.setLevel(level - 2, { anchor: cluster.getCenter() }); // 적절한 레벨씩 확대
      });
    }
  };

  // 두 함수를 호출하는 함수
  const createMarkersAndClusters = () => {
    createMarkers();
    createClusters();
  };

  // 마커 지우기
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    // clusterer.clear(); // 원본 코드
    clusterer.clear(); // 클러스터러 지우기
    markersRef.current = [];
    infoWindowsRef.current.forEach((infowindow) => infowindow.close());
    infoWindowsRef.current = [];
  };

  const value = {
    searchKeyword,
    setSearchKeyword,
    mapInstance,
    places,
    mapContainerElRef,
    isMapLoaded // 로딩 상태 추가
  };

  return <KakaoMapContext.Provider value={value}>{children}</KakaoMapContext.Provider>;
}

function loadKakaoMapSDK(onLoadCallback) {
  const script = document.createElement('script');
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services,clusterer`;
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

// function getCurrentAddress({ lat, lon }) {
//   axios
//     .get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lat}&y=${lon}`, {
//       headers: { Authorization: `KakaoAK ${KAKAO_KEY}` }
//     })
//     .then((result) => {
//       //법정동 기준으로 동단위의 값을 가져온다
//       // let location = result.documents[0].region_3depth_name;
//       console.log(result);
//     });
// }
