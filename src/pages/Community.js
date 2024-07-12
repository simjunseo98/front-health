import React, { useEffect, useState } from 'react';
import Loading from '../components/common/Loading';
import api from '../services/api';
import Table from 'react-bootstrap/Table';
import CommonPagination from '../components/common/CommonPagination';
import styles from '../assets/styles/community.module.scss';

const Community = () => {
  const [community, setCommunity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [search, setSearch] = useState('');   // 검색어 상태
  const [searchResult, setSearchResult] = useState([]); // 검색결과 상태
  const [searchInput, setSearchInput] = useState(''); // 검색 입력 상태

  useEffect(() => {
    const getCommunity = async () => {
      try {
        const response = await api.get('/products');
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
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filtered);
    setPage(1); // 검색어가 변경될 때 페이지를 초기화
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
      <h2>커뮤니티 페이지입니다.(임시로 FakeAPi 연결)</h2>
      {/* 다른 스타일인데 혹시 남겨둠 */}
      {/* <div className="input-group justify-content-center">
  <div className="col-md-5"> 
    <input
      type="text"
      placeholder="검색어를 입력하세요..."
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      className={`form-control ${styles.searchInput}`} 
    />
  </div>
  <div className="col-md-0">
    <div className="input-group-append">
      <button className="btn btn-secondary" onClick={handleSearch}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div>
</div> */}

      <div className='input-group' style={{ justifyContent: 'center', maxWidth: '600px', margin: '0 auto',marginBottom:'30px' }}>
        <input type="search" className='form-control rounded' style={{ flex: 1, marginRight: '10px' }} placeholder="Search" aria-label="Search" aria-describedby="search-addon"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="button" className='btn btn-outline-primary' onClick={handleSearch} style={{ whiteSpace: 'nowrap' }} >Search</button>
      </div>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>이미지</th>
              <th>제목</th>
              <th>가격</th>
              <th>카테고리</th>
              <th>설명</th>
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
                <td>{communityItem.title}</td>
                <td>{communityItem.price}</td>
                <td>{communityItem.category}</td>
                <td>{communityItem.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
