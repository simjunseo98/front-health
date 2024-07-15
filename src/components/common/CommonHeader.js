import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CommonHeader({ setActivePage, setLoggedIn }) {
  const [activeLink, setActiveLink] = useState('/');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 링크 클릭 시 상태 변경 함수
  const handleLinkClick = (path) => {
    setActiveLink(path); // 클릭된 링크의 path로 상태 업데이트
    setActivePage(path); // 메인페이지에 상태 전달
  };

  // 로그아웃 로직 추가
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setLoggedIn(false); //부모컴포넌트에서 로그인 상태 업데이트
  }

  return (//header-area 에서 네비색상 변경
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <div onClick={() => handleLinkClick('/')} className="logo" style={{ cursor: 'pointer' }}>
                Healthy<em> Life</em>
              </div>
              <ul className="nav">
                <li><div onClick={() => handleLinkClick('/')} className={`scroll-to-section ${activeLink === '/' ? 'active' : ''}`}>Home</div></li>
                <li><div onClick={() => handleLinkClick('/challenge')} className={`scroll-to-section ${activeLink === '/challenge' ? 'active' : ''}`}>Challenge</div></li>
                <li><div onClick={() => handleLinkClick('/today')} className={`scroll-to-section ${activeLink === '/exercise' ? 'active' : ''}`}>Today's</div></li>
                <li><div onClick={() => handleLinkClick('/community')} className={`scroll-to-section ${activeLink === '/community' ? 'active' : ''}`}>Community</div></li>
                <li><div onClick={() => handleLinkClick('/mypage')} className={`scroll-to-section ${activeLink === '/mypage' ? 'active' : ''}`}>MyPage</div></li>
                <li><Link to="/mypage">마이페이지 테스트</Link></li>
                {isLoggedIn ? (
                  <li className="main-button"><button onClick={handleLogout}>로그아웃</button></li>
                ) : (
                  <li className="main-button"><Link to="/login">로그인</Link></li>
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
