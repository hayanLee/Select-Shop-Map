import { useEffect } from 'react';

const loadKakaoMap = (callback) => {
  const script = document.createElement('script');
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=cb8906a483c5671f6f94b58a926ef09c&autoload=false&libraries=services`;
  script.async = true;
  document.head.appendChild(script);

  // 스크립트 로드 성공
  script.onload = () => {
    window.kakao.maps.load(callback);
  };

  // 스크립트 로드 실패
  script.onerror = () => {
    console.error('Failed to load Kakao Maps API script');
  };

  return () => {
    script.remove();
  };
};

const useKakaoMapApi = (callback) => {
  console.log('useKakaoMapApi 호출');

  useEffect(() => loadKakaoMap(callback), [callback]);
};

export { useKakaoMapApi };
