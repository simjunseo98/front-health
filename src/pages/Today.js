import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import api from '../services/api';
import { Card } from '../components/common/Card';
import styles from '../assets/styles/today.module.scss';
import CommonPagination from '../components/common/CommonPagination';

const Today = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1); // 현재 페이지 상태
  const [postsPerPage] = useState(20); // 페이지당 게시물 수
  const [totalPosts, setTotalPosts] = useState(0); // 전체 게시물 수

  useEffect(() => {
    const getToday = async () => {
      try {
        const response = await api.get('/products', {
          params: {
            page: activePage,
            limit: postsPerPage,
          },
        });

        // 게시물과 총 게시물 수 설정
        const fetchedPosts = response.data || [];
        const total = parseInt(response.headers['x-total-count']) || fetchedPosts.length; // 총 게시물 수

        setPosts(fetchedPosts);
        setTotalPosts(total);
        setLoading(false);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        setError(error.message || '알 수 없는 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    getToday();
  }, [activePage, postsPerPage]); // activePage나 postsPerPage가 변경될 때마다 호출

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
        <h2>오늘 운동 완! 📝</h2>
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
        totalItemsCount={totalPosts}
        pageRangeDisplayed={5}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default Today;
