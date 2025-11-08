import React, { useEffect, useState } from "react";
import "./Banner.style.css";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data || !data.results) return;
    const movies = data.results.slice(0, 3);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  if (!data || !data.results || data.results.length === 0) return null;

  const movies = data.results.slice(0, 3);

  return (
    <div className="banner">
      {movies.map((movie, index) => {
        const backgroundUrl = `https://image.tmdb.org/t/p/original${
          movie.backdrop_path || movie.poster_path
        }`;
        return (
          <div
            key={movie.id}
            className={`banner-slide ${index === currentIndex ? "active" : ""}`}
          >
            <div className="banner-bg">
              <img src={backgroundUrl} alt={movie.title} />
              <div className="banner-gradient"></div>
            </div>

            <div className="banner-content">
              <div className="banner-text">
                <h2 className="banner-title">{movie.title}</h2>
                <p className="banner-desc">{movie.overview}</p>

                <div className="banner-buttons">
                  <button className="btn btn-play">
                    <FontAwesomeIcon icon={faPlay} className="icon" />
                    재생
                  </button>

                  <button className="btn btn-info">
                    <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                    상세 정보
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="banner-dots">
        {movies.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
