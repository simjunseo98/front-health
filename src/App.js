import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/common/CommonHome';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import UserInfo from './pages/UserInfo';
import UserUpdate from './pages/UserUpdate';
import Challenge from './pages/Challenge';
import Today from './pages/Today';
import Community from './pages/Community';
import SignUpTest from './pages/SignUpTest';  // Post 기능 확인용 테스트 클래스
import UserUpdateTest from './pages/UserUpdateTest';
import CommunityDetail from './pages/CommunityDetail';
import UserInfoTest from './pages/UserInfoTest';
import CommonHeader from './components/common/CommonHeader';
import CommonFooter from './components/common/CommonFooter';
import styles from './assets/styles/layout.module.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CommonHeader />
        <div className={styles.mainLayout}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/userupdate" element={<UserUpdate />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/today" element={<Today />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/signuptest" element={<SignUpTest />} />
            <Route path="/userupdatetest/:id" element={<UserUpdateTest />} />
            {/* 마이페이지 중첩라우팅 */}
            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<Navigate to="/mypage/userinfotest" />} />
              <Route path="userinfotest" element={<UserInfoTest />} />
              {/* 필요한 다른 서브 페이지들 추가 */}
            </Route>
          </Routes>
        </div>
        <CommonFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
