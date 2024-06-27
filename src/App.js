import './App.css';
import { Routes, Route ,Link } from 'react-router-dom';
import MainPages from './pages/MainPages';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import UserInfo from './pages/UserInfo';
import UserUpdate from './pages/UserUpdate';

function App() {
  return (
    <div className="App">
      <nav>
          <Link to="/">홈</Link> | <Link to="/login">로그인</Link> | <Link to="/signup">회원가입</Link> | <Link to="/mypage">마이페이지</Link>
        </nav>
      <Routes>
          <Route path="/" element={<MainPages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/userupdate" element={<UserUpdate />} />
        </Routes>
    </div>
  );
}

export default App;
