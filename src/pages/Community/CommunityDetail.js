import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import styles from '../../assets/styles/community/communityDetail.module.scss';
import api from '../../services/api';

const CommunityDetail = () => {
  const { id } = useParams();
  const [communityItem, setCommunityItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  useEffect(() => {
    const fetchCommunityItem = async () => {
      try {
        const response = await api.get(`/community/communityDetail/${id}`);
        setCommunityItem(response.data);
        await api.post(`/community/view/${id}`);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCommunityItem();

  }, [id]);

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>에러메세지: {error.message}</p>;
  }

  return (
    <div className={styles.communityDetail}>
      {/* Community TB (커뮤니티 테이블) */}
      <div className={styles.communityInfo}>
        <h3>커뮤니티 정보</h3>
        <p><strong>커뮤니티 고유번호:</strong> {communityItem.communitySq}</p>
        <p><strong>글제목:</strong> {communityItem.communityTitle}</p>
        <p><strong>글내용:</strong> {communityItem.communityContents}</p>
        <p><strong>작성자:</strong> {communityItem.user.userId}</p>
        <p><strong>작성일:</strong> {formatDate(communityItem.communityCreated)}</p>
        <p><strong>조회수:</strong> {communityItem.communityview}</p>
        <p><strong>추천수:</strong> {communityItem.communityRecommend}</p>
      </div>

      <div className={styles.commentsSection}>
        <h3>댓글</h3>
        {communityItem.comments && communityItem.comments.length > 0 ? (
          communityItem.comments.map((comment) => (
            <div key={comment.communityCommentsSq} className={styles.comment}>
              <p><strong>작성자:</strong> {comment.user.userId}</p>
              <p><strong>내용:</strong> {comment.communityCommentsContents}</p>
              <p><strong>작성날짜:</strong> {formatDate(comment.communityCommentsCreated)}</p>
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CommunityDetail;
