import React from "react";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <div>
      <Helmet>
        <title>QuickLease</title> {/* 網頁標題 */}
      </Helmet>
      <h1>歡迎來到購物車範例</h1>
      <p>探索我們的商品，並將喜愛的商品加入購物車！</p>
    </div>
  );
}

export default Home;