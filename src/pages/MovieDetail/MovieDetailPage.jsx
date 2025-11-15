import React from "react";
import { useParams } from "react-router-dom";
import { useDetailMoviesQuery } from "../../hooks/useDetailMovies";
import Banner from "../../common/Banner/Banner";
import { ClipLoader } from "react-spinners";
import DetailInfo from "./components/DetailInfo/DetailInfo";
import ReviewList from "./components/ReviewList/ReviewList";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  let { id } = useParams();
  const { data, isLoading, isError, error } = useDetailMoviesQuery({ id });

  console.log("detail response:", data);

  const keywords = data?.keywords?.keywords?.slice(0, 6)?.map((k) => k.name);

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

  if (isError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "#E50914",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        <h2>{error.message}</h2>
      </div>
    );
  }
  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/original${data.poster_path}`
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/390px-No-Image-Placeholder.svg.png";

  return (
    <>
      <div className="hero-section">
        <Banner
          data={data}
          single={true}
          autoSlide={false}
          showButtons={true}
        />
      </div>
      <div className="movie-detail-info">
        <DetailInfo
          poster={posterUrl}
          cast={data.credits?.cast
            ?.slice(0, 3)
            .map((c) => c.name)
            .join(", ")}
          genres={data.genres?.map((g) => g.name).join(", ")}
          features={keywords}
          rating={data.vote_average.toFixed(1)}
          ratingCount={data.vote_count}
          budget={data.budget}
          production_countries={data.production_countries}
        />
      </div>
      <div className="review-section-container">
        <ReviewList reviews={data?.reviews?.results} />
      </div>
    </>
  );
};

export default MovieDetailPage;
