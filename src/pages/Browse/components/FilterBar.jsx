import { useEffect, useRef, useState } from "react";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.min.css";
import "./FilterBar.style.css";
import { useMovieGenreQuery } from "../../../hooks/useMovieGenre";

const FilterBar = ({ filters, onApply, onSortChange }) => {
  const { data: genreData } = useMovieGenreQuery();
  const currentYear = new Date().getFullYear();

  const [localFilters, setLocalFilters] = useState({
    yearRange: filters?.yearRange || [1970, currentYear],
    ratingRange: filters?.ratingRange || [0.0, 10.0],
    selectedGenres: filters?.selectedGenres || [],
  });

  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const yearSliderRef = useRef(null);
  const ratingSliderRef = useRef(null);

  useEffect(() => {
    if (yearSliderRef.current && !yearSliderRef.current.noUiSlider) {
      noUiSlider.create(yearSliderRef.current, {
        start: localFilters.yearRange,
        connect: true,
        step: 1,
        range: { min: 1950, max: currentYear },
      });
      yearSliderRef.current.noUiSlider.on("update", (values) => {
        setLocalFilters((prev) => ({
          ...prev,
          yearRange: values.map((v) => Math.round(v)),
        }));
      });
    }

    if (ratingSliderRef.current && !ratingSliderRef.current.noUiSlider) {
      noUiSlider.create(ratingSliderRef.current, {
        start: localFilters.ratingRange,
        connect: true,
        step: 0.1,
        range: { min: 0.0, max: 10.0 },
      });
      ratingSliderRef.current.noUiSlider.on("update", (values) => {
        setLocalFilters((prev) => ({
          ...prev,
          ratingRange: values.map((v) => parseFloat(v).toFixed(1)),
        }));
      });
    }
  }, [currentYear]);

  const handleGenreClick = (id) => {
    setLocalFilters((prev) => ({
      ...prev,
      selectedGenres: prev.selectedGenres.includes(id)
        ? prev.selectedGenres.filter((g) => g !== id)
        : [...prev.selectedGenres, id],
    }));
  };

  const handleReset = () => {
    const resetState = {
      yearRange: [1970, currentYear],
      ratingRange: [0.0, 10.0],
      selectedGenres: [],
    };

    setLocalFilters(resetState);
    yearSliderRef.current.noUiSlider.set(resetState.yearRange);
    ratingSliderRef.current.noUiSlider.set(resetState.ratingRange);
  };

  const handleApply = () => onApply(localFilters);

  return (
    <aside className="filter-sidebar">
      {/* 아코디언 */}
      <div className="accordion-box">
        <button
          className="accordion-header"
          onClick={() => setIsSortOpen((prev) => !prev)}
        >
          <span className="accordion-title">Sort</span>

          <svg
            className={`accordion-arrow ${isSortOpen ? "open" : ""}`}
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>

        <div className={`accordion-content ${isSortOpen ? "open" : ""}`}>
          <div className="sort-section">
            <button
              className={`sort-btn ${
                filters.sortOption === "popularity.desc" ? "active" : ""
              }`}
              onClick={() => onSortChange("popularity.desc")}
            >
              인기순
            </button>
            <button
              className={`sort-btn ${
                filters.sortOption === "release_date.desc" ? "active" : ""
              }`}
              onClick={() => onSortChange("release_date.desc")}
            >
              최신순
            </button>
            <button
              className={`sort-btn ${
                filters.sortOption === "vote_average.desc" ? "active" : ""
              }`}
              onClick={() => onSortChange("vote_average.desc")}
            >
              평점순
            </button>
          </div>
        </div>
      </div>

      {/* === Filter accordion === */}
      <div className="accordion-box">
        <button
          className="accordion-header"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          <span className="accordion-title">Filter</span>

          <svg
            className={`accordion-arrow ${isFilterOpen ? "open" : ""}`}
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>

        <div className={`accordion-content ${isFilterOpen ? "open" : ""}`}>
          {/* 출시 연도 */}
          <div className="filter-section">
            <h4>출시 연도 범위</h4>
            <div className="filter-info">
              <span>
                From: <b>{localFilters.yearRange[0]}</b>
              </span>
              <span>
                To: <b>{localFilters.yearRange[1]}</b>
              </span>
            </div>
            <div ref={yearSliderRef} className="slider"></div>
          </div>

          {/* 평점 */}
          <div className="filter-section">
            <h4>평점 범위</h4>
            <div className="filter-info">
              <span>
                From: <b>{localFilters.ratingRange[0]}</b>
              </span>
              <span>
                To: <b>{localFilters.ratingRange[1]}</b>
              </span>
            </div>
            <div ref={ratingSliderRef} className="slider"></div>
          </div>

          {/* 장르 */}
          <div className="filter-section">
            <h4>Genres</h4>
            <div className="genres">
              {genreData?.map((genre) => (
                <button
                  key={genre.id}
                  className={`genre-btn ${
                    localFilters.selectedGenres.includes(genre.id)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleGenreClick(genre.id)}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="apply-box">
        <button className="reset-btn" onClick={handleReset}>
          초기화
        </button>
        <button className="apply-btn" onClick={handleApply}>
          검색
        </button>
      </div>
    </aside>
  );
};

export default FilterBar;
