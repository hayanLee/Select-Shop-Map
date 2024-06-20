import React, { useEffect, useState } from 'react';
import { PiHeart, PiHeartFill } from 'react-icons/pi';
import { useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addLike, deleteLike, isLikedShop } from '../../api/like';
import mainIcon from '../../assets/mainIcon.png';
const DetailPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState('');
  const { shopId } = useParams();
  const location = useLocation();
  const storedUserInfo = localStorage.getItem('userInfo');

  const { place_name: shop_name, road_address_name } = location.state;

  useEffect(() => {
    if (storedUserInfo) {
      (async () => {
        const { id } = JSON.parse(storedUserInfo);
        setUserId(id);
        const likedStatus = await isLikedShop({ userId: id, shopId });
        setIsLiked(likedStatus);
      })();
    }
  }, [storedUserInfo, shopId]);

  const handleLike = async () => {
    if (!storedUserInfo) {
      Swal.fire('Error', '해당 기능은 로그인 후 이용 가능합니다.', 'error');
      return;
    }
    if (isLiked) await deleteLike({ userId, shopId });
    else await addLike({ userId, shopId, shop_name });

    setIsLiked(!isLiked);
  };

  return (
    <div className="flex min-h-screen justify-center">
      <main className="w-full max-w-[1320px] p-4">
        <div className="mt-[20px] flex flex-col gap-6 rounded-lg bg-hover p-[48px_36px_30px_36px] shadow-lg md:flex-row">
          <img src={mainIcon} alt="Store" className="h-64 w-full rounded-lg bg-white object-cover shadow-md md:w-1/2" />
          <div className="relative flex w-full flex-col rounded-lg bg-white p-6 shadow-md md:w-1/2">
            <h1 className="text-3xl font-bold">{shop_name}</h1>
            <p className="mt-2 text-gray-700">{road_address_name}</p>
            <p className="mt-2 text-gray-700">위치</p>
            <p className="mt-2 text-gray-700">위치</p>
            <button onClick={handleLike} className="absolute bottom-4 right-4 text-3xl text-point">
              {isLiked ? <PiHeartFill /> : <PiHeart />}
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-hover p-[48px_36px_30px_36px] shadow-md">
          <section className="rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center space-x-[22px]">
              <textarea placeholder="리뷰를 남겨주세요" className="h-[70px] w-full rounded-lg border p-2" />
              <button className="h-[35px] w-[76px] rounded-lg bg-point text-white">등록</button>
            </div>
          </section>
          <section className="mt-6 space-y-[30px]">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="rounded-lg bg-white p-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">작성자</p>
                    <p>안녕하세요</p>
                  </div>
                  <div className="flex space-x-[22px]">
                    <button className="h-[35px] w-[76px] rounded-lg bg-point text-white">수정</button>
                    <button className="h-[35px] w-[76px] rounded-lg bg-main text-white">삭제</button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
