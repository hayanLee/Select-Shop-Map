// 이거를 서버 상태 ? api로 바꾸면 괜찮을 듯
// 어떻게 해야할지 물어보기
const getImageUrl = (placeId) => {
  return `https://place.map.kakao.com/main/v/${placeId}`; // 결과가 json임 photo.photoList
};

// 🔥 52~64 -> 마커찍는거라 분리
// 나머지를 useQuery (Fn)
export const searchPlaces = async (keyword) => {
  const ps = new window.kakao.maps.services.Places();
  const promise = new Promise((resolve) => {
    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(data);
        }
      },
      { size: 15, page: 10 }
    );
  });
  const places = await promise;

  return places;
};
