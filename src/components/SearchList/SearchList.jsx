import React, { useEffect } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';

const SearchList = ({ places }) => {
  useEffect(() => {
    console.log('SearchList 마운트');
  }, []);
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
