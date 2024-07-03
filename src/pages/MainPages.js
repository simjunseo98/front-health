import React, { useState, useEffect } from 'react';
import addToast from 'react-simple-toasts';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Home from '../components/common/CommonHome';
import Login from '../pages/Login';
import Challenge from './Challenge';
import Exercise from './Exercise';
import Food from './Food';
import Community from './Community';
import MyPage from './MyPage';
import styles from '../assets/styles/mainPage.module.scss';

const MainPages = () => {
  // MainPages 컴포넌트에서 상태를 관리할 useState 선언
  const [activePage, setActivePage] = useState('/');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 페이지 로딩 시 isLoggedIn 확인하여 showMessage 설정
    if (!isLoggedIn && activePage === '/mypage') {
      addToast('로그인 후 이용해 주십시오.', {
        type: 'error',
      });
    }
  }, [isLoggedIn, activePage]);

  // 상태에 따라 컴포넌트 렌더링 함수
  const renderPage = () => {
    switch (activePage) {
      case '/':
        return <Home />;
      case '/login':
        return <Login setLoggedIn={setIsLoggedIn} />;
      case '/challenge':
        return <Challenge />;
      case '/exercise':
        return <Exercise />;
      case '/food':
        return <Food />;
      case '/community':
        return <Community />;
      case '/mypage':
        return isLoggedIn ? <MyPage /> : <Login setLoggedIn={setIsLoggedIn} />; //메인페이지에서 컴포넌트로 뜨게 할지 로그인 페이지로 넘길지 고민중..
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <CommonHeader setActivePage={setActivePage} />
      <div className={styles.page}>
        {renderPage()}
      </div>
      <CommonFooter />
    </div>
  );
}

export default MainPages;
