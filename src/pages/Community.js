import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import api from '../services/api';
import Table from 'react-bootstrap/Table';

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
    return <p>에러메세지: {error.message}</p>;
  }

  return (
    <div>
      <h2>커뮤니티 페이지입니다.(임시로 FakeAPi 연결)</h2>
      <div>
      <Table striped bordered hover>
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
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
              <td>{communityItem.title}</td>
              <td>{communityItem.price}</td>
              <td>{communityItem.category}</td>
              <td>{communityItem.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>  
    </div>
  );
};

export default Community;
