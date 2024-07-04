import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './request.module.css';

const FriendRequestList = ({ token }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      const token = localStorage.getItem('token');
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/friend-requests/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriendRequests(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please login again.');
        } else {
          setError('Error fetching friend requests');
        }
      }
      setLoading(false);
    };
    fetchFriendRequests();
  }, [token]);

  const handleAccept = async (friendRequestId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://127.0.0.1:8000/api/user/accept-friend-request/',
        { friend_request_id: friendRequestId },
        { headers: { Authorization: `Bearer ${token}` } });
      setFriendRequests((prevRequests) => prevRequests.filter((request) => request.id !== friendRequestId));
    } catch (error) {
      console.error('Error accepting friend request', error);
    }
  };

  const handleReject = async (friendRequestId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://127.0.0.1:8000/api/user/reject-friend-request/',
        { friend_request_id: friendRequestId },
        { headers: { Authorization: `Bearer ${token}` } });
      setFriendRequests((prevRequests) => prevRequests.filter((request) => request.id !== friendRequestId));
    } catch (error) {
      console.error('Error rejecting friend request', error);
    }
  };

  return (
    <div className={styles["friend-requests-container"]}>
      <h2 className={styles["section-title"]}>Friend Requests</h2>
      {loading && <p className={styles["loading"]}>Loading...</p>}
      {error && <p className={styles["error"]}>{error}</p>}
      <ul className={styles["friend-requests-list"]}>
        {friendRequests.map((friendRequest) => (
          <li key={friendRequest.id} className={styles["friend-request-item"]}>
            <div className={styles["request-info-container"]}>
              <span className={styles["request-info"]}>
                {friendRequest.from_user.name} sent you a friend request.
              </span>
              <div className={styles["button-container"]}>
                <button className={styles["accept-button"]} onClick={() => handleAccept(friendRequest.id)}>Accept</button>
                <button className={styles["reject-button"]} onClick={() => handleReject(friendRequest.id)}>Reject</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default FriendRequestList;
