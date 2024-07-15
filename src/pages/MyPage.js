import React from 'react';
// import UserInfoTest from './UserInfoTest';
import { useNavigate } from 'react-router-dom';
import CommonSidebar from '../components/common/CommonSideBar';

const MyPage = () => {
  const navigate = useNavigate();

  const handleEditClick = (userInfo) => {
    navigate(`/userupdatetest/${userInfo.id}`);
  };

  return (
        <CommonSidebar />
    );
  };

export default MyPage;
