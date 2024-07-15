import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/common/Loading';
import api from '../services/api';

const CommunityDetail = () => {
  const { id } = useParams();
  const [communityItem, setCommunityItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommunityItem = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setCommunityItem(response.data);
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
    <div>
      <h2>글 상세 페이지</h2>
      <img src={communityItem.image} alt={communityItem.title} style={{ width: '100px', height: '100px' }} />
      <h3>{communityItem.title}</h3>
      <p>가격: {communityItem.price}</p>
      <p>카테고리: {communityItem.category}</p>
      <p>{communityItem.description}</p>
    </div>
  );
};

export default CommunityDetail;
