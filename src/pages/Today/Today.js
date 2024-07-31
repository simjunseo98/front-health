import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { Card} from '../../components/common/Card';
import styles from '../../assets/styles/today/today.module.scss';
import CommonPagination from '../../components/common/CommonPagination';
import axios from 'axios';

const Today = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1); // 현재 페이지 상태
  const [postsPerPage] = useState(16); // 페이지당 게시물 수

  useEffect(() => {
    const getToday = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products', {
        
        });

        // 게시물과 총 게시물 수 설정

        setPosts(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        setError(error.message || '알 수 없는 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    getToday();
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
        <h2>오늘 운동 완! 📝</h2>
      </div>
      <Link to="/todaywrite" className="btn btn-primary">
          게시글작성
        </Link>
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
}

export default Today;
