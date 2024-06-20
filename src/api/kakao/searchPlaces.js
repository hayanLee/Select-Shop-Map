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
