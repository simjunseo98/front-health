import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import styles from '../../assets/styles/today/postModal.module.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import api from '../../services/api';

Modal.setAppElement('#root');

const PostModal = ({ isOpen, isClose, post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.todayHearts || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (post) {
      const fetchData = async () => {
        try {
          const heartResponse = await api.get(`/hearts/hasLiked/${post.todaySq}`);
          setIsLiked(heartResponse.data);
          const token = sessionStorage.getItem('token');
          setIsLoggedIn(!!token);
        } catch (error) {
          console.error('API 호출 중 오류 발생:', error);
        }
      };
      fetchData();
    }
  }, [post]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    try {
      const response = await api.post('/todayComments/register', {
        todayCommentsContents: newComment,
        todayEntity: { todaySq: post.todaySq },
        todayCommentsCreated: new Date().toISOString(),
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const toggleLike = async () => {
    try {
      await api.post(`/hearts/toggle/${post.todaySq}`);
      setIsLiked(prev => !prev);
      setLikes(prev => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error('찜 등록/취소 실패:', error);
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
        {post.imageurl && (
          <div className={styles.modalImageWrapper}>
            <img src={post.imageurl} alt="" className={styles.modalImage} />
          </div>
        )}
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <div className={styles.username}>작성자: {post.user.userId}</div>
            <div className={styles.date}>작성일: {new Date(post.todayCreated).toLocaleDateString()}</div>
          </div>
          <div className={styles.modalText}>
            <p className={styles.modalDescription}>{post.todayContents}</p>
          </div>
          <div className={styles.commentSection}>
            <div className={styles.commentList}>
              {comments.map(comment => (
                <div key={comment.todayCommentsSq} className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentUsername}>{comment.user.userId}</span>
                    <span className={styles.commentDate}>{new Date(comment.todayCommentsCreated).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.commentText}>
                    {comment.todayCommentsContents}
                    {isLoggedIn && comment.user.userId === sessionStorage.getItem('userId') && (
                      <>
                        <div className={styles.update}>수정</div>
                        <div className={styles.delete}>삭제</div>
                      </>
                    )}
                  </div>
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
                onChange={e => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
              />
              <button className={styles.commentButton} onClick={handleAddComment}>게시</button>
            </div>
          </div>
          <button className={styles.closeButton} onClick={isClose}>×</button>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(PostModal);
