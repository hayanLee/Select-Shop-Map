import React from 'react';
import { useKakaoMap } from './KakaoMap.context';
import KakaoMapLoading from './KakaoMapLoading';

const MapContainer = () => {
  const { isMapLoaded, mapContainerElRef } = useKakaoMap();

  return (
    <div className="h-full w-3/4">
      {isMapLoaded ? <div ref={mapContainerElRef} className="h-full w-full"></div> : <KakaoMapLoading />}
    </div>
  );
};

export default MapContainer;
