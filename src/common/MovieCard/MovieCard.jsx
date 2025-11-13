import React from "react";
import "./MovieCard.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const showMovieDetail = () => {
    navigate(`/detail/${movie.id}`);
  };

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id == id);
      return genreObj.name;
    });

    return genreNameList;
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/390px-No-Image-Placeholder.svg.png";

  return (
    <div className="movie-card">
      <img className="thumbnail-img" src={posterUrl} alt={movie.title} />
      <div className="info-box">
        <h4 className="movie-title">{movie.title}</h4>
        <div className="rating-box">
          <span className="star">⭐</span>
          <span className="rating">{movie.vote_average.toFixed(1)}</span>
        </div>
        <p className="release_date">{movie.release_date}</p>
        <div className="tag-box">
          {showGenre(movie.genre_ids).map((name, index) => (
            <span key={index} className="tag">
              #{name}
            </span>
          ))}
        </div>
        <div className="button-box">
          <button className="btn-info" onClick={showMovieDetail}>
            <FontAwesomeIcon icon={faCircleInfo} /> 상세보기
          </button>
          <button className="btn-add">＋ 보고싶어요</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
