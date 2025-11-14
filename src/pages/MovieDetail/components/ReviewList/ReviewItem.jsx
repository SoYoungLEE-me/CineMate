import React, { useState } from "react";

const ReviewItem = ({ author, content, date }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = content.length > 120;

  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-author">{author}</span>
        <span className="review-date">{date}</span>
      </div>

      <p className="review-content">
        {!expanded && isLong ? content.slice(0, 120) + "..." : content}

        {isLong && (
          <button
            className="review-toggle"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "접기" : "더보기"}
          </button>
        )}
      </p>
    </div>
  );
};

export default ReviewItem;
