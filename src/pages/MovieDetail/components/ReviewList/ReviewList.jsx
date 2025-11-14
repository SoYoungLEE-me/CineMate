import React from "react";
import ReviewItem from "./ReviewItem";
import "./ReviewList.style.css";

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-section">
      <h3 className="review-title">주요 리뷰</h3>

      {(!reviews || reviews.length === 0) && (
        <p className="review-empty">아직 리뷰가 없습니다.</p>
      )}

      <div className="review-list">
        {reviews?.map((r) => {
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
    </div>
  );
};

export default ReviewList;
