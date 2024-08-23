import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/common/CommonHome';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import MyPage from './pages/Mypage/MyPage';
import UserInfo from './pages/Mypage/UserInfo';
import Today from './pages/Today/Today';
import Community from './pages/Community/Community';
import UserUpdate from './pages/Mypage/UserUpdate';
import CommunityDetail from './pages/Community/CommunityDetail';
import CommonHeader from './components/common/CommonHeader';
import CommonFooter from './components/common/CommonFooter';
import UserWrite from './pages/Mypage/UserWrite';
import UserWrite2 from './pages/Mypage/UserWrite2';
import CommunityWrite from './pages/Community/CommunityWrite';
import UserWriteUpdate from './pages/Mypage/UserWriteUpdate'
import PrivateRoute from './components/common/PrivateRoute';
import TodayWriteUpdate from './pages/Mypage/TodayWriteUpdate';
import TodayWrite from './pages/Today/TodayWrite';
import UserHeart from './pages/Mypage/UserHeart';
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
            <Route path="/today" element={<Today />} />
            <Route 
              path="/todaywrite" 
              element={
                <PrivateRoute>
                  <TodayWrite />
                </PrivateRoute>
              } 
            />
            <Route path="/community" element={<Community />} />
            <Route path="/community/communityDetail/:id" element={<CommunityDetail />} />
            <Route 
              path="/communitywrite" 
              element={
                <PrivateRoute>
                  <CommunityWrite />
                </PrivateRoute>
              } 
            />
            <Route path="/mypage" element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }>
              <Route index element={<Navigate to="/mypage/userinfo" />} />
              <Route path="userinfo" element={<UserInfo />} />
              <Route path="userupdate" element={<UserUpdate />} />
              <Route path="userwrite" element={<UserWrite />} />
              <Route path="userwrite2" element={<UserWrite2 />} />
              <Route path="todaywriteupdate/:id" element={<TodayWriteUpdate />} />
              <Route path="userwriteupdate/:id" element={<UserWriteUpdate />} />
              <Route path="userheart" element={<UserHeart />} />
            </Route>
          </Routes>
        </div>
        <CommonFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
