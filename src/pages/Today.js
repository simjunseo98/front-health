// src/pages/Today.js
// import React, { useEffect, useState } from 'react';
// import Loading from '../components/common/Loading';
// import api from '../services/api';
// import { Card } from '../components/common/Card';
import styles from '../assets/styles/today.module.scss';

const Today = () => {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [selectedPost, setSelectedPost] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const getToday = async () => {
  //     try {
  //       const response = await api.get('/products');
  //       setPosts(response.data);
  //       console.log(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };
  //   getToday();
  // }, []);

  // const openModal = (post) => {
  //   setSelectedPost(post);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedPost(null);
  // };

  // if (loading) {
  //   return <div><Loading /></div>;
  // }

  // if (error) {
  //   return <p>에러메세지: {error.message}</p>;
  // }

  return (
    <div className={styles.todayWrapper}>
      <div className={styles.todayHeader}>
        <h2>오늘 운동 완! 📝</h2>
      </div>
      {/* <div className={styles.todayBody}>
        <div className={styles.cardList}>
        {posts.map ( post => (
          <div key={post.id} onClick={() => openModal(post)}>
            <Card post={post} />         
          </div>
          
        ))}
      </div>
      </div> */}
    </div>
  );
}

export default Today;
