import React, { useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = ({ profileData, setProfileData, closeModal }) => {
  const [formData, setFormData] = useState({
    name: profileData.name || '',
    tc: profileData.tc || false,
    profile_pic: null,
    cover_pic: null,
    bio: profileData.bio || '',
  });

  const navigate = useNavigate();

  const [profilePicPreview, setProfilePicPreview] = useState(profileData.profile_pic ? `http://127.0.0.1:8000${profileData.profile_pic}` : null);
  const [coverPicPreview, setCoverPicPreview] = useState(profileData.cover_pic ? `http://127.0.0.1:8000${profileData.cover_pic}` : null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'profile_pic') {
      setProfilePicPreview(URL.createObjectURL(files[0]));
    }
    if (name === 'cover_pic') {
      setCoverPicPreview(URL.createObjectURL(files[0]));
    }
    setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('tc', formData.tc);
    if (formData.profile_pic) {
      formPayload.append('profile_pic', formData.profile_pic);
    }
    if (formData.cover_pic) {
      formPayload.append('cover_pic', formData.cover_pic);
    }
    formPayload.append('bio', formData.bio);

    try {
      const res = await axios.patch('http://127.0.0.1:8000/api/user/profile/update/', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(res.data); // Update profileData in Profile component
      closeModal(); // Close the modal after successful update
      alert('Profile updated successfully');
      navigate('/main');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['profile-edit-form']}>

      <div className={styles.formGroup}>
        <label className={styles.label}>Profile Picture:</label>
        <label htmlFor="profile_pic" className={styles.customFileInput}>
          <FaUpload className={styles.uploadIcon} />
        </label>
        <input
          id="profile_pic"
          type="file"
          name="profile_pic"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        {profilePicPreview && (
          <img
            src={profilePicPreview}
            alt="Profile Preview"
            className={styles.imagePreview}
          />
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Cover Picture:</label>
        <label htmlFor="cover_pic" className={styles.customFileInput}>
          <FaUpload className={styles.uploadIcon} />
        </label>
        <input
          id="cover_pic"
          type="file"
          name="cover_pic"
          onChange={handleFileChange} 
          className={styles.fileInput}
        />
        {coverPicPreview && (
          <img
            src={coverPicPreview}
            alt="Cover Preview"
            className={styles.imagePreview1}
          />
        )}
      </div>
      <button type="submit" className={styles.button}>Update Picture</button>
    </form>
  );
};

export default ProfileEdit;
