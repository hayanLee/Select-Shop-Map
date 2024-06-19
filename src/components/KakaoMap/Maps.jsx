import React, { useEffect, useRef, useState } from 'react';
import { useKakaoMapApi } from '../../hooks/useKakaoMap';
import SearchForm from '../SearchForm';
import SearchList from '../SearchList';
import MapContainer from './MapContainer';

const Maps = () => {
  const mapContainerId = 'map'; // 지도를 표시할 div

  const [keyword, setKeyword] = useState('홍대 소품샵');
  const [places, setPlaces] = useState([]);

  const isInitialLoad = useRef(true); // 초기 로드를 확인하기 위해

  // 지도 한번만 켜기
  useKakaoMapApi(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
    }
  });

  useEffect(() => {
    console.log('Maps 마운트');
  }, []);

  return (
    <div className={`flex h-full w-full`}>
      <div className="h-full w-1/4 overflow-y-auto border-r border-gray-300 p-4">
        <SearchForm onSearchKeyword={setKeyword} />
        <SearchList places={places} />
      </div>
      <MapContainer keyword={keyword} setPlaces={setPlaces} mapContainerId={mapContainerId} />
    </div>
  );
};

export default Maps;
