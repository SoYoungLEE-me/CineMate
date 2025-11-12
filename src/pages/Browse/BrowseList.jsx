import React, { useEffect, useState } from "react";
import "./BrowseList.style.css";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useSearchMoviesQuery } from "../../hooks/useSearchMovies";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import FilterBar from "./components/FilterBar";

const BrowseList = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q") || "";

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useSearchMoviesQuery({
    keyword,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [keyword]);

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
  const totalPages = Math.min(data?.total_pages || 0, 50);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFirstPage = () => {
    if (page !== 1) {
      setPage(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLastPage = () => {
    if (page !== totalPages) {
      setPage(totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div className="browse-result">
      <div className="browse-container">
        {/* 필터 영역 */}
        <aside className="filter-box">
          <FilterBar />
        </aside>

        {/* 카드 리스트 영역 */}
        <section className="movie-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
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
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                className={`page-link first-last-btn ${
                  page === 1 ? "disabled" : ""
                }`}
                onClick={handleFirstPage}
                disabled={page === 1}
              >
                «
              </button>
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={totalPages}
                onPageChange={handlePageClick}
                marginPagesDisplayed={0}
                pageRangeDisplayed={4}
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
                forcePage={page - 1}
              />
              <button
                className={`page-link first-last-btn ${
                  page === totalPages ? "disabled" : ""
                }`}
                onClick={handleLastPage}
                disabled={page === totalPages}
              >
                »
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BrowseList;
