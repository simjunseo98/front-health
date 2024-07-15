import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import api from '../services/api';

const UserInfoTest = ({ onEditClick }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/products/1');
        setUsers(response.data);
        console.log(response.data);
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
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.userId}>
            <p>아이디: {user.userId}</p>
            <p>비밀번호: {user.userPw}</p>
            <p>이름: {user.userName}</p>
            <p>이메일: {user.userEmail}</p>
            <p>주소: {user.userAddress}</p>
            <p>나이: {user.userAge}</p>
            <p>폰 번호: {user.userPhone}</p>
            <button onClick={() => onEditClick(user)}>정보 수정</button>
            <hr />
          </div>
        ))
      ) : (
        <p>사용자 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default UserInfoTest;
