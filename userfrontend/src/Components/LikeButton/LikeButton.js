import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styles from './Like.module.css'

const LikeButton = ({ postId }) => {
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const [showLikedModal, setShowLikedModal] = useState(false);

console.log(likeCount)
  // Fetch initial like status and count
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/posts/${postId}/like/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setLiked(data);  
          console.log(data)
          setLikeCount(data.length); 
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    fetchLikeStatus();
  }, [postId]);

  const handleLike = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/user/posts/${postId}/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLiked(true);
      setLikeCount(likeCount + 1); // Increment like count locally
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnlike = async () => {
    // const token = localStorage.getItem('token')
    try {
      await fetch(`http://127.0.0.1:8000/api/user/posts/${postId}/like/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        
      });
      // console.log(token)
      setLiked(false);
      setLikeCount(likeCount - 1); // Decrement like count locally
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const openLikedModal = () => {
    setShowLikedModal(true);
  };

  const closeLikedModal = () => {
    setShowLikedModal(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginLeft: '5px', marginRight: '10px', color:'red', fontWeight: 'bold' ,cursor: 'pointer'}} onClick={openLikedModal}>{likeCount} likes</span>
      <button onClick={liked ? handleUnlike : handleLike} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faThumbsUp} style={{ color: liked ? '#ff0000' : 'rgb(250, 160, 160)' }} size="2x" />
      </button>

      {showLikedModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeLikedModal}>&times;</span>
            <h2>Liked by:</h2>
            <ul>
              {liked.map((like, index) => (
                <li key={index}>{like.user}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
