import React, { useEffect, useState } from 'react';
import Loading from '../../components/common/Loading';
import api from '../../services/api';

const UserInfo = ({ onEditClick }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/user/{id}');
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
          <p>userId: {userInfo.userId}</p>
          <p>userSq: {userInfo.userSq}</p>
          <p>userName: {userInfo.userName}</p>
          <p>userEmail: {userInfo.userEmail}</p>
          <p>userAddress: {userInfo.userAddress}</p>
          <p>userAge: {userInfo.userAge}</p>
          <p>userPhone: {userInfo.userPhone}</p>
          <button onClick={onEditClick}>정보 수정</button>
        </>
      )}
    </div>
  );
};

export default UserInfo;
