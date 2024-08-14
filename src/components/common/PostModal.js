import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../../assets/styles/today/postModal.module.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import api from '../../services/api'; // api 파일에서 함수 가져오기
import { useParams } from 'react-router-dom';

Modal.setAppElement('#root');

const PostModal = ({ isOpen, isClose, post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      const commentData = { username: '현재 사용자', text: newComment };
      try {
        const addedComment = await addComment(post.id, commentData);
        setComments([...comments, addedComment]);
        setNewComment('');
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };
  
  //댓글 등록시 서버에 요청
  const addComment = async (postId, commentData) => {
    try {
        const response = await api.post(`/today/comments/${id}`, 
          { postId: postId,...commentData});
        return response.data;
    } catch (error) {
        throw new Error('Failed to add comment');
    }
};
  // 게시물에 좋아요 추가
 const likePost = async (todayId) => {
  try {
      const response = await api.post(`/today/todaylike/${todayId}`);
      console.log('hi')
      return response.data;
  } catch (error) {
      throw new Error('Failed to like post');
  }
};

// 게시물에 좋아요 제거
const unlikePost = async (todayId) => {
  try {
     const response = await api.post(`/today/todaylike/${todayId}`);
    console.log('by')
   return response.data;
  } catch (error) {
      throw new Error('Failed to unlike post');
  }
};
  const toggleLike = async () => {
    try {
      if (isLiked) {
        await unlikePost(post.id);
        setIsLiked(false);
        setLikes(likes - 1);
      } else {
        await likePost(post.id);
        setIsLiked(true);
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
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
            <div className={styles.heart} onClick={toggleLike}>
              {isLiked ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart />} {likes}
            </div>
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
