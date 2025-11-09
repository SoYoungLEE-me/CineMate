import React from "react";
import "./HomePage.style.css";
import Banner from "./components/Banner/Banner";
import PopularMovieSlider from "./components/MovieSlider/MovieSlider";
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies";
import MovieSlider from "./components/MovieSlider/MovieSlider";

const HomePage = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  return (
    <div className="home-page-container">
      <div className="home-movie-banner">
        <Banner />
      </div>
      <div className="home-movie-slider">
        <MovieSlider
          title="실시간 인기 영화"
          movies={data?.results}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </div>
    </div>
  );
};

export default HomePage;
