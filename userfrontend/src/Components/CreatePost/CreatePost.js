import React, { useState } from 'react';
import { createPost } from '../api';
import styles from './CreatePost.module.css';

const PostForm = ({ token }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const response = await createPost(formData, token);
      console.log('Post created:', response);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles['file-input-container']}>
          <label className={styles['file-input-label']} htmlFor="file-input">
            Select your Picture to post
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleImageChange}
            className={styles['file-input']}
          />
          {imageUrl && <img src={imageUrl} alt="Selected" className={styles['selected-image']} />}
        </div>

        <div className={styles['input-container']}>
          <label htmlFor="content"></label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something here..."
            className={styles.textarea}
          />
        </div>

        <div className={styles.centered}>
          <button type="submit" className={styles.button}>Upload</button>
        </div>
        {error && <div className={styles.error}>Error: {JSON.stringify(error)}</div>}
      </form>
    </div>
  );
};

export default PostForm;
