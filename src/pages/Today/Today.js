import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { Card } from '../../components/common/Card';
import styles from '../../assets/styles/today/today.module.scss';
import CommonPagination from '../../components/common/CommonPagination';
import api from '../../services/api';

const Today = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const postsPerPage = 16;

  const getToday = useCallback(async () => {
    try {
      const response = await api.get('/today/all');
      const sortedPosts = response.data.sort((a, b) => new Date(b.todayCreated) - new Date(a.todayCreated));
      setPosts(sortedPosts);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setError(error.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getToday();
  }, [getToday]);

  const handlePageChange = (pageNumber) => setActivePage(pageNumber);

  if (loading) return <Loading />;
  if (error) return <p>에러메세지: {error}</p>;

  const indexOfLastItem = activePage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.todayWrapper}>
      <div className={styles.todayHeader}>
      <Link to="/todaywrite" className={styles.writeButton}>
      📝-작성 버튼
      </Link>
      </div>
      <div className={styles.todayBody}>
        <div className={styles.cardList}>
          {currentItems.length > 0 ? (
            currentItems.map(post => <Card key={post.id} post={post} />)
          ) : (
            <p>게시글이 없습니다.</p>
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

export default React.memo(Today);
