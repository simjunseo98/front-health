import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://ec2-43-201-150-178.ap-northeast-2.compute.amazonaws.com:8081/user/login', {
                id,
                password
            });

            console.log('Login successful:', response.data);
            // 로그인 성공 후 추가적인 처리 (예: 토큰 저장)
        } catch (error) {
            console.error('Login error:', error);
            // 에러 처리 (예: 오류 메시지 표시)
        }
    };

    return (
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
    );
};

export default Login;
