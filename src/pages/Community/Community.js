import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import api from '../../services/api';
import Table from 'react-bootstrap/Table';
import CommonPagination from '../../components/common/CommonPagination';
import styles from '../../assets/styles/community/community.module.scss';

const Community = () => {
  const [community, setCommunity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [search, setSearch] = useState('');   // 검색어 상태
  const [searchResult, setSearchResult] = useState([]); // 검색결과 상태
  const [searchInput, setSearchInput] = useState(''); // 검색 입력 상태
  
  const formatDate = (isString) => {
    const date = new Date(isString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  useEffect(() => {
    const getCommunity = async () => {
      try {
        const response = await api.get('/community/all');
        setCommunity(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getCommunity();
  }, []);

  useEffect(() => {
    const filtered = community.filter((item) =>
      item.communityTitle.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filtered);
    setPage(1);
  }, [search, community]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearch = () => {
    setSearch(searchInput);
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>에러메세지: {error.message}</p>;
  }

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem); // searchResult를 사용

  return (
    <div>
      <h2>커뮤니티 페이지입니다.</h2>
      <div className='input-group' style={{ justifyContent: 'center', maxWidth: '600px', margin: '0 auto', marginBottom: '30px', marginTop: '30px' }}>
        <input type="search" className='form-control rounded' style={{ flex: 1, marginRight: '10px' }} placeholder="검색어를 입력하세요." aria-label="Search" aria-describedby="search-addon"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="button" className='btn btn-outline-primary' onClick={handleSearch} style={{ whiteSpace: 'nowrap' }}>검색</button>
      </div>

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
            </tr>
          </thead>
          <tbody>
            {currentItems.map((communityItem) => (
              <tr key={communityItem.id}>
                <td>{communityItem.communitySq}</td>
                <td>
                  <Link to={`/community/${communityItem.communitySq}`}>
                    {communityItem.communityTitle}
                  </Link>
                </td>
                <td>{communityItem.communityContents}</td>
                <td>{communityItem.user.userId}</td>
                <td>{formatDate(communityItem.communityCreated)}</td>
                <td>{communityItem.communityCheck}</td>
                <td>{communityItem.communityRecommend}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className={styles.writeButtonContainer}>
        <Link to="/communitywrite" className="btn btn-primary">
          게시글작성
        </Link>
      </div>
      <div className={styles.paginationContainer}>
        <CommonPagination
          activePage={page}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={searchResult.length}
          pageRangeDisplayed={5}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Community;
