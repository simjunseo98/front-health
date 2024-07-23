import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function CommonHeader() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그아웃 로직 추가
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    location('/')
  }

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link to="/" className="logo" style={{ cursor: 'pointer' }}>
                Healthy<em> Life</em>
              </Link>
              <ul className="nav">
                <li>
                  <Link to="/" className={`scroll-to-section ${location.pathname === '/' ? 'active' : ''}`}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/challenge" className={`scroll-to-section ${location.pathname === '/challenge' ? 'active' : ''}`}>
                    Challenge
                  </Link>
                </li>
                <li>
                  <Link to="/today" className={`scroll-to-section ${location.pathname === '/today' ? 'active' : ''}`}>
                    Today's
                  </Link>
                </li>
                <li>
                  <Link to="/community" className={`scroll-to-section ${location.pathname === '/community' ? 'active' : ''}`}>
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/mypage" className={`scroll-to-section ${location.pathname.startsWith('/mypage') ? 'active' : ''}`}>
                    MyPage
                  </Link>
                </li>
                {isLoggedIn ? (
                  <li className="main-button">
                    <button onClick={handleLogout}>로그아웃</button>
                  </li>
                ) : (
                  <li className="main-button">
                    <Link to="/login" className='scroll-to-section'>
                      로그인
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CommonHeader;
