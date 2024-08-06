import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
//import api from '../../services/api';
import axios from 'axios';
import styles from '../../assets/styles/today/todayWrite.module.scss';

const TodayWriteUpdate = () => {
  const { id } = useParams();  // URL에서 id를 추출
  const [image, setImage] = useState('');
  const [contents, setContents] = useState('');
  const [userId, setUserId] = useState('');
  const [created, setCreated] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData2 = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        console.log(id)
        const data = response.data;
        setImage(data.image);
        setContents(data.contents);
        setUserId(data.userId);
        setCreated(data.created);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData2();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = { image, contents, userId, created};

    try {
      await axios.put(`/today/update/${id}`, postData);
      alert('수정이 완료되었습니다.')
      navigate('/mypage/userwrite2');
    } catch (error) {
      alert('수정이 실패하였습니다.')
      console.error('Error updating post:', error);
    }
  };

  return (
    <Container className={styles.createPostContainer}>
      <h2>게시글 수정</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formContents">
        <Form.Group controlId="formImage">
          <Form.Label>이미지 URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="이미지 URL을 입력하세요"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
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
          수정하기
        </Button>
      </Form>
    </Container>
  );
};

export default TodayWriteUpdate;
