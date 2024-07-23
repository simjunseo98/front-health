import React, { useState } from 'react';
import PostModal from './PostModal';
import styles from '../../assets/styles/card.module.scss';

export const Card = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className={styles.cardWrapper} onClick={openModal}>
        <div className={styles.cardBodyImg}>
          <img 
            src={post.image}
            alt={post.title}
            className={styles.cardImg}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }} // 이미지 로드 실패 시 대체 이미지 설정
          />
        </div>
        <div className={styles.cardBodyText}>
          <div className={styles.cardBodyTextTitle}>{post.title}</div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.username}>{post.username}임시:작성자</div>
          <div className={styles.date}>{post.date}임시:작성일</div>
        </div>
      </div>
      <PostModal isOpen={isModalOpen} isClose={closeModal} post={post} />
    </div>
  );
};
