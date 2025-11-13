import React, { useEffect, useState } from "react";
import "./Banner.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarSolid,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import VideoModal from "../VideoModal/VideoModal";
import { useMovieVideosQuery } from "../../hooks/fetchMovieVideos";

const Banner = ({
  data,
  isError,
  error,
  autoSlide = true,
  showButtons = true,
  single = false, // 디테일 페이지인지 여부
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullText, setShowFullText] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  // movies 선택
  const movies = single ? [data] : data?.results?.slice(0, 3) || [];

  const { data: videos } = useMovieVideosQuery(movies[currentIndex]?.id);

  const handlePlay = () => {
    const trailer = videos?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    if (trailer) {
      setVideoKey(trailer.key);
      setShowVideo(true);
    } else {
      alert("예고편을 찾을 수 없습니다.");
    }
  };

  const getAgeRating = (cert) => {
    if (!cert) return null;

    const c = cert.trim().toUpperCase(); // 대문자 기준 통일

    // 숫자로 시작하는 것: "18", "16", "12", "6" 등
    if (/^\d+$/.test(c)) {
      return Number(c);
    }

    // 미국 MPAA
    if (c === "R") return 17;
    if (c === "NC-17") return 17;
    if (c === "PG-13") return 13;
    if (c === "PG") return 10;
    if (c === "G") return 0;

    // 홍콩
    if (c === "IIB") return 15;
    if (c === "III") return 18;

    // 싱가포르
    if (c === "M18") return 18;
    if (c === "NC16") return 16;

    // 말레이시아
    if (c.includes("18")) return 18;

    // 호주
    if (c === "R18+" || c === "MA15+") {
      return Number(c.replace(/\D/g, "")); // 숫자만 추출
    }

    // 대만
    if (c.includes("R-18")) return 18;

    // 기타 "18PL", "R18", "R-18", "18A" 등
    const onlyNumbers = c.replace(/\D/g, "");
    if (onlyNumbers) {
      return Number(onlyNumbers);
    }

    return null; // 진짜 못 읽는 등급
  };
  const navigate = useNavigate();

  const showMovieDetail = () => {
    if (!movies[currentIndex]) return;
    navigate(`/detail/${movies[currentIndex].id}`);
  };

  // 자동 전환
  useEffect(() => {
    if (single || !autoSlide) return;
    if (!movies.length) return;

    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % movies.length),
      5000
    );

    return () => clearInterval(interval);
  }, [movies, autoSlide, single]);

  const handleDotClick = (index) => {
    if (!single) setCurrentIndex(index);
  };

  if (isError) {
    return (
      <div className="banner-error">
        <h2>{error?.message}</h2>
      </div>
    );
  }

  return (
    <div className="banner">
      {movies.map((movie, index) => {
        const fallbackImage =
          "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

        const backgroundUrl = movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          : fallbackImage;

        //메타데이터
        //평점 계산
        const rating10 = movie.vote_average || 0;
        const rating5 = Math.round((rating10 / 2) * 10) / 10; // 소수점 1자리
        const fullStars = Math.floor(rating5);
        const hasHalf = rating5 % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

        //개봉 날짜
        const releaseDate = movie.release_date
          ? movie.release_date.replace(/-/g, ".")
          : null;

        //상영시간
        const runtime = movie.runtime || null;

        //시청 등급
        // 1) 국가 우선순위
        const PRIORITY = ["KR", "US", "GB", "AU", "CA", "SG", "HK", "JP"];

        // 2) 우선순위 국가 중에서 첫 번째로 certification 있는 국가 찾기
        const findCert = () => {
          if (!movie.release_dates?.results) return null;

          for (const code of PRIORITY) {
            const item = movie.release_dates.results.find(
              (r) => r.iso_3166_1 === code
            );
            if (!item) continue;

            const cert = item.release_dates?.[0]?.certification?.trim();
            if (cert) return cert; // 비어있지 않으면 바로 반환
          }

          // 3) 그래도 못 찾으면 모든 국가 중 certification 있는 첫 항목
          const fallback = movie.release_dates.results.find((r) =>
            r.release_dates?.[0]?.certification?.trim()
          );

          return fallback?.release_dates?.[0]?.certification || null;
        };

        const certText = findCert();
        const ageRating = getAgeRating(certText);

        //overview 길이 조절
        const cleanOverview = (movie.overview || "")
          .replace(/\s+/g, " ")
          .trim();

        const fullText = cleanOverview;
        const shortText = cleanOverview.slice(0, 120);

        return (
          <div
            key={movie.id}
            className={`banner-slide ${index === currentIndex ? "active" : ""}`}
          >
            {/* 배경 */}
            <div className="banner-bg">
              <img src={backgroundUrl} alt={movie.title} />
              <div className="banner-gradient"></div>
            </div>

            {/* 내용 */}
            <div className="banner-content">
              <div className="banner-text">
                <h2 className="banner-title">{movie.title}</h2>

                {/* overview 출력 */}
                {!single ? (
                  <p className="banner-desc clamped">{movie.overview}</p>
                ) : (
                  <p
                    className={`banner-desc ${single ? "detail-desc" : ""} ${
                      showFullText ? "expanded" : ""
                    }`}
                  >
                    {showFullText ? fullText : shortText}

                    {cleanOverview.length > 120 && (
                      <span
                        className="read-more-inline"
                        onClick={() => setShowFullText((prev) => !prev)}
                      >
                        {showFullText ? " ...접기" : "   ...더보기"}
                      </span>
                    )}
                  </p>
                )}

                {/* 메타데이터는 디테일(single=true)에서만 표시 */}
                {single && (
                  <div className="banner-meta detail-meta">
                    {/* 평점 라인 */}
                    <div className="rating-box">
                      {Array(fullStars)
                        .fill(0)
                        .map((_, i) => (
                          <FontAwesomeIcon
                            key={`full-${i}`}
                            icon={faStarSolid}
                            className="star-icon full"
                          />
                        ))}

                      {hasHalf && (
                        <FontAwesomeIcon
                          icon={faStarHalfAlt}
                          className="star-icon half"
                        />
                      )}

                      {Array(emptyStars)
                        .fill(0)
                        .map((_, i) => (
                          <FontAwesomeIcon
                            key={`empty-${i}`}
                            icon={faStarRegular}
                            className="star-icon empty"
                          />
                        ))}
                    </div>

                    {/* 평점 아래에서 메타데이터 라인 */}
                    <div className="banner-info-box ">
                      {releaseDate && (
                        <span className="date">{releaseDate}</span>
                      )}
                      {ageRating !== null && (
                        <span
                          className={`age-badge ${
                            ageRating >= 18 ? "adult" : "normal"
                          }`}
                        >
                          {ageRating === 0 ? "전체" : `${ageRating}+`}
                        </span>
                      )}

                      {runtime && <span className="runtime">{runtime}분</span>}
                    </div>
                  </div>
                )}

                {/* 버튼 (재생 버튼은 항상 보여야 함) */}
                {showButtons && (
                  <div className="banner-buttons">
                    <button className="btn btn-play" onClick={handlePlay}>
                      <FontAwesomeIcon icon={faPlay} className="icon" />
                      재생
                    </button>

                    {/* 상세보기 버튼은 홈에서만 */}
                    {!single && (
                      <button
                        className="btn btn-info"
                        onClick={showMovieDetail}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                        상세 정보
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* 홈 슬라이드 점 */}
      {!single && (
        <div className="banner-dots">
          {movies.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      )}
      {showVideo && (
        <VideoModal videoKey={videoKey} onClose={() => setShowVideo(false)} />
      )}
    </div>
  );
};

export default Banner;
