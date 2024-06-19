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

// 🔥 52~64 -> 마커찍는거라 분리
// 나머지를 useQuery (Fn)
export const searchPlaces = async (keyword) => {
  const ps = new window.kakao.maps.services.Places();
  const promise = new Promise((resolve) => {
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(data);
      }
    });
  });
  const places = await promise;

  return places;
};
