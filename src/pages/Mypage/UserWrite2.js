import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
//import api from '../../services/api';
import axios from 'axios';
import Loading from '../../components/common/Loading';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import CommonPagination from '../../components/common/CommonPagination';
import styles from '../../assets/styles/userWrite.module.scss';
//import styles from '../../assets/styles/today/card.module.scss';

const UserWrite2 = () => {
   
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1); // 현재 페이지 상태
  const [postsPerPage] = useState(4); // 페이지당 게시물 수
  const navigate = useNavigate();

  useEffect(() => {
    const getUserWrite2 = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products', {
        
        });

        // 게시물과 총 게시물 수 설정

        setPosts(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        setError(error.message || '알 수 없는 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    getUserWrite2();
  }, []);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>에러메세지: {error}</p>;
  }

  // 페이지에 맞는 게시물 계산
  const indexOfLastItem = activePage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      setPosts(posts.filter(item => item.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const handleEdit = (id) => {
    console.log(id);
    navigate(`/Mypage/TodayWriteUpdate/${id}`);
  };
  return (
    <div>
      <h2>게시물 목록</h2>
      {loading && <Loading />}
      {error && <p>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>이미지</th>
            <th>좋아요</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <img
                  src={post.image}
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
              <td>
                <div
                  className={styles.heart}
                >
                  {post.isLiked ? (
                    <AiFillHeart style={{ color: 'red' }} />
                  ) : (
                    <AiOutlineHeart />
                  )}
                  {post.likes}
                </div>
              </td>
              <td className={styles.tableCellCenter}>
                <Button variant="success" onClick={() => handleEdit(posts.id)}>수정</Button>
                <Button variant="danger" onClick={() => handleDelete(posts.id)}>삭제</Button>
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
    </div>
  );
};

export default UserWrite2;
