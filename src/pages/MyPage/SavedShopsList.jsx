import React from 'react';

const SavedShopsList = ({ userId }) => {
  // 임시 데이터 (변경 예정!)
  const shops = [
    { id: '1', name: '소품샵 1' },
    { id: '2', name: '소품샵 2' },
    { id: '3', name: '소품샵 3' }
  ];

  return (
    <ul className="list-none">
      {shops.map((shop) => (
        <li key={shop.id} className="p-2 bg-white rounded shadow mb-2">{shop.name}</li>
      ))}
    </ul>
  );
};

export default SavedShopsList;
