// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import MainPage from "./Pages/MainPage";

const Layout = () => {
  return (
    <div>
      <MainPage /> 
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
