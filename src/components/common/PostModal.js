import React, { useState, useEffect } from 'react';
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
  const [updateCommentId, setUpdateCommentId] = useState(null);
  const [updateCommentContent, setUpdateCommentContent] = useState('');

  useEffect(() => {
    if (post) {
      checkHeart(post.todaySq);
      setComments(post.comments || []); // 댓글 상태 업데이트
    }
  }, [post]);

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      const commentData = {
        todayCommentsContents: newComment, 
        todayCommentsCreated: new Date().toISOString(),
        todaySq: post.todaySq  
      };
      try {
        const addedComment = await addComment(commentData); 
        setComments([...comments, addedComment]);
        setNewComment('');
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  const addComment = async (commentData) => {
    try {
      const response = await api.post('/todayComments/register', commentData);
      alert('댓글 작성이 완료되었습니다.')
      return response.data;
    } catch (error) {
      alert('댓글 작성에 실패했습니다.')
      throw new Error('Failed to add comment');
    }
  };

  const startUpdateComment = (comment) => {
    setUpdateCommentId(comment.todayCommentsSq);
    setUpdateCommentContent(comment.todayCommentsContents);
  };

  const handleUpdateComment = async () => {
    try {
      const response = await api.put(`/todayComments/update`, {
        todayCommentsSq: updateCommentId,
        todayCommentsContents: updateCommentContent,
        todayCommentsCreated: new Date().toISOString()
      });
      alert('댓글 수정에 성공했습니다.');
      setComments(comments.map(comment => 
        comment.todayCommentsSq === updateCommentId ? response.data : comment
      ));
      setUpdateCommentId(null);
      setUpdateCommentContent('');
    } catch (error) {
      console.error('댓글 수정에 실패했습니다:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/todayComments/delete/${commentId}`);
      alert('댓글이 삭제되었습니다.');
      setComments(comments.filter(comment => comment.todayCommentsSq !== commentId));
    } catch (error) {
      console.error('댓글 삭제에 실패했습니다:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const checkHeart = async (postId) => {
    try {
      const response = await api.get(`/hearts/hasLiked/${postId}`);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error('찜 여부 확인에 실패했습니다:', error);
    }
  };

  const toggleLike = async () => {
    try {
      await api.post(`/hearts/toggle/${post.todaySq}`);
      setIsLiked(prevIsLiked => {
        const newIsLiked = !prevIsLiked;
        setLikes(prevLikes => newIsLiked ? prevLikes + 1 : prevLikes - 1);
        return newIsLiked;
      });
    } catch (error) {
      console.error('찜 등록/취소에 실패했습니다:', error);
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
              {comments.map((comment) => (
                <div key={comment.todayCommentsSq} className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentUsername}>{comment.user.userId}</span>
                    <span className={styles.commentDate}>{new Date(comment.todayCommentsCreated).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.commentText}>
                    {updateCommentId === comment.todayCommentsSq ? (
                      <>
                        <input
                          type="text"
                          value={updateCommentContent}
                          onChange={(e) => setUpdateCommentContent(e.target.value)}
                        />
                        <button onClick={handleUpdateComment}>수정 완료</button>
                      </>
                    ) : (
                      <>
                        {comment.todayCommentsContents}
                        <div className={styles.update} onClick={() => startUpdateComment(comment)}>수정</div>
                        <div className={styles.delete} onClick={() => deleteComment(comment.todayCommentsSq)}>삭제</div>
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
                onChange={(e) => setNewComment(e.target.value)}
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

export default PostModal;
