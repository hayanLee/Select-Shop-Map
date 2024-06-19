// 이거를 서버 상태 ? api로 바꾸면 괜찮을 듯
// 어떻게 해야할지 물어보기
const getImageUrl = (placeId) => {
  return `https://place.map.kakao.com/main/v/${placeId}`; // 결과가 json임 photo.photoList
};

const createMarker = (place, mapInstance, markersRef) => {
  // 마커 생성
  console.log('플레이스', place);
  const marker = new window.kakao.maps.Marker({
    map: mapInstance,
    position: new window.kakao.maps.LatLng(place.y, place.x)
  });

  // infowindow를 위한 content
  const content = `
    <div style="padding:5px;font-size:12px;">
      <strong>${place.place_name}</strong><br>
      <img src="${getImageUrl(place.id)}" style="width:100px;height:100px;"><br>
      ${place.road_address_name || place.address_name}<br>
      ☎️: ${place.phone}<br>
      <a href="${place.place_url}" target="_blank">상세정보</a>
    </div>
  `,
    iwRemoveable = true;

  const infowindow = new window.kakao.maps.InfoWindow({
    content,
    removable: iwRemoveable
  });

  window.kakao.maps.event.addListener(marker, 'click', () => {
    infowindow.open(mapInstance, marker);
  });

  markersRef.current.push(marker);
};

export const searchPlaces = (keyword, mapInstance, markersRef, setPlaces) => {
  console.log('searchPlaces 호출');
  // 장소 검색 객체 생성
  const ps = new window.kakao.maps.services.Places();

  // 키워드 검색 (검색어, 검색 완료 시 실행할 콜백함수)
  ps.keywordSearch(
    keyword,
    (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료 되었으면

        markersRef.current.forEach((marker) => marker.setMap(null)); // 기존에 저장된 마커 제거
        markersRef.current = []; // 새로운 마커 저장을 위해 빈 배열 만듦

        setPlaces(data); // 검색 결과를 Maps로 전달 (옆에 리스트로 보여주려고)

        // 검색 된 결과를 기준으로 지도 범위 재설정
        const bounds = new window.kakao.maps.LatLngBounds(); // 재설정할 범위를 가지고 있을 객체
        data.forEach((place) => {
          createMarker(place, mapInstance, markersRef); // 마커 생성
          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x)); // 위치 기억
        });

        mapInstance.setBounds(bounds); // 추가된 좌표들을 기준으로 지도 범위 재설정
      }
    }
    // { page: 10 }
  );
};
