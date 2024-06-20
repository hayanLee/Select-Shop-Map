import React, { useState, useEffect, useContext } from 'react';
import SavedShopsList from './SavedShopsList.jsx';
import ReviewsList from './ReviewsList.jsx';
import { getUserInfo } from '../../api/auth';
import { AuthContext } from '../../contexts/AuthContext';

const MyPage = () => {
  const { userInfo } = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        if (userInfo) {
          const userId = userInfo.id;
          const user = await getUserInfo(userId);

          if (user) {
            setNickname(user.nickname);
            setUserId(userId);
          } else {
            console.error('유저 정보를 불러오는데 실패했습니다.');
          }
        }
      } catch (error) {
        console.error('닉네임을 불러오는데에 실패했습니다.', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNickname();
  }, [userInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="container bg-[#E5E1EF] p-4 rounded-lg shadow mt-16 mb-20 w-3/4">
        <h1 className="text-3xl font-bold mb-10">💜{nickname || 'Loading...'}님의 페이지💜</h1>
        <div className="my-4">
          <h2 className="text-xl font-semibold mb-4">
            💜{nickname || 'Loading...'}💜님의 찜 목록
          </h2>
          <div className="p-4 bg-gray-100 rounded-lg shadow min-h-40 mb-8">
            <SavedShopsList userId={userId} />
          </div>
        </div>
        <div className="my-4">
          <h2 className="text-xl font-semibold mb-4">
            💜{nickname || 'Loading...'}💜님이 작성한 리뷰
          </h2>
          <div className="p-4 bg-gray-100 rounded-lg shadow min-h-40 mb-4">
            <ReviewsList userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
