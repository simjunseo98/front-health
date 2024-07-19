import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Loading from '../components/common/Loading';
import api from '../services/api';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const UserInfoTest = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await api.get('/users/1');
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getUserInfo();
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
      {userInfo ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>항목</th>
              <th>정보</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>아이디</td>
              <td>{userInfo.id}</td>
            </tr>
            <tr>
              <td>이름</td>
              <td>{userInfo.username}</td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>{userInfo.email}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>{userInfo.phone}</td>
            </tr>
            <tr>
              <td>주소</td>
              {/* <td>{userInfo.address}</td> */}
              <td>서울시 강남구</td>
            </tr>
            <tr>
              <td>나이</td>
              <td>27</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <p>사용자 정보가 없습니다.</p>
      )}
      <Button variant="primary" onClick={() => navigate('/mypage/userupdatetest')}>정보 수정</Button>
    </div>
  );
};

export default UserInfoTest;
