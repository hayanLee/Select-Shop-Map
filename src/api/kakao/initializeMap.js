// 지도 초기화 -> 지도 객체 반환
export const initializeMap = async (lat, lon, mapContainerId, mapRef) => {
  const container = document.getElementById(mapContainerId); // 지도가 그려질 dom 요소

  if (container) {
    // dom 요소가 있으면 현재 위치를 지도 중심으로 설정
    const options = {
      center: new window.kakao.maps.LatLng(lat, lon),
      level: 5
    };
    const mapInstance = new window.kakao.maps.Map(container, options); // 지도 생성
    mapRef.current = mapInstance; // 현재 지도 객체

    // 현재 위치로 핑 찍기
    new window.kakao.maps.Marker({
      map: mapInstance,
      position: options.center
    });

    return mapInstance; // 생성한 지도 객체
  } else {
    // 지도 만들다 에러 발생시
    console.error(`Element with id ${mapContainerId} not found`);
  }
};
