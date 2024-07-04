import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './FriendList.module.css';
import { Link } from 'react-router-dom';

const FriendList = ({ token }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://127.0.0.1:8000/api/user/friends/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please login again.');
        } else {
          setError('Error fetching friends');
        }
      }
      setLoading(false);
    };
    fetchFriends();
  }, [token]);

  const openModal = (friend, event) => {
    setSelectedFriend(friend);
  };

  const closeModal = () => {
    setSelectedFriend(null);
    setModalPosition({ top: 0, left: 0 });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles["section-title"]}>Your Friends</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className={styles.friends}>
        {friends.map((friend) => (
          <li key={friend.id} onClick={(event) => openModal(friend, event)}>
            <Link>{friend.name}</Link>
          </li>
        ))}
      </ul>
      {selectedFriend && (
        <div className={styles.modal} style={{ top: modalPosition.top, left: modalPosition.left }}>
          <div className={styles["modal-content"]}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <div className={styles["profile-header"]}>
              <h1>{selectedFriend.name}</h1>
              {selectedFriend.cover_pic ? (
                <img className={styles["cover-picture1"]} src={`http://127.0.0.1:8000${selectedFriend.cover_pic}`} alt={selectedFriend.name} />
              ) : (
                <img className={styles["cover-picture1"]} src="/cover.jpg" alt="Cover" />
              )}
              {selectedFriend.profile_pic ? (
                <img className={styles["profile-picture1"]} src={`http://127.0.0.1:8000${selectedFriend.profile_pic}`} alt={selectedFriend.name} />
              ) : (
                <img className={styles["profile-picture1"]} src="/OIP.jpeg" alt="Profile" />
              )}
            </div>
            <div className={styles["profile-details"]}>
              <p>{selectedFriend.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default FriendList;
