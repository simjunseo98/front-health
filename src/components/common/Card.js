import React, { useState } from 'react';
import PostModal from './PostModal';
import { AiOutlineHeart, AiFillHeart} from 'react-icons/ai'; // react-icons에서 하트 아이콘 가져오기
import styles from '../../assets/styles/card.module.scss';

export const Card = ({ post,}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);

    if (!isLiked) {
      setLikes(likes + 1);
      // 서버에 좋아요 수 증가를 업데이트하는 코드 추가 가능
    } else {
      setLikes(likes - 1);
      // 서버에 좋아요 수 감소를 업데이트하는 코드 추가 가능
    }
  };

  return (
    <div>
      <div className={styles.cardWrapper} onClick={openModal}>
        <div className={styles.cardBodyImg}>
          <img 
            src={post.image}
            alt={post.title}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }} // 이미지 로드 실패 시 대체 이미지 설정
          />
        </div>
        <div className={styles.cardFooter} onClick={(e) => e.stopPropagation()}>
          <div className={styles.heart} onClick={toggleLike}>
            {isLiked ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart />} {likes}
            </div>
          <div className={styles.username}>{post.username} 임시: 작성자</div>
        </div>
      </div>
      <PostModal isOpen={isModalOpen} isClose={closeModal} post={post} />
    </div>
  );
};
