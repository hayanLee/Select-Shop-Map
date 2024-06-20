import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Comment = ({ comment, onEdit, onDelete }) => {
  const { isAuthenticated, userInfo } = useContext(AuthContext);

  const isAuthor = userInfo && userInfo.id === comment.userId;

  return (
    <div className="comment">
      <p>{comment.text}</p>
      {isAuthenticated && isAuthor && (
        <div>
          <button onClick={() => onEdit(comment.id)}>Edit</button>
          <button onClick={() => onDelete(comment.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
