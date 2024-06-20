import React from 'react';
import SearchForm from '../SearchForm';
import SearchList from '../SearchList';
import { KakaoMapProvider } from './KakaoMap.context';
import MapContainer from './MapContainer';

const Maps = () => {
  return (
    <KakaoMapProvider>
      <div className={`flex h-full w-full`}>
        <div className="h-full w-1/4 overflow-y-auto border-r border-gray-300 p-4">
          <SearchForm />
          <SearchList />
        </div>

        <MapContainer />
      </div>
    </KakaoMapProvider>
  );
};

export default Maps;
