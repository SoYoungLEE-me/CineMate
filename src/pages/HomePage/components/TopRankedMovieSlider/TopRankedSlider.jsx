import React from "react";
import styles from "./TopRankedSlider.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../../../../common/MovieCard/MovieCard";

const TopRankedSlider = ({ title, movies, isError, error }) => {
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
    mobile: { breakpoint: { max: 560, min: 0 }, items: 3 },
  };

  return (
    <div className={styles.topRankedContainer}>
      <h3 className={styles.sliderTitle}>{title}</h3>
      <div className={styles.sliderWrapper}>
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          infinite={false}
          autoPlay={false}
          arrows={false}
          showDots={false}
          centerMode={false}
          containerClass="carousel-container"
          itemClass={styles.carouselItemGap}
          customTransition="transform 0.5s ease"
        >
          {limitedMovies.map((movie, index) => (
            <div className={styles.rankedSlide} key={movie.id}>
              {/* 순위 숫자 (배경 효과) */}
              <span className={styles.rankBackground}>{index + 1}</span>

              {/* 영화 카드 */}
              <div className={styles.rankCardWrapper}>
                <MovieCard movie={movie} />
              </div>
            </div>
          ))}
        </Carousel>

        {/* 화살표 버튼 */}
        <button
          className={`${styles.customArrow} ${styles.customArrowLeft}`}
          onClick={() => carouselRef.current.previous()}
        >
          ‹
        </button>
        <button
          className={`${styles.customArrow} ${styles.customArrowRight}`}
          onClick={() => carouselRef.current.next()}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default TopRankedSlider;
