import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-simple-toasts';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; // 간결한 코드작성을 위해 form 관련 라이브러리인 yup 사용
import axios from 'axios';

// 유효성 검사
const valid = yup.object().shape({
    userId: yup.string().required('ID를 입력하세요'),
    userPw: yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다').required('비밀번호를 입력하세요'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('userPw'), null], '비밀번호가 일치하지 않습니다')
        .required('비밀번호 확인을 입력하세요'),
    userName: yup.string().required('이름을 입력하세요'),
    userEmail: yup.string().email('유효한 이메일을 입력하세요').required('이메일을 입력하세요'),
    userAddress: yup.string().required('주소를 입력하세요'),
    userAge: yup.number().typeError('나이는 숫자여야 합니다').required('나이를 입력하세요').positive('유효한 나이를 입력하세요').integer('나이는 정수여야 합니다'),
    userPhone: yup.number().typeError('유효한 전화번호를 입력하세요').required('전화번호를 입력하세요')
});

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(valid)
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://trendy-healthy-backend.store/user/signup', data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log('회원가입 성공 :', response.data);
            toast('회원가입에 성공했습니다.', response.data);
            navigate('/login');
        } catch (error) {
            console.error('회원가입 실패 :', error);
            toast('회원가입에 실패했습니다.', error);
            console.log(data);
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>아이디 :</label>
                    <input type="text" {...register('userId')} />
                    <p>{errors.userId?.message}</p>
                </div>
                <div>
                    <label>비밀번호 :</label>
                    <input type="password" {...register('userPw')} />
                    <p>{errors.userPw?.message}</p>
                </div>
                <div>
                    <label>비밀번호 확인 :</label>
                    <input type="password" {...register('confirmPassword')} />
                    <p>{errors.confirmPassword?.message}</p>
                </div>
                <div>
                    <label>이름 :</label>
                    <input type="text" {...register('userName')} />
                    <p>{errors.userName?.message}</p>
                </div>
                <div>
                    <label>이메일 :</label>
                    <input type="email" {...register('userEmail')} />
                    <p>{errors.userEmail?.message}</p>
                </div>
                <div>
                    <label>주소 :</label>
                    <input type="text" {...register('userAddress')} />
                    <p>{errors.userAddress?.message}</p>
                </div>
                <div>
                    <label>나이 :</label>
                    <input type="number" {...register('userAge')} />
                    <p>{errors.userAge?.message}</p>
                </div>
                <div>
                    <label>전화번호 :</label>
                    <input type="text" {...register('userPhone')} />
                    <p>{errors.userPhone?.message}</p>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
