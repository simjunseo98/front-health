// CommonSidebar.js

import React from 'react';
import styles from '../../assets/styles/sidebar.module.css'; // CSS 모듈 import

const CommonSidebar = () => {
  return (
    <div className={`${styles.sidebar} d-flex flex-column flex-shrink-0 p-3 text-white bg-dark`} style={{ width: '280px' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"/>
        </svg>
        <span className="fs-4">사이드바 1</span>
      </a>
      <hr/>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#home"/>
            </svg>
            홈
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-dark">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"/>
            </svg>
            대시보드
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-dark">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#moon-stars-fill"/>
            </svg>
            비주얼라이저
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-dark">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#sun-fill"/>
            </svg>
            디자인
          </a>
        </li>
        <li>
          <a href="#" className="nav-link link-dark">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"/>
            </svg>
            대시보드 2
          </a>
        </li>
      </ul>
      <hr/>
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser2">
          <li><a className="dropdown-item" href="#">새로운 기능</a></li>
          <li><a className="dropdown-item" href="#">설정</a></li>
          <li><a className="dropdown-item" href="#">로그아웃</a></li>
        </ul>
      </div>
    </div>
  );
};

export default CommonSidebar;
