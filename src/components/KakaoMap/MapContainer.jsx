import React from 'react';
import { useKakaoMap } from './KakaoMap.context';

const MapContainer = () => {
  const { mapContainerElRef } = useKakaoMap();

  return <div ref={mapContainerElRef} className="h-full flex-1"></div>;
};

export default MapContainer;
