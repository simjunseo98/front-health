import React from 'react';
import Modal from 'react-modal';
import styles from '../../assets/styles/postModal.module.scss';

Modal.setAppElement('#root'); // 애플리케이션의 루트 요소를 설정합니다.

const PostModal = ({ isOpen, isClose, post }) => {
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
          <div className={styles.modalText}>
            <h2 className={styles.modalTitle}>{post.title}</h2>
            <p className={styles.modalDescription}>{post.description}</p>
          </div>
          <div className={styles.modalFooter}>
          <div className={styles.username}>{post.username}임시:작성자</div>
          <div className={styles.date}>{post.date}임시:작성일</div>
        </div>
        </div>
        <button className={styles.closeButton} onClick={isClose}>×</button>
      </div>
    </Modal>
  );
};

export default PostModal;
