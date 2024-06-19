import React, { useState, useEffect } from 'react';
import SavedShopsList from './SavedShopsList.jsx';
import ReviewsList from './ReviewsList.jsx';
import {getUserInfo} from '../../api/auth';

const MyPage = () => {
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');

  const fetchNickname = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || !userInfo.id) {
        console.error('No user info found in localStorage.');
        return;
      }
  
      const userId = userInfo.id;
      const user = await getUserInfo(userId); // getUserInfo 함수 호출
  
      if (user) {
        setNickname(user.nickname);
        setUserId(userId);
      } else {
        console.error('유저 정보를 불러오는데 실패했습니다.');
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