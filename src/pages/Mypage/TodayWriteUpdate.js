import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../../services/api';
import styles from '../../assets/styles/today/todayWrite.module.scss';

const TodayWriteUpdate = () => {
  const { id } = useParams();  
  const [todaySq, setTodaySq] = useState('');
  const [image, setImage] = useState('');
  const [contents, setContents] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // 이미지 미리보기를 저장할 상태
  const [created, setCreated] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.get(`/today/todayDetail/${id}`);
        const data = response.data;
        setTodaySq(data.todaySq);
        setImage(data.imageurl);
        setContents(data.todayContents);
        setImagePreview(data.imageurl); // 미리보기 URL 설정
        setCreated(data.todayCreated.substring(0, 10));
      } catch (error) {
        console.error('게시물 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // 파일 읽기가 완료되면 미리보기 설정
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    } else {
      setImage(null);
      setImagePreview('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('content', contents);
    if (image) {
      formData.append('file', image);
    }

    try {
      await api.put(`/today/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('수정이 완료되었습니다.');
      navigate('/mypage/userwrite2');
    } catch (error) {
      alert('수정이 실패하였습니다.');
      console.error('Error updating post:', error);
    }
  };

  return (
    <Container className={styles.createPostContainer}>
      <h2>게시글 수정</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTodaySq">
          <Form.Label>글번호</Form.Label>
          <Form.Control
            type="text"
            value={todaySq}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>이미지 URL</Form.Label>
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
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCreated">
          <Form.Label>작성일</Form.Label>
          <Form.Control
            type="text"
            value={created}
            readOnly
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
