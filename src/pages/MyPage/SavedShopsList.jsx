import React, { useState, useEffect } from 'react';
import { getUserLikedShops } from '../../api/like'; // API 함수 import

const SavedShopsList = ({ userId }) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedShops = async () => {
      try {
        // 기존의 supabase 클라이언트 직접 호출을 API 함수 호출로 변경
        const data = await getUserLikedShops(userId); // API 함수 호출
        setShops(data.map(item => item.shop_name)); // 데이터 처리
      } catch (error) {
        console.error('찜한 상점을 불러오는 데 실패했습니다:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSavedShops();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="list-none">
      {shops.map((shopName, index) => (
        <li key={index} className="p-2 bg-white rounded shadow mb-2"> 
          {shopName}
        </li>
      ))}
    </ul>
  );
};

export default SavedShopsList;
