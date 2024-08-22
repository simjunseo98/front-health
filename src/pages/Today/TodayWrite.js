import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../../services/api';
import styles from '../../assets/styles/today/todayWrite.module.scss';

const TodayWrite = () => {
  const [todayImage, setTodayImage] = useState(null); // 이미지 파일을 저장할 상태
  const [todayContents, setTodayContents] = useState('');
  const [userId, setUserId] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // 이미지 미리보기를 저장할 상태
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromSession = sessionStorage.getItem('userId');
    if (userIdFromSession) {
      setUserId(userIdFromSession);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTodayImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // 파일 읽기가 완료되면 미리보기 설정
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    } else {
      setTodayImage(null);
      setImagePreview('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('content', todayContents);
    if (todayImage) {
      formData.append('file', todayImage);
    }
  
    try {
      await api.post('/today/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('게시물 작성이 완료되었습니다.');
      navigate('/today/register');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('게시물 작성을 실패하였습니다.');
    }
  };
  

  return (
    <Container className={styles.createPostContainer}>
      <h2>게시글 작성</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUserId">
          <Form.Label>작성자 아이디</Form.Label>
          <Form.Control
            type="text"
            value={userId}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>사진</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="미리보기" style={{ width: '400px', height: '300px', marginTop: '10px' }} />
            </div>
          )}
        </Form.Group>
        <Form.Group controlId="formContents">
          <Form.Label>글내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="내용을 입력하세요"
            value={todayContents}
            onChange={(e) => setTodayContents(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          작성하기
        </Button>
      </Form>
    </Container>
  );
};

export default TodayWrite;
