import React, { useState } from "react";
import "./BrowseList.style.css";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useSearchMoviesQuery } from "../../hooks/useSearchMovies";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";

const BrowseList = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q") || "";

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

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
  const pageCount = Math.ceil(movies.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = movies.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="browse-result">
      <div className="browse-container">
        {/* 필터 영역 */}
        <aside className="filter-box">필터</aside>

        {/* 카드 리스트 영역 */}
        <section className="movie-grid">
          {currentItems.length > 0 ? (
            currentItems.map((movie) => (
              <div key={movie.id} className="movie-grid-item">
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <p className="no-results">
              {keyword
                ? `"${keyword}"에 대한 검색 결과가 없습니다.`
                : "표시할 영화가 없습니다."}
            </p>
          )}

          {/* 페이지네이션 */}
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel="〈 이전"
              nextLabel="다음 〉"
              breakLabel="..."
              pageCount={pageCount}
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
        </section>
      </div>
    </div>
  );
};

export default BrowseList;
