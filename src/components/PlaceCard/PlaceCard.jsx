import React from 'react';
import { Link } from 'react-router-dom';
import mainIcon from '../../assets/mainIcon.png';
function PlaceCard({ place }) {
  const { id, place_name, road_address_name } = place;

  return (
    <div className="flex items-center rounded-lg p-3 shadow-md">
      <Link to={`/shop/${id}`} state={{ place_name, road_address_name }} className="flex items-center space-x-4">
        <img src={mainIcon} alt="이미지" className="h-20 w-20 rounded-full" />
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{place_name}</h3>
          <p className="text-gray-600">{road_address_name}</p>
        </div>
      </Link>
    </div>
  );
}

export default PlaceCard;
