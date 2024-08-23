import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import CommonPagination from '../../components/common/CommonPagination';
import styles from '../../assets/styles/userWrite.module.scss';
import api from '../../services/api';

const UserWrite2 = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [postsPerPage] = useState(4);
  const navigate = useNavigate();

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  useEffect(() => {
    const getUserWrite2 = async () => {
      try {
        const response = await api.get('/today/myTodayContents');
        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.todayCreated) - new Date(a.todayCreated)
        );
        setPosts(sortedPosts);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setPosts([]);
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    getUserWrite2();
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`today/delete/${id}`);
      alert('게시글 삭제를 완료했습니다.');
      setPosts(posts.filter(item => item.todaySq !== id));
    } catch (error) {
      alert('게시글 삭제가 실패했습니다.');
      setError(error.message || '알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/mypage/todaywriteupdate/${id}`);
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>에러메세지: {error.message}</p>;
  }

  // 페이지에 맞는 게시물 계산
  const indexOfLastItem = activePage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h2>내가 작성한 오운완 목록</h2>
      {posts.length === 0 ? (
        <p>작성한 게시글이 없습니다.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>번호</th>
                <th>이미지</th>
                <th>내용</th>
                <th>좋아요</th>
                <th>작성일</th>
                <th>수정/삭제</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(post => (
                <tr key={post.todaySq}>
                  <td>{post.todaySq}</td>
                  <td>
                    <img
                      src={post.imageurl}
                      alt={post.title}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                  <td>{post.todayContents}</td>
                  <td>{post.todayHearts}</td>
                  <td>{formatDate(post.todayCreated)}</td>
                  <td className={styles.tableCellCenter}>
                    <Button variant="success" onClick={() => handleEdit(post.todaySq)}>수정</Button>
                    <Button variant="danger" onClick={() => handleDelete(post.todaySq)}>삭제</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <CommonPagination
            activePage={activePage}
            itemsCountPerPage={postsPerPage}
            totalItemsCount={posts.length}
            pageRangeDisplayed={5}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default UserWrite2;
