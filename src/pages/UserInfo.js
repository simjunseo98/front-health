import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import api from '../services/api';

const UserInfo = ({ onEditClick }) => {
  const [usersInfo, setUsersInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        const response = await api.get('/user/all');
        setUsersInfo(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error); 
        setLoading(false);
      }
    };

    fetchUsersInfo();

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
      {usersInfo.map((userInfo) => (
        <div key={userInfo.userSq}>
          <p>이름: {userInfo.userName}</p>
          <p>이메일: {userInfo.userEmail}</p>
          <p>주소: {userInfo.userAddress}</p>
          <p>나이: {userInfo.userAge}세</p>
          <p>전화번호: {userInfo.userPhone}</p>
          <button onClick={onEditClick}>정보 수정</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default UserInfo;
