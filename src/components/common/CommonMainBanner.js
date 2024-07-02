import React from 'react'
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/font-awesome.css';
import '../../assets/css/templatemo-training-studio.css';

function CommonMainBanner() {
  return (
    <div className="main-banner" id="top">
        <video autoplay muted loop id="bg-video">
            <source src="../assets/images/gym-video.mp4" type="video/mp4" />
        </video>

        <div className="video-overlay header-text">
            <div className="caption">
                <h6>work harder, get stronger</h6>
                <h2>easy with our <em>gym</em></h2>
                <div className="main-button scroll-to-section">
                    <a href="#features">회원가입</a>
                </div>
            </div>
        </div>
    </div>
 );
}


export default CommonMainBanner