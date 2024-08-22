import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../../assets/styles/today/postModal.module.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import api from '../../services/api'; 

Modal.setAppElement('#root');

const PostModal = ({ isOpen, isClose, post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.todayHearts || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [updateCommentId, setUpdateCommentId] = useState(null); // 수정 중인 댓글 ID
  const [updateCommentContent, setUpdateCommentContent] = useState(''); // 수정 중인 댓글 내용

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      const commentData = { 
        todaySq: post.todaySq,       // 게시물 ID
        todayCommentsContents: newComment // 댓글 내용
      };

      try {
        // 서버에 댓글을 등록
        const addedComment = await addComment(post.todaySq, commentData);
        
        // 댓글 리스트에 새 댓글 추가
        setComments([...comments, addedComment]);
        
        // 입력 필드 초기화
        setNewComment('');
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };
  
  // 서버에 댓글을 추가하는 메소드
  const addComment = async (postId, commentData) => {
    try {
      const response = await api.post('/todayComments/register', { 
        postId, 
        ...commentData 
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add comment');
    }
  };

  // 댓글 수정 시작 시 호출
  const startupdateComment = (comment) => {
    setUpdateCommentId(comment.todayCommentsSq);
    setUpdateCommentContent(comment.todayCommentsContents);
  };

  // 댓글 수정 완료 시 호출
  const handleUpdateComment = async () => {
    try {
      const response = await api.put(`/todayComments/update`, {
        todayCommentsSq: updateCommentId,
        todayCommentsContents: updateCommentContent,
        todayCommentsCreated: new Date().toISOString()
      });
      alert('댓글 수정에 성공했습니다.');
      
      // 수정된 댓글 반영
      setComments(comments.map(comment => 
        comment.todayCommentsSq === updateCommentId ? response.data : comment
      ));
      
      // 수정 상태 초기화
      setUpdateCommentId(null);
      setUpdateCommentContent('');
    } catch (error) {
      console.error('댓글 수정에 실패했습니다:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/todayComments/delete/${commentId}`);
      alert('댓글이 삭제되었습니다.');
      
      // 삭제된 댓글을 화면에서 제거
      setComments(comments.filter(comment => comment.todayCommentsSq !== commentId));
    } catch (error) {
      console.error('댓글 삭제에 실패했습니다:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const likePost = async (todayId) => {
    try {
      const response = await api.post(`/today/todaylike/${todayId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to like post');
    }
  };

  const unlikePost = async (todayId) => {
    try {
      const response = await api.post(`/today/todaylike/${todayId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to unlike post');
    }
  };

  const toggleLike = async () => {
    try {
      if (isLiked) {
        await unlikePost(post.todaySq);
        setIsLiked(false);
        setLikes(likes - 1);
      } else {
        await likePost(post.todaySq);
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
                        <div className={styles.update} onClick={() => startupdateComment(comment)}>수정</div>
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
