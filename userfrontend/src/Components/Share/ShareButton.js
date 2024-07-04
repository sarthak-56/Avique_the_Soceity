// src/components/ShareButton.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

const ShareButton = ({ postId }) => {
  const handleShare = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/posts/${postId}/share/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Post shared!');
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  return (
    <div>
      <button onClick={handleShare}>
        <FontAwesomeIcon icon={faShare} style={{ color: '#ff0000' }} size="2x" />
      </button>
    </div>
  );
};

export default ShareButton;
