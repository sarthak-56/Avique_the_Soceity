// src/components/SavedPostsList.js
import React, { useState, useEffect } from 'react';
import styles from './SavedPost.module.css'; // Assuming you have CSS module
import LikeButton from '../LikeButton/LikeButton';
import CommentForm from '../Comments/CommentForm';
import ShareButton from '../Share/ShareButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const SavedPost = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  console.log(savedPosts);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/saved-posts/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setSavedPosts(data);
      } catch (error) {
        console.error('Error fetching saved posts:', error);
      }
    };

    fetchSavedPosts();
  }, []);

  const handleRemovePost = async (postId) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/user/posts/${postId}/save/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSavedPosts(false);
    } catch (error) {
      console.error('Error unsaving post:', error);
    }
  };

  return (
    <div className={styles.feed}>
      <h1>Saved Posts</h1>
      {savedPosts.length > 0 ? (
        savedPosts.map(post => (
          post.content && (
            <div key={post.id} className={styles.post}>
              {post.image && <img src={`http://127.0.0.1:8000/${post.image}`} alt="Post" className={styles['post-image']} />}
              <div className={styles.user}>
                <h2 className={styles['user-name']}>{post.user}</h2>
                <p className={styles['post-content']}>{post.content}</p>
              </div>
              <div className={styles['button-container']}>
                <div className={styles['button-group-left']}>
                  <LikeButton postId={post.id} />
                  <CommentForm postId={post.id} />
                  <ShareButton postId={post.id} />
                </div>
                <div className={styles['button-group-right']}>
                  <button onClick={() => handleRemovePost(post.id)} className={styles['remove-button']}>
                 <FontAwesomeIcon icon={faBookmark} style={{ color: '#ff0000'}} size="2x"/>
                  </button>
                </div>
              </div>
            </div>
          )
        ))
      ) : (
        <div className={styles['no-posts']}>No saved posts to display</div>
      )}
    </div>
  );
};

export default SavedPost;
