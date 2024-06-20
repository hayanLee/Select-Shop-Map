import React, { useState, useEffect } from 'react';
import supabase from '../../supabase/supabaseClient';

const SavedShopsList = ({ userId }) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedShops = async () => {
    try {
      // likes 테이블에서 shop_name 가져오기
      const { data, error } = await supabase.from('likes').select('shop_name').eq('user_id', userId);

      if (error) {
        throw error;
      }

      const shopNames = data.map((item) => item.shop_name);

      setShops(shopNames);
    } catch (error) {
      console.error('찜한 상점을 불러오는 데 실패했습니다:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        <li key={index} className="mb-2 rounded bg-white p-2 shadow">
          {shopName}
        </li>
      ))}
    </ul>
  );
};

export default SavedShopsList;
