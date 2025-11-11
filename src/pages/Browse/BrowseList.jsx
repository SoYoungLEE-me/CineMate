import "bootstrap/dist/css/bootstrap-grid.min.css";
import React, { useState } from "react";
import "./BrowseList.style.css";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useSearchMoviesQuery } from "../../hooks/useSearchMovies";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";

const BrowseList = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q") || "";

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12; // 한 페이지에 표시할 영화 개수

  const { data, isLoading, isError, error } = useSearchMoviesQuery({ keyword });

  if (isLoading) {
    return (
      <div className="browse-loading">
        <ClipLoader color="#E50914" size={60} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="browse-error">
        <h2>{error.message}</h2>
      </div>
    );
  }

  const movies = data?.results || [];

  // 페이지별 데이터 나누기
  const pageCount = Math.ceil(movies.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = movies.slice(offset, offset + itemsPerPage);

  // 페이지 변경 이벤트
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 부드럽게 위로 스크롤
  };

  return (
    <div className="browse-result">
      <Container>
        <Row>
          {/* 필터 */}
          <Col lg={3} xs={12}>
            <div className="filter-box">필터</div>
          </Col>

          <Col lg={9} xs={12}>
            <Row xs={3} md={4} lg={5} className="g-4">
              {currentItems.length > 0 ? (
                currentItems.map((movie) => (
                  <Col key={movie.id} className="browse-list-card-item">
                    <MovieCard movie={movie} />
                  </Col>
                ))
              ) : (
                <p className="text-center w-100 py-5">
                  {keyword
                    ? `"${keyword}"에 대한 검색 결과가 없습니다.`
                    : "표시할 영화가 없습니다."}
                </p>
              )}
            </Row>

            {/* React Paginate */}
            {pageCount > 1 && (
              <ReactPaginate
                previousLabel="〈 이전"
                nextLabel="다음 〉"
                breakLabel="..."
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BrowseList;
