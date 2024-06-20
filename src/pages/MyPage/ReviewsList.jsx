import React, { useState, useEffect } from 'react';
import { getUserReviewsByUserId } from '../../api/review';

const ReviewsList = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getUserReviewsByUserId(userId); // API 함수 호출

        setReviews(data);
      } catch (error) {
        console.error('리뷰를 불러오는 데 실패했습니다:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchReviews();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="list-none">
      {reviews.map((review) => (
        <li key={review.id} className="p-2 bg-white rounded shadow mb-2">
          <p>{review.content}</p>
          <small>{new Date(review.created_at).toLocaleDateString()}</small>
        </li>
      ))}
    </ul>
  );
};

export default ReviewsList;
