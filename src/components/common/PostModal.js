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
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
      setLikes(post.todayHearts || 0);
      const fetchData = async () => {
        try {
          // 찜 여부 확인
          const heartResponse = await api.get(`/hearts/hasLiked/${post.todaySq}`);
          setIsLiked(heartResponse.data.hasLiked);
          console.log("찜 여부 :", heartResponse.data.hasLiked)
          // 로그인 상태 확인
          const token = sessionStorage.getItem('token');
          console.log('토큰 확인:', token);
          setIsLoggedIn(!!token);
        } catch (error) {
          console.error('API 호출 중 오류 발생:', error);
        }
      };
      fetchData();
    }
  }, [post]);

  // 찜 토글 요청
  const toggleLike = async () => {
    try {
      await api.post(`/hearts/toggle/${post.todaySq}`);
      setIsLiked((prevIsLiked) => {
        const newIsLiked = !prevIsLiked;
        setLikes((prevLikes) => (newIsLiked ? prevLikes + 1 : prevLikes - 1));
        console.log('찜 클릭 :', newIsLiked);  // 여기서 newIsLiked를 사용
        return newIsLiked;
      });
    } catch (error) {
      console.error('찜 등록/취소에 실패했습니다:', error);
    }
  };

//댓글 작성  
  const handleAddComment = async () => {
    if (newComment.trim() === '') return; // 빈 댓글 방지
    try {
      const response = await api.post('/todayComments/register', {
        todayCommentsContents: newComment,
        todayEntity: { todaySq: post.todaySq }, 
        todayCommentsCreated: new Date().toISOString()
      });
      alert('댓글 작성이 성공했습니다.');
      // 새로 추가된 댓글을 포함한 댓글 리스트 업데이트
      setComments([...comments, response.data]);
      setNewComment(''); // 댓글 입력 필드 초기화
    } catch (error) {
      console.error('댓글 작성이 실패했습니다:', error);
      alert('댓글 작성을 실패했습니다.');
    }
  };
  const startUpdateComment = (comment) => {
    setUpdateCommentId(comment.todayCommentsSq);
    setUpdateCommentContent(comment.todayCommentsContents);
  };

  // 댓글 수정
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

  // 댓글 삭제
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
           {post.user.userID}: <p className={styles.modalDescription}>{post.todayContents}</p>
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
                        {isLoggedIn && comment.user.userId === sessionStorage.getItem('userId') && (
                          <>
                            <div className={styles.update} onClick={() => startUpdateComment(comment)}>수정</div>
                            <div className={styles.delete} onClick={() => deleteComment(comment.todayCommentsSq)}>삭제</div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.commentForm}>
              <div className={styles.heart} onClick={toggleLike}>
                {isLiked ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart /> } {likes}
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