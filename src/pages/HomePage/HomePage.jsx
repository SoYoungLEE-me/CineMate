import React from "react";
import "./HomePage.style.css";
import Banner from "./components/Banner/Banner";

const HomePage = () => {
  return (
    <div className="home">
      <Banner />
      <h1>홈페이지입니다.</h1>
    </div>
  );
};

export default HomePage;
