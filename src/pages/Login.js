import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-simple-toasts';
import Loading from '../components/common/Loading';
const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await api.post('/user/login', {
                id,
                password
            });

            console.log('Login successful:', response.data);
            // 로그인 성공 후 추가적인 처리
            const token = response.data.token;   //받은 토큰 저장
            sessionStorage.setItem('token', token)
            navigate('/')
        } catch (error) {
            console.error('Login error:', error);
            toast('로그인이 실패했습니다. >> ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
<div>
            {loading ? (
                <Loading /> 
            ) : (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Email:</label>
                        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                        <br />
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;
