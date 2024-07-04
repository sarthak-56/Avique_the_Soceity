// Modal.js
import React from 'react';

const Modal = ({ title, data, onClose, isCommentsModal, postId, onAddComment }) => (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h3>{title}</h3>
            {isCommentsModal && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onAddComment(postId, e.target.elements.commentText.value);
                    e.target.elements.commentText.value = '';
                }}>
                    <input type="text" name="commentText" placeholder="Add a comment..." />
                    <button type="submit">Post</button>
                </form>
            )}
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.user.name}: {item.text}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default Modal;
