import React from "react";
import "./DetailInfo.style.css";

const DetailInfo = ({
  poster,
  cast,
  genres,
  features,
  rating,
  ratingCount,
  budget,
  production_countries,
}) => {
  return (
    <div className="detail-info-container">
      {/* 포스터 */}
      <div className="detail-poster">
        <img src={poster} alt="movie poster" />
      </div>

      {/* 상세 정보 */}
      <div className="detail-info-text">
        <p className="info-row">
          <span className="label">출연 :</span>
          <span>{cast}</span>
        </p>

        <p className="info-row">
          <span className="label">장르 :</span>
          <span>{genres}</span>
        </p>

        {production_countries?.length > 0 && (
          <p className="info-row">
            <span className="label">제작 국가 :</span>
            <span>{production_countries.map((c) => c.name).join(", ")}</span>
          </p>
        )}

        {budget > 0 && (
          <p className="info-row">
            <span className="label">예산 :</span>
            <span>{budget.toLocaleString()}$</span>
          </p>
        )}

        <div className="detail-features">
          <div className="detail-feature-tags">
            {features?.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 평균 평점 */}
        <div className="rating-box">
          <h4 className="rating-title">평균 평점</h4>

          <div className="rating-row">
            <span className="rating-score">{rating}</span>
            <span className="rating-outof"> / 10 </span>
          </div>

          <p className="rating-count">(총 {ratingCount}개 평점)</p>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
