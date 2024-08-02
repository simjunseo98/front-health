import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../../services/api';
import styles from '../../assets/styles/today/todayWrite.module.scss';

const TodayWrite = () => {
    const [TodayImage, setTodayImage] = useState('');// 이미지 파일을 저장할 상태
    const [TodayContents, setTodayContents] = useState('');
    const [userId, setUserId] = useState('');
    const [TodayCreated, setTodayCreated] = useState('');
    const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(''); // 이미지 미리보기를 저장할 상태


    useEffect(() => {
      const today = new Date().toISOString().split('T')[0]; // 현재 날짜를 'YYYY-MM-DD' 형식으로 변환
      setTodayCreated(today);
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
        const postData = { TodayBodyImage: TodayImage, TodayContents: TodayContents, userId, TodayCreated: TodayCreated };
    
        try {
          await api.post('/today', postData);
          navigate('/today/register'); 
        } catch (error) {
          console.error('Error creating post:', error);
        }
      };
      return (
        <Container className={styles.createPostContainer}>
          <h2>게시글 작성</h2>
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formImage">
        <Form.Label>사진</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="" style={{ width: '400px',height:'300px', marginTop: '10px' }} />
          </div>
        )}
      </Form.Group>
            <Form.Group controlId="formContents">
              <Form.Label>글내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="내용을 입력하세요"
                value={TodayContents}
                onChange={(e) => setTodayContents(e.target.value)}
              />
            </Form.Group>
    
            <Form.Group controlId="formUserId">
              <Form.Label>작성자 아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="작성자 아이디를 입력하세요"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Form.Group>
    
            <Form.Group controlId="formCreated">
              <Form.Label>작성일</Form.Label>
              <Form.Control
                type="date"
                value={TodayCreated}
                onChange={(e) => setTodayCreated(e.target.value)}
              />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              작성하기
            </Button>
          </Form>
        </Container>
      );
    
}
export default TodayWrite;