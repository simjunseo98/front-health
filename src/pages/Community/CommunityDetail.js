import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';
// import api from '../../services/api';
import axios from 'axios';
import styles from '../../assets/styles/community/communityDetail.module.scss';

const CommunityDetail = () => {
  const { id } = useParams();
  const [communityItem, setCommunityItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [comments, setComments] = useState([]);

  const formatDate = (isString) => {
    const date = new Date(isString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };


  useEffect(() => {
    const fetchCommunityItem = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setCommunityItem(response.data);
        // await api.post(`/community/${id}/check`);  커뮤니티 조회수 증가 요청 추후 api 연결 이후 사용 예정
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCommunityItem();

    // const fetchComments = async () => {
    //   try {
    //     const response = await api.get(`/comments/${id}`);
    //     setComments(response.data);
    //   } catch (error) {
    //     console.error('댓글을 불러오는데 실패했습니다.', error);
    //   }
    // };

    // fetchComments();
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
        <p><strong>작성자:</strong> {communityItem.userId}</p>
        <p><strong>작성일:</strong> {formatDate(communityItem.communityCreated)}</p>
        <p><strong>조회수:</strong> {communityItem.communityCheck}</p>
        <p><strong>추천수:</strong> {communityItem.communityRecommend}</p>
      </div>

      {/* CommunityComments TB (커뮤니티 댓글 테이블) */}
      <div className={styles.commentsSection}>
        <h3>댓글</h3>
        {/* comments.map((comment) => (
          <div key={comment.communityCommentsSq} className={styles.comment}>
            <p><strong>작성자:</strong> {comment.userId}</p>
            <p><strong>내용:</strong> {comment.communityCommentsContents}</p>
            <p><strong>작성날짜:</strong> {comment.communityCommentsCreated}</p>
          </div>
        )) */}
        <p>댓글 내용이 여기에 표시됩니다.</p>
      </div>
    </div>
  );
};

export default CommunityDetail;
