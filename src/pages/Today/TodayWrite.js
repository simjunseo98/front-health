import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../../services/api';
import styles from '../../assets/styles/today/todayWrite.module.scss';

const TodayWrite = () => {
    const [TodayImage, setTodayImage] = useState('');
    const [TodayContents, setTodayContents] = useState('');
    const [userId, setUserId] = useState('');
    const [TodayCreated, setTodayCreated] = useState('');
    const navigate = useNavigate();

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
            <Form.Group controlId="formTitle">
              <Form.Label>사진</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력하세요"
                value={TodayImage}
                onChange={(e) => setTodayImage(e.target.value)}
              />
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