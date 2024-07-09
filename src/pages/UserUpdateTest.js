import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/common/Loading';

// 유효성 검사 스키마 정의
const schema = yup.object().shape({
  id: yup.string().required('ID를 입력하세요.'),
  title: yup.string().required('제목을 입력하세요.'),
  price: yup.number().typeError('가격은 숫자여야 합니다.')  // 숫자형 필드로 정의
    .required('가격을 입력하세요').positive('가격은 양수여야 합니다'),
  category: yup.string().required('카테고리를 입력하세요.'),
  description: yup.string().required('설명을 입력하세요.'),
  image: yup.string().required('이미지 URL을 입력하세요.'),
});

const UserUpdateTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [userInfo, setUserInfo] = useState(null); // userInfo 상태 추가

  useEffect(() => {
    // 초기 데이터 설정
    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        const userData = response.data;
        setUserInfo(userData); // userInfo 설정
        setValue('id', userData.id);
        setValue('title', userData.title);
        setValue('price', userData.price);
        setValue('category', userData.category);
        setValue('description', userData.description);
        setValue('image', userData.image);
      } catch (error) {
        console.error('사용자 정보를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchUserInfo();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedFields = {}; // 변경된 필드들은 변경된 값을 담고 변경되지 않은 필드들은 기존값을 담는다.
  
      if (userInfo.id !== null) 
        updatedFields.id = userInfo.id;

      if (data.title !== userInfo.title) {
        updatedFields.title = data.title;
      } else {
        updatedFields.title = userInfo.title; 
      }
  
      if (data.price !== userInfo.price) {
        updatedFields.price = data.price;
      } else {
        updatedFields.price = userInfo.price; 
      }
  
      if (data.category !== userInfo.category) {
        updatedFields.category = data.category;
      } else {
        updatedFields.category = userInfo.category; 
      }
  
      if (data.description !== userInfo.description) {
        updatedFields.description = data.description;
      } else {
        updatedFields.description = userInfo.description; 
      }
  
      if (data.image !== userInfo.image) {
        updatedFields.image = data.image;
      } else {
        updatedFields.image = userInfo.image;
      }
  
      // 변경된 필드가 있을 때만 API 요청
      if (Object.keys(updatedFields).length > 0) {
        console.log('변경된 값들 :' ,updatedFields )
        const response = await api.put(`/products/${id}`, updatedFields); 
        console.log('정보 수정 성공 :', response.data);
        alert('업데이트 성공~!');
      } else {
        console.log('변경된 필드가 없습니다.');
      }
  
      navigate('/'); 
    } catch (error) {
      console.error('정보 수정 실패 :', error);
      alert('업데이트 실패~!');
    }
  };
  

  if (!userInfo) {
    return <div><Loading /></div>;
  }

  return (
    <div>
      <h2>정보 수정</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>아이디 :</label>
          <input type="text" {...register('id')} defaultValue={userInfo.id} readOnly />
          <p>{errors.id?.message}</p>
        </div>
        <div>
          <label>제목 :</label>
          <input type="text" {...register('title')} defaultValue={userInfo.title} />
          <p>{errors.title?.message}</p>
        </div>
        <div>
          <label>가격 :</label>
          <input type="text" {...register('price')} defaultValue={userInfo.price} />
          <p>{errors.price?.message}</p>
        </div>
        <div>
          <label>카테고리 :</label>
          <input type="text" {...register('category')} defaultValue={userInfo.category} />
          <p>{errors.category?.message}</p>
        </div>
        <div>
          <label>설명 :</label>
          <input type="text" {...register('description')} defaultValue={userInfo.description} />
          <p>{errors.description?.message}</p>
        </div>
        <div>
          <label>이미지 :</label>
          <input type="text" {...register('image')} defaultValue={userInfo.image} />
          <p>{errors.image?.message}</p>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserUpdateTest;
