import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { PiHeart, PiHeartFill } from 'react-icons/pi';
import { useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addLike, deleteLike, isLikedShop } from '../../api/like';
import { addReview, deleteReview, getShopReviewsByShopId, modifyReview } from '../../api/review';
import mainIcon from '../../assets/mainIcon.png';

const DetailPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState('');
  const [newReview, setNewReview] = useState('');
  const { shopId } = useParams();
  const location = useLocation();
  const storedUserInfo = localStorage.getItem('userInfo');
  const queryClient = useQueryClient();

  const { place_name: shop_name, road_address_name } = location.state;

  useEffect(() => {
    if (storedUserInfo) {
      const { id } = JSON.parse(storedUserInfo);
      setUserId(id);
    }
  }, [storedUserInfo]);

  useEffect(() => {
    (async () => {
      if (userId && shopId) {
        const likedStatus = await isLikedShop({ userId, shopId });
        setIsLiked(likedStatus);
      }
    })();
  }, [userId, shopId]);

  const addLikeMutation = useMutation({
    mutationFn: (data) => addLike(data),
    onSuccess: () => setIsLiked(true)
  });

  const deleteLikeMutation = useMutation({
    mutationFn: (data) => deleteLike(data),
    onSuccess: () => setIsLiked(false)
  });

  const { data: reviews } = useQuery({
    queryKey: ['reviews', shopId],
    queryFn: () => getShopReviewsByShopId(shopId),
    enabled: !!shopId
  });

  const addReviewMutation = useMutation({
    mutationFn: (data) => addReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', shopId]);
      setNewReview('');
    }
  });

  const updateReviewMutation = useMutation({
    mutationFn: (data) => modifyReview(data),
    onSuccess: () => queryClient.invalidateQueries(['reviews', shopId])
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (data) => deleteReview(data),
    onSuccess: () => queryClient.invalidateQueries(['reviews', shopId])
  });

  const handleLike = async () => {
    if (!storedUserInfo) {
      Swal.fire('Error', '해당 기능은 로그인 후 이용 가능합니다.', 'error');
      return;
    }
    if (isLiked) await deleteLikeMutation.mutateAsync({ userId, shopId });
    else await addLikeMutation.mutateAsync({ userId, shopId, shop_name });
  };

  const handleAddReview = async () => {
    if (!newReview.trim()) {
      Swal.fire('Error', '입력 후 등록해주세요.', 'error');
      return;
    }
    await addReviewMutation.mutateAsync({ userId, shopId, content: newReview });
  };

  const handleUpdateReview = async (reviewId, newContent) => {
    await updateReviewMutation.mutateAsync({ reviewId, content: newContent });
  };

  const handleDeleteReview = async (reviewId) => {
    await deleteReviewMutation.mutateAsync(reviewId);
  };

  return (
    <div className="flex min-h-screen justify-center">
      <main className="w-full max-w-[1320px] p-4">
        <div className="mt-[20px] flex flex-col gap-6 rounded-lg bg-hover p-[48px_36px_30px_36px] shadow-lg md:flex-row">
          <img src={mainIcon} alt="Store" className="h-64 w-full rounded-lg bg-white object-cover shadow-md md:w-1/2" />
          <div className="relative flex w-full flex-col rounded-lg bg-white p-6 shadow-md md:w-1/2">
            <h1 className="text-3xl font-bold">{shop_name}</h1>
            <p className="mt-2 text-gray-700">{road_address_name}</p>
            <button onClick={handleLike} className="absolute bottom-4 right-4 text-3xl text-point">
              {isLiked ? <PiHeartFill /> : <PiHeart />}
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-hover p-[48px_36px_30px_36px] shadow-md">
          <section className="rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center space-x-[22px]">
              <textarea
                placeholder="리뷰를 남겨주세요"
                className="h-[70px] w-full resize-none rounded-lg border p-2 focus:outline-active"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <button onClick={handleAddReview} className="h-[35px] w-[76px] rounded-lg bg-point text-white">
                등록
              </button>
            </div>
          </section>
          <section className="mt-6 space-y-[30px]">
            {reviews?.map((review) => (
              <div key={review.id} className="rounded-lg bg-white p-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{review.user_name}</p>
                    <p>{review.content}</p>
                  </div>
                  {userId === review.user_id && (
                    <div className="flex space-x-[22px]">
                      <button
                        onClick={() => handleUpdateReview(review.id, prompt('리뷰를 수정하세요:', review.content))}
                        className="h-[35px] w-[76px] rounded-lg bg-point text-white"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="h-[35px] w-[76px] rounded-lg bg-main text-white"
                      >
                        삭제
                      </button>
                    </div>
                  )}
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
