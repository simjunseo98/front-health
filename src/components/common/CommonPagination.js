import React from "react";
import styles from '../../assets/styles/pagination.module.css';
import Pagination from "react-js-pagination";

const CommonPagination = ({ activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, handlePageChange }) => {
  return (
    <Pagination
      activePage={activePage} // 현재 페이지
      itemsCountPerPage={itemsCountPerPage} // 한 페이지랑 보여줄 아이템 갯수
      totalItemsCount={totalItemsCount} // 총 아이템 갯수
      pageRangeDisplayed={pageRangeDisplayed} // paginator의 페이지 범위
      prevPageText={"‹"} // "이전"을 나타낼 텍스트
      nextPageText={"›"} // "다음"을 나타낼 텍스트
      onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      innerClass={styles.pagination} // CSS 클래스 추가
      itemClass={styles.item} // 각 항목의 CSS 클래스
      linkClass={styles.link} // 링크의 CSS 클래스
      activeClass={styles.active} // 활성화된 페이지의 CSS 클래스
    />
  );
};

export default CommonPagination;
