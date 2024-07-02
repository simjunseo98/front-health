import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading'
import api from '../services/api';

const UserInfo = ({ onEditClick }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/api/v1/user/user/all');
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
          <p>이름: {userInfo.name}</p>
          <p>이메일: {userInfo.email}</p>
          <p>주소: {userInfo.address.city} {userInfo.address.street}</p>
          <p>나이: {userInfo.age}세</p>
          <p>전화번호: {userInfo.phone}</p>
          <button onClick={onEditClick}>정보 수정</button>
        </>
      )}
    </div>
  );
};

export default UserInfo;
