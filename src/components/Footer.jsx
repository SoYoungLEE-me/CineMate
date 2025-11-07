import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/">자주 묻는 질문</Link>
          <Link to="/">고객 센터</Link>
          <Link to="/">이용 약관</Link>
          <Link to="/">개인정보 처리방침</Link>
          <Link to="/">쿠키 설정</Link>
          <Link to="/">회사 정보</Link>
          <Link to="/">미디어 센터</Link>
          <Link to="/">투자 정보</Link>
        </div>
        <p className="footer-copy">&copy; 2025 CineMate. 모든 권리 보유.</p>
      </div>
    </footer>
  );
};

export default Footer;
