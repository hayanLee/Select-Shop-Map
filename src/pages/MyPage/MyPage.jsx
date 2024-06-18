import React from 'react';
import SavedShopsList from './SavedShopsList.jsx';  
import ReviewsList from './ReviewsList.jsx';  

const MyPage = () => {
  // 임시 user 객체 (변경 예정!)
  const user = {
    id: 'dummy-user-id',
    nickname: '개돌이'
  };

  return (
    <div className="container bg-[#E5E1EF] mx-auto p-4 rounded shadow">
      <h1 className="text-3xl font-bold">💜{user.nickname}💜</h1>
      <div className="my-4">
        <h2 className="text-xl font-semibold">
         닉네임 💜{user.nickname}💜님의 찜 목록
        </h2>
        <div className="p-4 bg-gray-100 rounded shadow">
          <SavedShopsList userId={user.id} /> 
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold">
          닉네임 💜{user.nickname}💜님이 작성한 리뷰
        </h2>
        <div className="p-4 bg-gray-100 rounded shadow">
          <ReviewsList userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
