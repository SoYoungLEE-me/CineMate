import React from "react";
import "./MovieSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../../../../common/MovieCard/MovieCard";

const MovieSlider = ({ title, movies, isError, error, showRank = false }) => {
  const carouselRef = React.useRef();

  if (isError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "600px",
          color: "#E50914",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        <h2>{error.message}</h2>
      </div>
    );
  }

  const limitedMovies = movies.slice(0, 10);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1440 }, items: 5 },
    laptop: { breakpoint: { max: 1440, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 560 }, items: 3 },
    mobile: { breakpoint: { max: 560, min: 0 }, items: 2 },
  };

  return (
    <>
      <h3 className="slider-title">{title}</h3>
      <div className="movie-slider">
        <div className="carousel-wrapper">
          <Carousel
            ref={carouselRef}
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            arrows={false}
            showDots={false}
            renderButtonGroupOutside={true}
            itemClass="carousel-item-padding"
            customTransition="transform 0.5s ease"
            containerClass="carousel-wrapper"
          >
            {limitedMovies.map((movie, index) => (
              <div className="ranked-card" key={movie.id}>
                {showRank && <span className="rank-badge">{index + 1}위</span>}
                <MovieCard movie={movie} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* 화살표 버튼 */}
        <button
          className="custom-arrow custom-arrow--left"
          onClick={() => carouselRef.current.previous()}
        >
          ‹
        </button>
        <button
          className="custom-arrow custom-arrow--right"
          onClick={() => carouselRef.current.next()}
        >
          ›
        </button>
      </div>
    </>
  );
};

export default MovieSlider;
