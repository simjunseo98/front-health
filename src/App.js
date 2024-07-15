import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import MainPages from './pages/MainPages';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import UserInfo from './pages/UserInfo';
import UserUpdate from './pages/UserUpdate';
import Challenge from './pages/Challenge';
import Today from './pages/Today';
import Community from './pages/Community';
import SignUpTest from './pages/SignUpTest';  //Post 기능 확인용 테스트 클래스
import UserUpdateTest from './pages/UserUpdateTest';
import CommunityDetail from './pages/CommunityDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/userupdate" element={<UserUpdate />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/today" element={<Today />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/signuptest" element={<SignUpTest />} />
          <Route path="/userupdatetest/:id" element={<UserUpdateTest />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
