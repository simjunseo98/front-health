import React from 'react'
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/font-awesome.css';
import '../../assets/css/templatemo-training-studio.css';
import gymImage from '../../assets/images/gymBoxx.png';

function CommonMainBanner() {
  return (
    <div className="main-banner" id="top">
        <img src={gymImage} alt="Gym Background" id="bg-video" />
        <div className="video-overlay header-text">
            <div className="caption">
                <h6>work harder, get stronger</h6>
                <h2>easy with our <em>gym</em></h2>
                <div className="main-button scroll-to-section">
                    <a href="signup">회원가입</a>
                </div>
            </div>
        </div>
    </div>
 );
}


export default CommonMainBanner