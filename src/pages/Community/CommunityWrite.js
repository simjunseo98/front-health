import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../../services/api';
import styles from '../../assets/styles/userWrite.module.scss';

const UserWrite = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [userId, setUserId] = useState('');
  const [created, setCreated] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setCreated(formattedDate);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = { communityTitle: title, communityContents: contents, userId, communityCreated: created };

    try {
      await api.post('/community', postData);
      alert('게시글 작성완료 되었습니다.')
      navigate('/community/register'); 
    } catch (error) {
      alert('게시글 작성이 실패했습니다.');
      console.error('게시글 작성이 실패했습니다.:', error);
    }
  };

  return (
    <Container className={styles.createPostContainer}>
      <h2>게시글 작성</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>글제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formContents">
          <Form.Label>글내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="내용을 입력하세요"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formUserId">
          <Form.Label>작성자 아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="작성자 아이디를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="formCreated">
          <Form.Label>작성일</Form.Label>
          <Form.Control
            type="date"
            value={created}
            onChange={(e) => setCreated(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          작성하기
        </Button>
      </Form>
    </Container>
  );
};

export default UserWrite;
