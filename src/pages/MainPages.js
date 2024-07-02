import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Home from '../components/common/CommonHome';
import Login from '../pages/Login';

const MainPages = () => {
  return (
    <div>
      <CommonHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <CommonFooter />
    </div>
  );
}

export default MainPages;
