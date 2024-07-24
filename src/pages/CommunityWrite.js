import Form from 'react-bootstrap/Form';

const CommunityWrite = () => {


  return (
    <div>
        <h2>게시글 작성</h2>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>작성자</Form.Label>
        <Form.Control type="email" placeholder="신희민" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
    </div>
  );
}

export default CommunityWrite;