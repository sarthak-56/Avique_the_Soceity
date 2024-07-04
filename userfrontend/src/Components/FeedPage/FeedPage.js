import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './FeedPage.module.css';
import LikeButton from '../LikeButton/LikeButton';
import CommentForm from '../Comments/CommentForm';
import ShareButton from '../Share/ShareButton';
import SaveButton from '../Save/SaveButton';

const FeedPage = () => {
    const [globalPosts, setGlobalPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchGlobalPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/user/globalposts/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setGlobalPosts(response.data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching global posts:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchGlobalPosts();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Loading global posts...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error.message}</div>;
    }

    return (
        <div className={styles.feed}>
            {globalPosts.length > 0 ? (
                globalPosts.map(post => (
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
                                    <SaveButton postId={post.id} />
                                </div>
                               
                            </div>
                        </div>
                    )
                ))
            ) : (
                <div className={styles['no-posts']}>No posts to display</div>
            )}
        </div>
    );
};

export default FeedPage;
