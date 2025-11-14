import { useEffect, useState } from "react";

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

  const currentYear = new Date().getFullYear();

  const [page, setPage] = useState(1);

  // 실제 API 호출에 쓰일 필터 값 (적용 후 상태)
  const [filters, setFilters] = useState({
    sortOption: "popularity.desc",
    yearRange: [1970, currentYear],
    ratingRange: [0, 10],
    selectedGenres: [],
  });

  const { data, isLoading, isError, error } = useSearchMoviesQuery({
    keyword,

    page,

    ...filters,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev, //sortOption 유지
      yearRange: [1970, currentYear],
      ratingRange: [0.0, 10.0],
      selectedGenres: [],
    }));

    setPage(1);
  }, [keyword, currentYear]);

  const handleFilterApply = (newFilters) => {
    setFilters((prev) => ({
      ...prev, //
      ...newFilters,
    }));

    setPage(1);
  };

  const handleSortChange = (newSort) => {
    setFilters((prev) => ({ ...prev, sortOption: newSort }));

    setPage(1);
  };

  const movies = data?.results || [];

  const totalPages = Math.min(data?.total_pages || 0, 50);

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
        <aside className="filter-box">
          <FilterBar
            filters={filters}
            onApply={handleFilterApply}
            onSortChange={handleSortChange}
          />
        </aside>

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
