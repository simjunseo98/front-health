import React from 'react';
import UserInfoTest from './UserInfoTest';
import { useNavigate } from 'react-router-dom';
import CommonSidebar from '../components/common/CommonSideBar';

const MyPage = () => {
  const navigate = useNavigate();

  const handleEditClick = (userInfo) => {
    navigate(`/userupdatetest/${userInfo.id}`);
  };

  return (
      <MyPageContainer>
        <CommonSidebar />
        {/* 마이페이지 컨텐츠 등 추가 */}
      </MyPageContainer>
    );
  };

export default MyPage;
