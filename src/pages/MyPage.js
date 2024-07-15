import React from 'react';
import { Outlet } from 'react-router-dom';
import CommonSidebar from '../components/common/CommonSideBar';
import '../assets/styles/mypage.module.css';

const MyPage = () => {
  return (
    <div className="d-flex">
      <CommonSidebar />
      <div className="flex-grow-1 p-3">
        <h1>My Page</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default MyPage;
