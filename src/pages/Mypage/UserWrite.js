import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import api from '../../services/api';
import CommonPagination from '../../components/common/CommonPagination';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styles from '../../assets/styles/userWrite.module.scss';

// 날짜 포맷 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

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
        const response = await api.get('/community/myCommunityContents');
        const sortedData = response.data.sort(
          (a, b) => new Date(b.communityCreated) - new Date(a.communityCreated)
        );
        setCommunity(sortedData);
      } catch (error) {
        if (error.response && error.response.status === 404) {  //게시글이 없을 시 404를 반환하고 배열을 비움
          setCommunity([]);
        } else {
          setError(error);
        }
      } finally {
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
      await api.delete(`/community/delete/${id}`);
      alert('게시글 삭제를 완료했습니다.');
      setCommunity(community.filter(item => item.communitySq !== id));
    } catch (error) {
      alert('게시글 삭제가 실패하였습니다.');
      setError(error);
    }
  };

  const handleEdit = (id) => {
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
      {community.length === 0 ? (
        <p>작성한 게시글이 없습니다.</p>
      ) : (
        <>
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>내용</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>조회수</th>
                  <th>추천수</th>
                  <th>수정/삭제</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((communityItem) => (
                  <tr key={communityItem.communitySq}>
                    <td className={styles.overflowEllipsis}>{communityItem.communitySq}</td>
                    <td className={styles.overflowEllipsis}>
                      <Link to={`/community/communityDetail/${communityItem.communitySq}`}>
                        {communityItem.communityTitle}
                      </Link>
                    </td>
                    <td className={styles.overflowEllipsis}>{communityItem.communityContents}</td>
                    <td className={styles.overflowEllipsis}>{communityItem.user.userId}</td>
                    <td className={styles.overflowEllipsis}>{formatDate(communityItem.communityCreated)}</td>
                    <td className={styles.overflowEllipsis}>{communityItem.communityview}</td>
                    <td className={styles.overflowEllipsis}>{communityItem.communityRecommend}</td>
                    <td className={styles.tableCellCenter}>
                      <Button variant="success" onClick={() => handleEdit(communityItem.communitySq)}>수정</Button>
                      <Button variant="danger" onClick={() => handleDelete(communityItem.communitySq)}>삭제</Button>
                    </td>
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
        </>
      )}
    </div>
  );
};

export default UserWrite;
