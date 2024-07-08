import React from 'react';
import UserInfoTest from './UserInfoTest';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/layout.module.scss';

const MyPage = () => {
  const navigate = useNavigate();

  const handleEditClick = (userInfo) => {
    navigate(`/userupdatetest/${userInfo.id}`);
  };

  return (
    <div className={styles['layout-container']}>
      <div className={styles['layout-content']}>
        <h1>마이페이지</h1>
        <UserInfoTest onEditClick={handleEditClick} />
      </div>
    </div>
  );
};

export default MyPage;
