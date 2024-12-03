import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Home.css";
import SearchBar from "./SearchBar"; // 引入 SearchBar

function Home() {
  return (
    <div>
      <Helmet>
        <title>QuickLease</title> {/* 網頁標題 */}
      </Helmet>
      <h1>歡迎來到租屋平台</h1>
      <p>探索我們的房屋，找到最適合你的租屋選項！</p>
      
      {/* 在這裡插入 SearchBar */}
      <SearchBar />
    </div>
  );
}

export default Home;