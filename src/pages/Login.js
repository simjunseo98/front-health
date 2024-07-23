import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import api from '../services/api';
import axios from 'axios';
import toast from 'react-simple-toasts';
import styles from '../assets/styles/login.module.css';
import Loading from '../components/common/Loading';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const response = await api.post('/user/login', { id, password });
      const response = await axios.post('https://trendy-healthy-backend.store/jwt/authenticate', { id, password });
      console.log('Login successful:', response.data);
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast('로그인이 실패했습니다. >> ', error);
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
          <img className="mb-4" src="../assets/images/features-first-icon.png" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
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
            <label htmlFor="floatingPassword">Password</label>
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
          <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
