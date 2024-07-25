import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/common/Loading';
import api from '../services/api';
import Table from 'react-bootstrap/Table';
import CommonPagination from '../components/common/CommonPagination';
import styles from '../assets/styles/community/community.module.scss';

const UserWrite = () => {
  const [community, setCommunity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    const getUserWrite = async () => {
      try {
        const response = await api.get('/products');
        setCommunity(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getUserWrite();
  }, []);


  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>에러메세지: {error.message}</p>;
  }

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = community.slice(indexOfFirstItem, indexOfLastItem); 

  return (
    <div>
      <h2>내가 작성한 게시글</h2>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>이미지</th>
              <th>제목</th>
              <th>가격</th>
              <th>카테고리</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((communityItem) => (
              <tr key={communityItem.id}>
                <td>
                  <img
                    src={communityItem.image}
                    alt={communityItem.title}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td>
                  <Link to={`/community/${communityItem.id}`}>
                    {communityItem.title}
                  </Link>
                </td>
                <td>{communityItem.price}</td>
                <td>{communityItem.category}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className={styles.paginationContainer}>
        <CommonPagination
          activePage={page}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={community.length}
          pageRangeDisplayed={5}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserWrite;
