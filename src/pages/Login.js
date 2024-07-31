import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/login.module.css';
import Loading from '../components/common/Loading';
import Logo from '../assets/images/dumbel.jpg';
import api from '../services/api';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/jwt/authenticate',
        null,
        {
          params: { username: id, password: password },
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log('Login successful:', response.data);
      const { 'access-token': accessToken } = response.data;
      sessionStorage.setItem('token', accessToken);

      console.log('Stored token:', sessionStorage.getItem('token'));
      // 확인
      console.log('Setting isLoggedIn to true');
      setIsLoggedIn(true);

      // 확인
      console.log('Navigating to /');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('로그인이 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  return (
    <div className={styles['login-container']}>
      <main className={styles['form-signin']}>
        <form onSubmit={handleSubmit}>
          <img src={Logo} alt="Logo" />
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor="floatingInput">아이디</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">패스워드</label>
          </div>
          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">로그인</button>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
