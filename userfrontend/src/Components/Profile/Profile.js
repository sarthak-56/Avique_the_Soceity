import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';
import ContactInfoEdit from './ContactInfoEdit';
import Modal from 'react-modal';
import styles from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchProfile();
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!profileData) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={`${styles.mainContainer} ${styles.newClassName}`}>
      <div className={styles['profile-container']}>
        <div className={styles['cover-picture-container']}>
          {profileData.cover_pic ? (
            <img className={styles['cover-picture']} src={`http://127.0.0.1:8000${profileData.cover_pic}`} alt="Cover" />
          ) : (
            <img className={styles['cover-picture']} src="/cover.jpg" alt="Cover" />
          )}
          <div className={styles['profile-picture-overlay']}></div>
        </div>
        <div className={styles['profile-picture-container']}>
          {profileData.profile_pic ? (
            <img className={styles['profile-picture']} src={`http://127.0.0.1:8000${profileData.profile_pic}`} alt="Profile" />
          ) : (
            <img className={styles['profile-picture']} src="/OIP.jpeg" alt="Profile" />
          )}
        </div>
        <div className={styles['profile-info']}>
          <div className={styles['profile-details']}>
            <h1>{profileData.name}</h1>
            <h4>{profileData.bio}</h4>
            <p>{profileData.email}</p>
            <button className={styles['edit-button']} onClick={() => openModal('contactInfo')}>Contact info</button>
            <button className={styles['edit-button']} onClick={() => openModal('updateProfile')}>Update Photo</button>
          </div>

          <div className={styles.linksContainer}>
            <Link to='/friends' className={styles.navLink}>
              <FontAwesomeIcon icon={faUserGroup} style={{ color: "#ff0000" }} /> Friends
            </Link>
            <Link to='/user-posts' className={styles.navLink}>
              <FontAwesomeIcon icon={faEdit} /> Posts
            </Link>
            <Link to='/save' className={styles.navLink}>
            <FontAwesomeIcon icon={faBookmark} style={{ color:'red'}}/> Saved
            </Link>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Modal"
        >
          <button className={styles['close-button']} onClick={closeModal}>&times;</button>
          {modalType === 'contactInfo' && <ContactInfoEdit profileData={profileData} setProfileData={setProfileData} />}
          {modalType === 'updateProfile' && <ProfileEdit profileData={profileData} setProfileData={setProfileData} closeModal={closeModal} />}
        </Modal>
      </div>
    </div>

  );
};

export default Profile;
