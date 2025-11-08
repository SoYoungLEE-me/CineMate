import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cinemate-logo.svg";
import SearchIcon from "./icons/SearchIcon";
import CloseIcon from "./icons/CloseIcon";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOpenSearch = () => setIsSearchOpen(true);
  const handleCloseSearch = () => setIsSearchOpen(false);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="logo">
              <img src={logo} alt="CineMate 로고" />
            </Link>
            <ul className="nav-menu">
              <li>
                <Link to="/">홈</Link>
              </li>
              <li>
                <Link to="/browse">탐색</Link>
              </li>
              <li>
                <Link to="/wishlist">내가 찜한 콘텐츠</Link>
              </li>
            </ul>
          </div>

          <div className="navbar-right">
            <button className="icon-btn" onClick={handleOpenSearch}>
              <SearchIcon />
            </button>
            <Link to="/login" className="login-btn">
              로그인
            </Link>
          </div>
        </div>
      </nav>

      <div className={`search-overlay ${isSearchOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={handleCloseSearch}>
          <CloseIcon />
        </button>
        <div className="search-container">
          <div className="search-input-wrap">
            <SearchIcon />
            <input type="text" placeholder="제목을 입력하세요." />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
