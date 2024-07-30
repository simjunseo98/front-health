import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../../assets/styles/postModal.module.scss';

Modal.setAppElement('#root'); // 애플리케이션의 루트 요소를 설정합니다.

const PostModal = ({ isOpen, isClose, post }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const updatedComments = [...comments, { username: '현재 사용자', text: newComment }];
      setComments(updatedComments);
      setNewComment('');
    }
  };

  if (!post) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isClose}
      contentLabel="Post Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalBody}>
          <img src={post.image} alt={post.title} className={styles.modalImage} />
          <div className={styles.modalFooter}>
            <div className={styles.username}>{post.username} 임시: 작성자</div>
            <div className={styles.date}>{post.date} 임시: 작성일</div>
          </div>
        </div>
        <div className={styles.commentSection}>
        <div className={styles.modalText}>
            <p className={styles.modalDescription}>{post.description}</p>
          </div>
          <div className={styles.commentList}>
            {comments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <span className={styles.commentUsername}>{comment.username}</span>
                <span className={styles.commentText}>{comment.text}</span>
              </div>
            ))}
          </div>
          <div className={styles.commentForm}>
            <input
              type="text"
              className={styles.commentInput}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
            />
            <button className={styles.commentButton} onClick={handleAddComment}>게시</button>
          </div>
        </div>
        <button className={styles.closeButton} onClick={isClose}>×</button>
      </div>
    </Modal>
  );
};

export default PostModal;
