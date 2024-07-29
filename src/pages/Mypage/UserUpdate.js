import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../services/api'

// 유효성 검사 스키마 정의
const schema = yup.object().shape({
    password: yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다'),
    userName: yup.string().required('이름을 입력하세요'),
    userEmail: yup.string().email('유효한 이메일을 입력하세요').required('이메일을 입력하세요'),
    userAddress: yup.string().required('주소를 입력하세요'),
    userAge: yup.number().typeError('나이는 숫자여야 합니다').positive('유효한 나이를 입력하세요').integer('나이는 정수여야 합니다'),
    userPhone: yup.string().matches(/^\d{10,11}$/, '유효한 전화번호를 입력하세요').required('전화번호를 입력하세요')
});

const UserUpdate = ({ onCancel }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        // 사용자 정보를 가져와서 초기값으로 설정 (실제로는 API 요청을 통해 데이터를 가져와야 함)
        const userData = {
            userName: '홍길동',
            userEmail: 'hong@example.com',
            userAddress: '서울시 강남구',
            userAge: 30,
            userPhone: '010-1234-5678'
        };
        setValue('userName', userData.userName);
        setValue('userEmail', userData.userEmail);
        setValue('userAddress', userData.userAddress);
        setValue('userAge', userData.userAge);
        setValue('userPhone', userData.userPhone);
    }, [setValue]);

    const onSubmit = async (data) => {
        // confirmPassword 필드를 data 객체에서 제거합니다.
        const { confirmPassword, ...updateData } = data;

        try {
            const response = await api.post('/user/update', updateData);
            console.log('정보 수정 성공 :', response.data);
            // 정보 수정 성공 후 추가적인 처리 (예: 성공 메시지 표시)
        } catch (error) {
            console.error('정보 수정 실패 :', error);
        }
    };

    return (
        <div>
            <h2>정보 수정</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>비밀번호 :</label>
                    <input type="password" {...register('password')} />
                    <p>{errors.password?.message}</p>
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
                <button type="submit">Update</button>
                <button type="button" onClick={onCancel}>취소</button>
            </form>
        </div>
    );
};

export default UserUpdate;
