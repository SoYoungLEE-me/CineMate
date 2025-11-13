import React from "react";
import { useParams } from "react-router-dom";
import { useDetailMoviesQuery } from "../../hooks/useDetailMovies";
import Banner from "../../common/Banner/Banner";
import { ClipLoader } from "react-spinners";

const MovieDetailPage = () => {
  let { id } = useParams();
  const { data, isLoading, isError, error } = useDetailMoviesQuery({ id });

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

  if (isError) {
    return (
      <div style={{ textAlign: "center", padding: "100px", color: "red" }}>
        {error.message}
      </div>
    );
  }

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
      <div>
        <h1>여기세 구체적인 정보가 들어가요</h1>
      </div>
    </>
  );
};

export default MovieDetailPage;
