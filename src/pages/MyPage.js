import React from 'react';
import { Outlet } from 'react-router-dom';
import CommonSidebar from '../components/common/CommonSideBar';
import styles from '../assets/styles/mypage.module.css';

const MyPage = () => {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.sidebar}>
        <CommonSidebar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default MyPage;
