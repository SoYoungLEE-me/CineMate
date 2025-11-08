import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;

//Outlet은 Layout 안에 각 페이지 컴포넌트가 들어갈 자리를 표시하는 특수한 컴포넌트
//이 자리에 App.jsx에서 라우터로 지정한 페이지들이 들어간다고 보면 된다.
