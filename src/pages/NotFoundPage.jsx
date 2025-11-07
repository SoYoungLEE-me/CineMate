import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <div className="container">
        <h1 className="code">404</h1>
        <p className="message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="homeBtn">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
