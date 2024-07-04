import React, { useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';

const ContactInfoEdit = ({ profileData, setProfileData }) => {
  const [name, setName] = useState(profileData.name || '');
  const [bio, setBio] = useState(profileData.bio || '');
  const navigate= useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.patch(
        'http://127.0.0.1:8000/api/user/profile/update/',
        { name, bio }, // Include bio in the request body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileData(res.data); // Update profileData in Profile component
      alert('Profile updated successfully');
      navigate('/main')
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['contact-info-edit-form']}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Bio:</label>
        <textarea
          name="bio"
          value={bio}
          onChange={handleBioChange}
          className={styles.textarea}
        />
      </div>
      <button type="submit" className={styles.button}>Update Profile</button>
    </form>
  );
};

export default ContactInfoEdit;
