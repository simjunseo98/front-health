import axios from 'axios';

const baseURL = 'https://trendy-healthy-backend.store'; 

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
            console.log('헤더에 추가된 토큰 :', token);
        }
        // // 모든 요청에 대해 Content-Type을 설정
        // config.headers['Content-Type'] = 'application/json; charset=utf-8';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
