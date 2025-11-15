import React, { useState, useEffect } from "react";
import "./Navbar.style.css";
import { Link } from "react-router-dom";
import logo from "../../assets/cinemate-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isError, error } = usePopularMoviesQuery();

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleOpenSearch = () => setIsSearchOpen(true);
  const handleCloseSearch = () => setIsSearchOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const search = (e) => {
    if (e.key === "Enter") {
      handleOnSearch();
      handleCloseSearch();
      setKeyword("");
    }
  };

  const handleOnSearch = () => {
    navigate(`/browse?q=${keyword}`);
  };

  const handleSelectMovie = (id) => {
    navigate(`/detail/${id}`);
    setIsSearchOpen(false);
  };

  if (isError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "600px",
          color: "#E50914",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        <h2>{error.message}</h2>
      </div>
    );
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="logo">
              <img src={logo} alt="CineMate 로고" />
            </Link>

            <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
              <FontAwesomeIcon icon={faBars} />
            </button>

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
            <button className="search-icon-btn" onClick={handleOpenSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            <Link to="/login" className="login-btn">
              로그인
            </Link>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <img src={logo} alt="CineMate 로고" className="mobile-logo" />
          <button
            className="menu-close-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <ul className="mobile-nav-list">
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              홈
            </Link>
          </li>
          <li>
            <Link to="/browse" onClick={() => setIsMenuOpen(false)}>
              탐색
            </Link>
          </li>
          <li>
            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
              내가 찜한 콘텐츠
            </Link>
          </li>
        </ul>
      </div>

      {/* 사이드바 오버레이 */}
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 검색창 오버레이 */}
      <div className={`search-overlay ${isSearchOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={handleCloseSearch}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="search-container">
          <div className="search-input-wrap">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              placeholder="제목을 입력하세요."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={search}
            />
          </div>
        </div>

        {/* 슬라이드 구현 */}

        {data &&
          data.results &&
          (() => {
            const movies = data.results.filter((m) => m.backdrop_path);
            const mid = Math.ceil(movies.length / 2);

            const firstRow = movies.slice(0, mid);
            const secondRow = movies.slice(mid);

            return (
              <div className="search-overlay-marquee">
                <div className="marquee-row">
                  <div className="marquee-content">
                    {firstRow.map((movie) => (
                      <img
                        key={movie.id}
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                        className="marquee-img"
                        onClick={() => handleSelectMovie(movie.id)}
                      />
                    ))}

                    {firstRow.map((movie) => (
                      <img
                        key={`first-dup-${movie.id}`}
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                        className="marquee-img"
                        onClick={() => handleSelectMovie(movie.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* 두 번째 줄 */}
                <div className="marquee-row reverse">
                  <div className="marquee-content">
                    {secondRow.map((movie) => (
                      <img
                        key={`row2-${movie.id}`}
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                        className="marquee-img"
                        onClick={() => handleSelectMovie(movie.id)}
                      />
                    ))}

                    {/* 복제본 */}
                    {secondRow.map((movie) => (
                      <img
                        key={`row2-dup-${movie.id}`}
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                        className="marquee-img"
                        onClick={() => handleSelectMovie(movie.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
      </div>
    </>
  );
};

export default Navbar;
