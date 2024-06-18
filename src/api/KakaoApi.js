import { useEffect } from 'react';

const useKakaoMapApi = (callback) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=cb8906a483c5671f6f94b58a926ef09c&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(callback);
    };

    script.onerror = () => {
      console.error("Failed to load Kakao Maps API script");
    };

    return () => {
      script.remove();
    };
  }, [callback]);
};

export { useKakaoMapApi };
