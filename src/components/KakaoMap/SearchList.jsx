import React from 'react';

const SearchList = ({ places }) => {
  return (
    <ul>
      {places.map((place) => (
        <li key={place.id} className="mb-4 p-2 border-b border-gray-300">
          <h3 className="font-bold">{place.place_name}</h3>
          <p>{place.road_address_name || place.address_name}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
