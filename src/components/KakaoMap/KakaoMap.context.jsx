import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { searchPlaces } from '../../api/kakao/searchPlaces';
import mainIcon from '../../assets/mainIcon.png';
import markerIcon from '../../assets/marker.png';

const KAKAO_KEY = import.meta.env.VITE_KAKAO_KEY;

const KakaoMapContext = createContext();

export const useKakaoMap = () => useContext(KakaoMapContext);

export function KakaoMapProvider({ children }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색어
  const [mapInstance, setKakaoMapInstance] = useState(null); // 지도 객체
  const [clusterer, setClusterer] = useState(null); // 클러스터
  const [geocoder, setGeocoder] = useState(null);
  const mapContainerElRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);
  const [regionAddress, setRegionAddress] = useState(''); // 지역 주소 저장
  const searchButtonRef = useRef(null); // 검색 버튼 참조

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

      // 주소-좌표 변환 객체
      const geocoder = new window.kakao.maps.services.Geocoder();
      setGeocoder(geocoder);

      // 클러스터 클릭 이벤트 등록
      window.kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
        const level = mapInstance.getLevel();
        mapInstance.setLevel(level - 2, { anchor: cluster.getCenter() }); // 적절한 레벨씩 확대
      });

      // 지도 클릭 했을 때 클릭 위치 좌표에 대한 주소 정보
      window.kakao.maps.event.addListener(mapInstance, 'idle', function () {
        searchDetailAddrFromCoords(geocoder, mapInstance.getCenter(), function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const roadAddress = result[0].address;
            console.log(roadAddress);
            const regionAddr = roadAddress ? `${roadAddress.region_3depth_name}` : '';
            // const regionAddr = roadAddress ? `${roadAddress.region_1depth_name} ${roadAddress.region_2depth_name}` : '';
            setRegionAddress(regionAddr);

            if (searchButtonRef.current) {
              searchButtonRef.current.style.display = 'block';
            }
          }
        });
      });
    }
  };

  const handleSearchButtonClick = () => {
    if (regionAddress) {
      setSearchKeyword(`${regionAddress} 소품샵`);
      if (searchButtonRef.current) {
        searchButtonRef.current.style.display = 'none';
      }
    }
  };

  // 좌표로 상세 주소 정보를 요청
  function searchDetailAddrFromCoords(geocoder, coords, callback) {
    console.log('>>>>', coords);
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

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
          title: place.place_name,
          image: new window.kakao.maps.MarkerImage(
            markerIcon, // 마커 이미지 URL
            new window.kakao.maps.Size(24, 35), // 마커 이미지 크기
            {
              offset: new window.kakao.maps.Point(12, 35) // 마커 이미지의 좌표
            }
          )
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
          console.log(`${place.place_url}`);
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

  return (
    <KakaoMapContext.Provider value={value}>
      {children}
      <div
        ref={searchButtonRef}
        className="absolute bottom-2 left-1/2 z-10 hidden -translate-x-1/2 transform cursor-pointer rounded border border-gray-300 bg-point p-4 shadow-lg"
        onClick={handleSearchButtonClick}
      >
        현재 지도에서 재검색
      </div>
    </KakaoMapContext.Provider>
  );
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

// async function getCurrentPosition() {
//   return new Promise((resolve, reject) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             lat: position.coords.latitude,
//             lon: position.coords.longitude
//           });
//         },
//         (error) => reject(error)
//       );
//     } else {
//       reject(new Error('Geolocation is not supported by this browser.'));
//     }
//   });
// }
