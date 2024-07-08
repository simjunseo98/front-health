import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-simple-toasts';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../services/api';

// 유효성 검사 스키마
const valid = yup.object().shape({
    title: yup.string().required('제목을 입력하세요'),
    price: yup.number().required('가격을 입력하세요').integer('가격은 정수여야 합니다'),
    description: yup.string().required('설명을 입력하세요'),
    image: yup.string().required('이미지 URL을 입력하세요'),
    category: yup.string().required('카테고리를 입력하세요')
});

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(valid)
    });

    const onSubmit = async (data) => {
        try {
            const response = await api.post('/products', data);
            console.log('제품 추가 성공 :', response.data);
            toast('제품이 성공적으로 추가되었습니다.');
            navigate('/');
        } catch (error) {
            console.error('제품 추가 실패 :', error);
            toast('제품 추가에 실패했습니다.');
        }
    };

    return (
        <div>
            <h2>제품 추가</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">제목 :</label>
                    <input type="text" id="title" {...register('title')} />
                    <p>{errors.title?.message}</p>
                </div>
                <div>
                    <label htmlFor="price">가격 :</label>
                    <input type="number" id="price" {...register('price')} />
                    <p>{errors.price?.message}</p>
                </div>
                <div>
                    <label htmlFor="description">설명 :</label>
                    <input type="text" id="description" {...register('description')} />
                    <p>{errors.description?.message}</p>
                </div>
                <div>
                    <label htmlFor="image">이미지 :</label>
                    <input type="text" id="image" {...register('image')} />
                    <p>{errors.image?.message}</p>
                </div>
                <div>
                    <label htmlFor="category">카테고리 :</label>
                    <input type="text" id="category" {...register('category')} />
                    <p>{errors.category?.message}</p>
                </div>
                <button type="submit">추가하기</button>
            </form>
        </div>
    );
};

export default Signup;
