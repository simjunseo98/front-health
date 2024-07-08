import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import api from '../services/api';

const UserInfoTest = ({ onEditClick }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/products/1'); // 여기 부분은 로그인한 사용자 id로 들어가게 해야함
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>에러메세지 : {error.message}</p>;
  }

  return (
    <div>
      <h2>사용자 정보</h2>
      {userInfo && (
        <>
          <p>아이디: {userInfo.id}</p>
          <p>제목: {userInfo.title}</p>
          <p>가격: {userInfo.price}</p>
          <p>카테고리: {userInfo.category}</p>
          <p>설명: {userInfo.description}</p>
          <p>이미지: {userInfo.image}</p>
          <button onClick={() => onEditClick(userInfo)}>정보 수정</button>
        </>
      )}
    </div>
  );
};

export default UserInfoTest;
