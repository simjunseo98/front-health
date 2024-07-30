import axios from 'axios';

// const baseURL = 'https://fakestoreapi.com'; //서버 연결전까지 사용할 fakeApi
const baseURL = 'https://trendy-healthy-backend.store'; //서버 연결 후 사용할 APi

const api = axios.create({
    baseURL: baseURL,
    timeout: 30000, 
});

// 요청 인터셉터 설정: 헤더에 토큰 추가
api.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('Token attached to headers:', token);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
