import React from "react";
import "./HomePage.style.css";
import Banner from "./components/Banner/Banner";
import PopularMovieSlider from "./components/MovieSlider/MovieSlider";
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies";
import { useNowPlayingMoviesQuery } from "../../hooks/useNowPlayingMovies";
import { useUpcomingMoviesQuery } from "../../hooks/useUpcomingMovies";
import MovieSlider from "./components/MovieSlider/MovieSlider";
import { ClipLoader } from "react-spinners";

const HomePage = () => {
  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
    error: popularErrorData,
  } = usePopularMoviesQuery();

  const {
    data: nowPlayingData,
    isLoading: nowPlayingLoading,
    isError: nowPlayingError,
    error: nowPlayingErrorData,
  } = useNowPlayingMoviesQuery();

  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    isError: upcomingError,
    error: upcomingErrorData,
  } = useUpcomingMoviesQuery();

  const isLoading = popularLoading || nowPlayingLoading || upcomingLoading;

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#E50914" size={60} />
      </div>
    );
  }

  return (
    <div className="home-page-container">
      <div className="home-movie-banner">
        <Banner
          data={popularData}
          isLoading={popularLoading}
          isError={popularError}
          error={popularErrorData}
        />
      </div>
      {/* 인기 영화 슬라이더 */}
      <div className="home-movie-slider">
        <MovieSlider
          title="실시간 인기 작품"
          movies={popularData?.results}
          isLoading={popularLoading}
          isError={popularError}
          error={popularErrorData}
        />
      </div>

      {/* 현재 상영작 슬라이더 */}
      <div className="home-movie-slider">
        <MovieSlider
          title="현재 극장 상영 중인 작품"
          movies={nowPlayingData?.results}
          isLoading={nowPlayingLoading}
          isError={nowPlayingError}
          error={nowPlayingErrorData}
        />
      </div>

      {/* 개봉 예정작 슬라이더 */}
      <div className="home-movie-slider">
        <MovieSlider
          title="공개 예정 작품"
          movies={upcomingData?.results}
          isLoading={upcomingLoading}
          isError={upcomingError}
          error={upcomingErrorData}
        />
      </div>
    </div>
  );
};

export default HomePage;
