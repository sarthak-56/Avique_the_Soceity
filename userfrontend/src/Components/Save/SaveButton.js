// src/components/SaveButton.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const SaveButton = ({ postId }) => {
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/user/posts/${postId}/save/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSaved(true);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleUnsave = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/user/posts/${postId}/save/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSaved(false);
    } catch (error) {
      console.error('Error unsaving post:', error);
    }
  };

  return (
    <button onClick={saved ? handleUnsave : handleSave} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faBookmark} style={{ color: saved ? '#ff0000' :'rgb(250, 160, 160)' }} size="2x"/>
    </button>
  );
};

export default SaveButton;
