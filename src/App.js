import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/common/CommonHome';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import MyPage from './pages/Mypage/MyPage';
import UserInfo from './pages/Mypage/UserInfo';
import UserUpdate from './pages/Mypage/UserUpdate';
import Challenge from './pages/Challenge';
import Today from './pages/Today';
import Community from './pages/Community/Community';
import UserUpdateTest from './pages/Mypage/UserUpdateTest';
import CommunityDetail from './pages/Community/CommunityDetail';
import UserInfoTest from './pages/Mypage/UserInfoTest';
import CommonHeader from './components/common/CommonHeader';
import CommonFooter from './components/common/CommonFooter';
import UserWrite from './pages/Mypage/UserWrite';
import CommunityWrite from './pages/Community/CommunityWrite';
import UserWriteUpdate from './pages/Mypage/UserWriteUpdate'
//css
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
            <Route path="/userupdate" element={<UserUpdate />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/today" element={<Today />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/communitywrite" element={<CommunityWrite />} />
            {/* 마이페이지 중첩라우팅 */}
            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<Navigate to="/mypage/userinfotest" />} />
              <Route path="userinfotest" element={<UserInfoTest />} />
              <Route path="userinfo" element={<UserInfo />} />
              <Route path="userupdatetest" element={<UserUpdateTest />} />
              <Route path="userwrite" element={<UserWrite />} />
              <Route path="userwriteupdate/:id" element={<UserWriteUpdate />} />
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
