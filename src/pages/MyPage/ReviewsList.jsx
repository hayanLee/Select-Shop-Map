import React from 'react';

const ReviewsList = ({ userId }) => {
  // 임시 데이터(변경 예정/)
  // 클릭 시 리뷰 작성했던 창으로 이동 구현 예정
  const reviews = [
    { id: '1', content: '기깔나네요.', created_at: '2023-01-01' },
    { id: '2', content: '미쳤네요.', created_at: '2023-02-01' },
    { id: '3', content: '폼미쳤네요.', created_at: '2023-03-01' }
  ];

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
