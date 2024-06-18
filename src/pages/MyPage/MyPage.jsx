import React, { useState, useEffect } from 'react';
import SavedShopsList from './SavedShopsList.jsx';
import ReviewsList from './ReviewsList.jsx';
import supabase from '../../supabase/supabaseClient'; 

const MyPage = () => {
  // 임시 user 객체 (변경 예정!)
  // const user = {
  //   id: 'dummy-user-id',
  //   nickname: '개돌이'
  // };

  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  

  const fetchNickname = async () => {
    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError) {
        throw userError;
      }

      if (user) {
        const { data, error } = await supabase
          .from('users') 
          .select('nickname')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }
        setNickname(data.nickname);
        setUserId(user.id);
      }
    } catch (error) {
      console.error('닉네임을 불러오는데에 실패했습니다.', error.message);
    }
  };

  useEffect(() => {
    fetchNickname();
  }, []);

  return (
    <div className="container bg-[#E5E1EF] mx-auto p-4 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">💜{nickname || 'Loading...'}💜</h1>
      <div className="my-4">
        <h2 className="text-xl font-semibold mb-2">
         닉네임 💜{nickname || 'Loading...'}💜님의 찜 목록
        </h2>
        <div className="p-4 bg-gray-100 rounded shadow">
          <SavedShopsList userId={userId} /> 
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold mb-2">
          닉네임 💜{nickname || 'Loading...'}💜님이 작성한 리뷰
        </h2>
        <div className="p-4 bg-gray-100 rounded shadow">
          <ReviewsList userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
