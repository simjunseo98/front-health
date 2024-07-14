import React from 'react';
import Modal from 'react-modal';
import styles from '../../assets/styles/postModal.module.scss';

Modal.setAppElement('#root'); // 애플리케이션의 루트 요소를 설정합니다.

const PostModal = ({ isOpen, isClose, post }) => {
  if (!post) return null;

  return (
    <Modal
      isOpen={isOpen}
      isClose={isClose}
      contentLabel="Post Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}>
      <div className={styles.modalContent}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <button onClick={isClose}>Close</button>
      </div>
    </Modal>
  );
};

export default PostModal;
