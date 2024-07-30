import React, { useState } from 'react';
import PostModal from './PostModal';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styles from '../../assets/styles/today/card.module.scss';

export const Card = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes || 0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleLike = (e) => {
    e.stopPropagation();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikes(newIsLiked ? likes + 1 : likes - 1);
  };

  return (
    <div>
      <div className={styles.cardWrapper} onClick={openModal}>
        <div className={styles.cardBodyImg}>
          <img 
            src={post.image}
            alt={post.title}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
          />
        </div>
        <div className={styles.cardFooter} onClick={(e) => e.stopPropagation()}>
          <div className={styles.heart}>
            {isLiked ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart />} {likes}
          </div>

        </div>
      </div>
      <PostModal 
        isOpen={isModalOpen} 
        isClose={closeModal} 
        post={post} 
        isLiked={isLiked} 
        likes={likes} 
        toggleLike={toggleLike} 
      />
    </div>
  );
};
