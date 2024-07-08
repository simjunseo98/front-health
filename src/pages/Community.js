import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import api from '../services/api';
import styles from '../assets/styles/community.module.scss';

const Community = () => {
  const [community, setCommunity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCommunity = async () => {
      try {
        const response = await api.get('/products');
        setCommunity(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getCommunity();
  }, []);

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>에러메세지 : {error.message}</p>;
  }

  return (
    <div className={styles['community-container']}>
      <h2 className={styles['community-header']}>커뮤니티 페이지입니다.(임시로 FakeAPi 연결)</h2>
      <table className={styles['community-table']}>
        <thead>
          <tr>
            <th>이미지</th>
            <th>제목</th>
            <th>가격</th>
            <th>카테고리</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {community.map((communityItem) => (
            <tr key={communityItem.id}>
              <td>
                <img 
                  src={communityItem.image} 
                  alt={communityItem.title} 
                  className={styles['community-image']} 
                />
              </td>
              <td>{communityItem.title}</td>
              <td>{communityItem.price}</td>
              <td>{communityItem.category}</td>
              <td>{communityItem.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Community;
