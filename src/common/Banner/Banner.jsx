import React, { useEffect, useState } from "react";
import "./Banner.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Banner = ({
  data,
  isError,
  error,
  autoSlide = true,
  showButtons = true,
  single = false, // 디테일 페이지인지 여부
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullText, setShowFullText] = useState(false); // 🔥 overview 더보기 토글

  // movies 선택
  const movies = single ? [data] : data?.results?.slice(0, 3) || [];

  const navigate = useNavigate();

  const showMovieDetail = () => {
    if (!movies[currentIndex]) return;
    navigate(`/detail/${movies[currentIndex].id}`);
  };

  // 자동 전환
  useEffect(() => {
    if (single || !autoSlide) return;
    if (!movies.length) return;

    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % movies.length),
      5000
    );

    return () => clearInterval(interval);
  }, [movies, autoSlide, single]);

  const handleDotClick = (index) => {
    if (!single) setCurrentIndex(index);
  };

  if (isError) {
    return (
      <div className="banner-error">
        <h2>{error?.message}</h2>
      </div>
    );
  }

  return (
    <div className="banner">
      {movies.map((movie, index) => {
        const backgroundUrl = `https://image.tmdb.org/t/p/original${
          movie.backdrop_path || movie.poster_path
        }`;

        //메타데이터
        const matchPercent = movie.vote_average
          ? Math.round(movie.vote_average * 10)
          : null;

        const releaseDate = movie.release_date
          ? movie.release_date.replace(/-/g, ".")
          : null;

        const runtime = movie.runtime || null;

        //overview 길이 조절
        const cleanOverview = (movie.overview || "")
          .replace(/\s+/g, " ")
          .trim();

        const fullText = cleanOverview;
        const shortText = cleanOverview.slice(0, 120);

        return (
          <div
            key={movie.id}
            className={`banner-slide ${index === currentIndex ? "active" : ""}`}
          >
            {/* 배경 */}
            <div className="banner-bg">
              <img src={backgroundUrl} alt={movie.title} />
              <div className="banner-gradient"></div>
            </div>

            {/* 내용 */}
            <div className="banner-content">
              <div className="banner-text">
                <h2 className="banner-title">{movie.title}</h2>

                {/* overview 출력 */}
                {!single ? (
                  <p className="banner-desc clamped">{movie.overview}</p>
                ) : (
                  <p
                    className={`banner-desc ${single ? "detail-desc" : ""} ${
                      showFullText ? "expanded" : ""
                    }`}
                  >
                    {showFullText ? fullText : shortText}

                    {cleanOverview.length > 120 && (
                      <span
                        className="read-more-inline"
                        onClick={() => setShowFullText((prev) => !prev)}
                      >
                        {showFullText ? " ...접기" : "   ...더보기"}
                      </span>
                    )}
                  </p>
                )}

                {/* 메타데이터는 디테일(single=true)에서만 표시 */}
                {single && (
                  <div className="banner-meta">
                    {matchPercent && (
                      <span className="match">{matchPercent}% 일치</span>
                    )}
                    {releaseDate && <span className="date">{releaseDate}</span>}
                    {movie.adult !== undefined && (
                      <span className="adult">
                        {movie.adult ? "18+" : "전체"}
                      </span>
                    )}
                    {runtime && <span className="runtime">{runtime}분</span>}
                  </div>
                )}

                {/* 버튼 (재생 버튼은 항상 보여야 함) */}
                {showButtons && (
                  <div className="banner-buttons">
                    <button className="btn btn-play">
                      <FontAwesomeIcon icon={faPlay} className="icon" />
                      재생
                    </button>

                    {/* 상세보기 버튼은 홈에서만! */}
                    {!single && (
                      <button
                        className="btn btn-info"
                        onClick={showMovieDetail}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                        상세 정보
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* 홈 슬라이드 점 */}
      {!single && (
        <div className="banner-dots">
          {movies.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;
