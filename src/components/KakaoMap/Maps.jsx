import React, { useState, useEffect, useRef } from 'react';
import { useKakaoMapApi } from '../../api/KakaoApi';
import MapContainer from './MapContainer';
import SearchForm from './SearchForm';
import SearchList from './SearchList';

const Maps = ({ className }) => {
  const mapContainerId = 'map';
  const [keyword, setKeyword] = useState('소모품 샵');
  const [places, setPlaces] = useState([]);
  const isInitialLoad = useRef(true);

  useKakaoMapApi(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
    }
  });

  return (
    <div className={`h-full w-full flex ${className}`}>
      <div className="w-1/4 h-full overflow-y-auto p-4 border-r border-gray-300">
        <SearchForm setKeyword={setKeyword} />
        <SearchList places={places} />
      </div>
      <MapContainer keyword={keyword} setPlaces={setPlaces} mapContainerId={mapContainerId} />
    </div>
  );
};

export default Maps;
