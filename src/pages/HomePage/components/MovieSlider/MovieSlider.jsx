import React from "react";
import "./MovieSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieSlider = ({ title, movies }) => {
  let carouselRef = React.useRef();

  const genreMap = {
    28: "액션",
    12: "모험",
    16: "애니메이션",
    35: "코미디",
    80: "범죄",
    99: "다큐멘터리",
    18: "드라마",
    10751: "가족",
    14: "판타지",
    36: "역사",
    27: "공포",
    10402: "음악",
    9648: "미스터리",
    10749: "로맨스",
    878: "SF",
    10770: "TV 영화",
    53: "스릴러",
    10752: "전쟁",
    37: "서부",
  };

  const limitedMovies = movies.slice(0, 10);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1440 }, items: 5 },
    laptop: { breakpoint: { max: 1440, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 560 }, items: 3 },
    mobile: { breakpoint: { max: 560, min: 0 }, items: 3 },
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
            {limitedMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  className="thumbnail-img"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="info-box">
                  <h4 className="movie-title">{movie.title}</h4>
                  <div className="rating-box">
                    <span className="star">⭐</span>
                    <span className="rating">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <p className="release_date">{movie.release_date}</p>
                  <div className="tag-box">
                    {movie.genre_ids.map((id) => (
                      <span key={id} className="tag">
                        #{genreMap[id]}
                      </span>
                    ))}
                  </div>
                  <div className="button-box">
                    <button className="btn-add">＋ 보고싶어요</button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
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
