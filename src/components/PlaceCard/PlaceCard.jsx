import React from 'react';
import { Link } from 'react-router-dom';

function PlaceCard({ place }) {
  const { id, place_name, road_address_name } = place;

  return (
    <Link to={`/shop/${id}`} state={{ place_name, road_address_name }}>
      <h3 className="font-bold">{place_name}</h3>
      <p>{road_address_name}</p>
    </Link>
  );
}

export default PlaceCard;
