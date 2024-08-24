import React, { useState } from 'react';
import PostModal from './PostModal';
import styles from '../../assets/styles/today/card.module.scss';

export const Card = React.memo(({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className={styles.cardWrapper} onClick={openModal}>
        <div className={styles.cardBodyImg}>
          <img 
            src={post.imageurl}
            alt={post.title}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
          />
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.heart}>
            {/* 카드에서는 좋아요 상태를 관리하지 않음 */}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <PostModal 
          isOpen={isModalOpen} 
          isClose={closeModal} 
          post={post} 
        />
      )}
    </div>
  );
});
