import React from 'react';
import ReviewsList from './ReviewsList.jsx';
import SavedShopsList from './SavedShopsList.jsx';

const MyPage = () => {
  const { id: userId, nickname } = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="container mb-20 mt-16 w-3/4 rounded-lg bg-[#E5E1EF] p-4 shadow">
        <h1 className="mb-10 text-3xl font-bold">💜{nickname || 'Loading...'}님의 페이지💜</h1>
        <div className="my-4">
          <h2 className="mb-4 text-xl font-semibold">💜{nickname || 'Loading...'}💜님의 찜 목록</h2>
          <div className="mb-8 min-h-40 rounded-lg bg-gray-100 p-4 shadow">
            <SavedShopsList userId={userId} />
          </div>
        </div>
        <div className="my-4">
          <h2 className="mb-4 text-xl font-semibold">💜{nickname || 'Loading...'}💜님이 작성한 리뷰</h2>
          <div className="mb-4 min-h-40 rounded-lg bg-gray-100 p-4 shadow">
            <ReviewsList userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
