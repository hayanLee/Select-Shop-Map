import React from 'react';
import { useKakaoMap } from '../KakaoMap/KakaoMap.context';
import PlaceCard from '../PlaceCard/PlaceCard';

const SearchList = () => {
  const { places } = useKakaoMap();

  return (
    <ul>
      {places.map((place) => (
        <li key={place.id} className="mb-4 border-b border-gray-300 p-2">
          <PlaceCard place={place} />
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
