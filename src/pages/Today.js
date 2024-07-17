// src/pages/Today.js
import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import api from '../services/api';
import { Card } from '../components/common/Card';
import styles from '../assets/styles/today.module.scss';
// import CommonPagination from '../components/common/CommonPagination';

const Today = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedPost, setSelectedPost] = useState(null);  주석친 부분을 현재 사용하지 않고 있어서 빌드 실패나는거- 두환
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [page, setPage] = useState(1);
  // const [itemsPerPage] = useState(5);
  // const [search, setSearch] = useState('');   // 검색어 상태
  // const [searchResult, setSearchResult] = useState([]); // 검색결과 상태

  useEffect(() => {
    const getToday = async () => {
      try {
        const response = await api.get('/products');
        setPosts(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    getToday();
  }, []);
  
  // useEffect(() => {
  //   const filtered = posts.filter((item) =>
  //     item.title.toLowerCase().includes(search.toLowerCase())
  //   );
  //   setSearchResult(filtered);
  //   setPage(1); 
  // }, [search, posts]);

  // const openModal = (post) => {
  //   setSelectedPost(post);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedPost(null);
  // };
  // const handlePageChange = (pageNumber) => {
  //   setPage(pageNumber);
  // };


  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>에러메세지: {error.message}</p>;
  }

  return (
    <div className={styles.todayWrapper}>
      <div className={styles.todayHeader}>
        <h2>오늘 운동 완! 📝</h2>
      </div>
      
      <div className={styles.todayBody}>
        <div className={styles.cardList}>
        {posts.map ( post => (
          // <div key={post.id} onClick={() => openModal(post)}> //잠깐 지울려고 밑에 div 하나더 만들었어 
          <div>
            <Card post={post} />         
          </div>
          
        ))}
      </div>
      {/* <div className={styles.paginationContainer}>
        <CommonPagination
          activePage={page}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={searchResult.length}
          pageRangeDisplayed={5}
          handlePageChange={handlePageChange}
        />
      </div> */}
      </div>
    </div>
  );
}

export default Today;
