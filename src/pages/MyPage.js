import React from 'react';
import UserInfoTest from './UserInfoTest';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  const handleEditClick = (userInfo) => {
    navigate(`/userupdatetest/${userInfo.id}`);
  };

  return (
    <div>
      <h1>마이페이지</h1>
      <UserInfoTest onEditClick={handleEditClick} />
    </div>
  );
};

export default MyPage;
