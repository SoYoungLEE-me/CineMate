import React from "react";
import ReviewItem from "./ReviewItem";
import "./ReviewList.style.css";

const ReviewList = ({ reviews }) => {
  const hasReviews = reviews && reviews.length > 0;

  return (
    <div className="review-section">
      {hasReviews && <h3 className="review-title">주요 리뷰</h3>}

      {!hasReviews && <p className="review-empty">아직 리뷰가 없습니다.</p>}

      {/* 리뷰 리스트 */}
      {hasReviews && (
        <div className="review-list">
          {reviews.map((r) => {
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
      )}
    </div>
  );
};

export default ReviewList;
