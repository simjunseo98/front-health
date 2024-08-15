import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../../services/api';
import styles from '../../assets/styles/userWrite.module.scss';

const UserWriteUpdate = () => {
  const { id } = useParams();  // URL에서 id를 추출
  const [communitySq, setCommunitySq] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [created, setCreated] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.get(`/community/communityDetail/${id}`);
        const data = response.data;
        setCommunitySq(data.communitySq);  
        setTitle(data.communityTitle);
        setContents(data.communityContents);
        setCreated(data.communityCreated.substring(0, 10));
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = { 
      communitySq, 
      communityTitle: title, 
      communityContents: contents, 
      communityCreated: created 
    };

    try {
      await api.put('/community/update', postData);
      alert('수정이 완료되었습니다.');
      navigate('/mypage/userwrite');
    } catch (error) {
      alert('수정이 실패하였습니다.');
      console.error('Error updating post:', error);
    }
  };

  return (
    <Container className={styles.createPostContainer}>
      <h2>게시글 수정</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCommunitySq">
          <Form.Label>글번호</Form.Label>
          <Form.Control
            type="text"
            value={communitySq}
            readOnly
          />
        </Form.Group>
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

export default UserWriteUpdate;
