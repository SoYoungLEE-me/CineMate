import React from "react";
import "./Banner.style.css";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  console.log("ddd", data);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  if (!data || !data.results || data.results.length === 0) {
    console.log("data가 비어 있음:", data);
    return null;
  }

  const movie = data.results[0];
  const backgroundUrl = `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${
    movie.backdrop_path || movie.poster_path
  }`;

  return (
    <div className="banner">
      <div className="banner-bg">
        <img src={backgroundUrl} alt="메인 영화 배경" />
        <div className="banner-gradient"></div>
      </div>

      <div className="banner-content">
        <div className="banner-text">
          <h2 className="banner-title">{movie.title}</h2>
          <p className="banner-desc">{movie.overview}</p>

          <div className="banner-buttons">
            <button className="btn btn-play">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clip-rule="evenodd"
                />
              </svg>
              재생
            </button>

            <button className="btn btn-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              상세 정보
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
