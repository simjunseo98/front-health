import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CommonSidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px', height: '110vh' }}>
      <NavLink to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi pe-none me-2" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">마이페이지</span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink 
            to="/mypage/userinfo" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link text-white'}
            aria-current="page"
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#home" />
            </svg>
            유저정보 테스트
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/mypage/userwrite2" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link text-white'}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            내가 작성한 게시글
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/mypage/userheart" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link text-white'}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#table" />
            </svg>
            내가 좋아요한 게시글
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/mypage/products" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link text-white'}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#grid" />
            </svg>
            내 운동계획
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default CommonSidebar;
