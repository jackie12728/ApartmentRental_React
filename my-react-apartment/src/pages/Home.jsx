import React from "react";
import SearchBar from "../components/SearchBar"; // 引入 SearchBar
import "./Home.css";

function Home({isLoggedIn}) {
  return (
    <div className="centered-div">
      <h1>歡迎來到租屋平台</h1>
      <p>探索我們的房屋，找到最適合你的租屋選項！</p>
      {/* 在這裡插入 SearchBar */}
      <SearchBar isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default Home;