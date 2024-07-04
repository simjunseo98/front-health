import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import MainPages from './pages/MainPages';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import UserInfo from './pages/UserInfo';
import UserUpdate from './pages/UserUpdate';
import Challenge from './pages/Challenge';
import Exercise from './pages/Exercise';
import Food from './pages/Food';
import Community from './pages/Community';

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
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/food" element={<Food />} />
          <Route path="/community" element={<Community />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
