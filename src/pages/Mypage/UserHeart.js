import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import api from '../../services/api';
import { Card } from '../../components/common/Card';
import CommonPagination from '../../components/common/CommonPagination';
import styles from '../../assets/styles/userHeart.module.scss';

const UserHeart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState(1); // 현재 페이지 상태
  const [postsPerPage] = useState(16); // 페이지당 게시물 수

  useEffect(() => {
    const getUserHeart = async () => {
      try {
        const response = await api.get('/products', {
          // 필요한 경우 사용자 ID 등을 쿼리 파라미터로 전달
        });

        // 좋아요가 된 게시물만 필터링
        const likedPosts = response.data.filter(posts => posts.isLiked);

        setPosts(likedPosts || []);
        setLoading(false);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        setError(error.message || '알 수 없는 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    getUserHeart();
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>에러메세지: {error}</p>;
  }

  // 페이지에 맞는 게시물 계산
  const indexOfLastItem = activePage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.todayWrapper}>
      <div className={styles.todayHeader}>
        내가 좋아요한 게시물
      </div>
      <div className={styles.todayBody}>
        <div className={styles.cardList}>
          {currentItems.length > 0 ? (
            currentItems.map(post => (
              <div key={post.id}>
                <Card post={post} />
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
      <CommonPagination
        activePage={activePage}
        itemsCountPerPage={postsPerPage}
        totalItemsCount={posts.length}
        pageRangeDisplayed={5}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default UserHeart;
