import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import api from '../../services/api';
import CommonPagination from '../../components/common/CommonPagination';
//css
import styles from '../../assets/styles/userWrite.module.scss';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const UserWrite = () => {
  const [community, setCommunity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserWrite = async () => {
      try {
        const response = await api.get('/community​/myCommunityContents');
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

  const handleDelete = async (id) => {
    try {
      await api.delete('/community/delete');
      setCommunity(community.filter(item => item.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const handleEdit = (id) => {
    console.log(id);
    navigate(`/mypage/userwriteupdate/${id}`);
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
              <th>수정/삭제</th>
            </tr>
          </thead>
          <tbody>
            
            {currentItems.map((communityItem) => {
            
              return (
                <tr key={communityItem.id}>
                  <td>
                    <img
                      src={communityItem.image}
                      alt={communityItem.title}
                      style={{ width: '50px', height: '50px' }} />
                  </td>
                  <td>
                    <Link to={`/community/${communityItem.id}`}>
                      {communityItem.title}
                    </Link>
                  </td>
                  <td>{communityItem.price}</td>
                  <td>{communityItem.category}</td>
                  <td className={styles.tableCellCenter}>

                    <Button variant="success" onClick={() => handleEdit(communityItem.id)}>수정</Button>
                    <Button variant="danger" onClick={() => handleDelete(communityItem.id)}>삭제</Button>
                  </td>
                </tr>
              );
            })}
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
