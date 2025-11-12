import { useEffect, useRef, useState } from "react";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.min.css";
import "./FilterBar.style.css";

const FilterBar = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(true);
  const yearSliderRef = useRef(null);
  const ratingSliderRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const [yearRange, setYearRange] = useState([1950, currentYear]);
  const [ratingRange, setRatingRange] = useState([0.0, 10.0]);

  // noUiSlider 초기화
  useEffect(() => {
    if (yearSliderRef.current && !yearSliderRef.current.noUiSlider) {
      noUiSlider.create(yearSliderRef.current, {
        start: [1980, currentYear],
        connect: true,
        step: 1,
        range: { min: 1950, max: currentYear },
      });
      yearSliderRef.current.noUiSlider.on("update", (values) => {
        setYearRange(values.map((v) => Math.round(v)));
      });
    }

    if (ratingSliderRef.current && !ratingSliderRef.current.noUiSlider) {
      noUiSlider.create(ratingSliderRef.current, {
        start: [0.0, 10.0],
        connect: true,
        step: 0.1,
        range: { min: 0.0, max: 10.0 },
      });
      ratingSliderRef.current.noUiSlider.on("update", (values) => {
        setRatingRange(values.map((v) => parseFloat(v).toFixed(1)));
      });
    }
  }, [currentYear]);

  return (
    <aside className="filter-sidebar">
      {/* === Sort Section === */}
      <div className="accordion-box">
        <button
          className="accordion-header"
          onClick={() => setSortOpen(!sortOpen)}
        >
          <span className="accordion-title">Sort</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`accordion-arrow ${sortOpen ? "open" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        <div className={`accordion-content ${sortOpen ? "open" : ""}`}>
          <div className="sort-section">
            <button className="sort-btn active">관련성 순</button>
            <button className="sort-btn">인기순</button>
            <button className="sort-btn">최신순</button>
            <button className="sort-btn">평점순</button>
          </div>
        </div>
      </div>

      {/* === Filter Section === */}
      <div className="accordion-box">
        <button
          className="accordion-header"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <span className="accordion-title">Filter</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`accordion-arrow ${filterOpen ? "open" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        <div className={`accordion-content ${filterOpen ? "open" : ""}`}>
          <div className="filter-section">
            <h4>출시 연도 범위</h4>
            <div className="filter-info">
              <span>
                From: <b>{yearRange[0]}</b>
              </span>
              <span>
                To: <b>{yearRange[1]}</b>
              </span>
            </div>
            <div ref={yearSliderRef} className="slider"></div>
          </div>

          <div className="filter-section">
            <h4>평점 범위</h4>
            <div className="filter-info">
              <span>
                From: <b>{ratingRange[0]}</b>
              </span>
              <span>
                To: <b>{ratingRange[1]}</b>
              </span>
            </div>
            <div ref={ratingSliderRef} className="slider"></div>
          </div>

          <div className="filter-section">
            <h4>Genres</h4>
            <div className="genres">
              {[
                "Action",
                "Adventure",
                "Animation",
                "Comedy",
                "Crime",
                "Documentary",
                "Drama",
                "Fantasy",
                "Horror",
                "Sci-Fi",
              ].map((genre) => (
                <button key={genre} className="genre-btn">
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterBar;
