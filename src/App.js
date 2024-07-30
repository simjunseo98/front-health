import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/common/CommonHome';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import MyPage from './pages/Mypage/MyPage';
import UserInfo from './pages/Mypage/UserInfo';
import Challenge from './pages/Challenge';
import Today from './pages/Today/Today';
import Community from './pages/Community/Community';
import UserUpdate from './pages/Mypage/UserUpdate';
import CommunityDetail from './pages/Community/CommunityDetail';
import CommonHeader from './components/common/CommonHeader';
import CommonFooter from './components/common/CommonFooter';
import UserWrite from './pages/Mypage/UserWrite';
import CommunityWrite from './pages/Community/CommunityWrite';
import UserWriteUpdate from './pages/Mypage/UserWriteUpdate'
//css
import styles from './assets/styles/layout.module.scss';
import TodayWrite from './pages/Today/TodayWrite';

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
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/today" element={<Today />} />
            <Route path="/todaywrite" element={<TodayWrite />}/>
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/communitywrite" element={<CommunityWrite />} />
            {/* 마이페이지 중첩라우팅 */}
            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<Navigate to="/mypage/userinfo" />} />
              <Route path="userinfo" element={<UserInfo />} />
              <Route path="userupdate" element={<UserUpdate />} />
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
