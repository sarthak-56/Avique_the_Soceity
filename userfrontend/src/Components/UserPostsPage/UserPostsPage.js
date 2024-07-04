import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './User.module.css'
import LikeButton from '../LikeButton/LikeButton';
import CommentForm from '../Comments/CommentForm';
import ShareButton from '../Share/ShareButton';
import SaveButton from '../Save/SaveButton';

const UserPostsPage = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/user/userposts/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUserPosts(response.data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user posts:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading user posts...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.feed}>
            {userPosts.length > 0 ? (
                userPosts.map(post => (
                    post.content && (
                        <div key={post.id} className={styles.post}>
                            {post.image && <img src={`http://127.0.0.1:8000${post.image}`} alt="Post" className={styles['post-image']} />}
                            <div className={styles.user}>
                                <h2>{post.user}</h2>
                                <p>{post.content}</p>
                            </div>
                            <div className={styles['button-container']}>
                                <div className={styles['button-group-left']}>
                                    <LikeButton postId={post.id} />
                                    <CommentForm postId={post.id} />
                                    <ShareButton postId={post.id} />
                                </div>
                                <div className={styles['button-group-right']}>
                                    <SaveButton postId={post.id} />
                                </div>
                               
                            </div>
                        </div>
                    )
                ))
            ) : (
                <div>No posts to display</div>
            )}
        </div>
    );
};

export default UserPostsPage;
