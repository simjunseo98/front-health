import React from "react";
import styles from '../assets/styles/mainPage.module.scss';
import Button  from 'react-bootstrap/Button';
import Card from'react-bootstrap/Card';
import image from '../assets/images/무한.jpg';

const Challenge = () => {
  return (
    <div className={styles.Challenge}>
    <h1>첼린지 페이지 입니다.</h1>
      <div className={styles.CardContainer}>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>테슷트</Card.Title>
        <Card.Text>
          테스트
        </Card.Text>
        <Button variant="primary">클릭</Button>
      </Card.Body>
    </Card>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>테슷트</Card.Title>
        <Card.Text>
          테스트
        </Card.Text>
        <Button variant="primary">클릭</Button>
      </Card.Body>
    </Card>
    </div>
    </div>
  )
}
export default Challenge