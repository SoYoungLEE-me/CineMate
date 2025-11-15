import React, { useState } from "react";
import ReviewItem from "./ReviewItem";
import "./ReviewList.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ReviewList = ({ reviews }) => {
  const hasReviews = reviews && reviews.length > 0;
  const [expanded, setExpanded] = useState(false);

  // 리뷰가 없을 때
  if (!hasReviews) {
    return (
      <div className="review-section">
        <p className="review-empty">아직 리뷰가 없습니다.</p>
      </div>
    );
  }

  // 더보기 전/후 리뷰 목록
  const visibleReviews = expanded ? reviews : reviews.slice(0, 3);

  return (
    <div className="review-section">
      <h3 className="review-title">주요 리뷰</h3>

      <div className="review-list">
        {visibleReviews.map((r) => {
          const date = r.created_at?.slice(0, 10).replace(/-/g, ".");
          return (
            <ReviewItem
              key={r.id}
              author={r.author}
              content={r.content}
              date={date}
            />
          );
        })}
      </div>

      {/* 리뷰가 3개 이상일 때만 버튼 표시 */}
      {reviews.length > 3 && (
        <button
          className="review-more-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              리뷰 접기
              <FontAwesomeIcon icon={faChevronUp} className="review-btn-icon" />
            </>
          ) : (
            <>
              리뷰 더보기
              <FontAwesomeIcon
                icon={faChevronDown}
                className="review-btn-icon"
              />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ReviewList;
