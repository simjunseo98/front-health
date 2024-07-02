import React from 'react';
import { Link } from 'react-router-dom';

function CommonHeader() {
    return (//header-area 에서 네비색상 변경
        <header className="header-area header-sticky">  
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="main-nav">
                            <Link to="/" className="logo">Healthy<em> Life</em></Link>
                            <ul className="nav">
                                <li><Link to="/" className="scroll-to-section">Home</Link></li>
                                <li><Link to="/challenge" className="scroll-to-section">Challenge</Link></li>
                                <li><Link to="/classes" className="scroll-to-section">Classes</Link></li>
                                <li><Link to="/schedules" className="scroll-to-section">Schedules</Link></li>
                                <li className="main-button"><Link to="/login">로그인</Link></li>
                            </ul>
                            <a className='menu-trigger'>
                                <span>Menu</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default CommonHeader;
