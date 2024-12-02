import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Home.css";

function Home() {
  const SearchBar = () => {
    const [cities, setCities] = useState([]); // 縣市列表
    const [districts, setDistricts] = useState([]); // 區域列表
    const [selectedCity, setSelectedCity] = useState(""); // 當前選擇的縣市
    const [selectedDistrict, setSelectedDistrict] = useState(""); // 當前選擇的區域
    const [budget, setBudget] = useState(""); // 預算
    const [keyword, setKeyword] = useState(""); // 關鍵字

    // 獲取縣市列表
    useEffect(() => {
      axios.get("/api/locations/cities").then((response) => {
        setCities(response.data);
      });
    }, []);

    // 根據選擇的縣市獲取區域列表
    useEffect(() => {
      if (selectedCity) {
        axios
          .get("/api/locations/districts", { params: { city: selectedCity } })
          .then((response) => {
            setDistricts(response.data);
          });
      } else {
        setDistricts([]);
      }
    }, [selectedCity]);

    // 搜尋按鈕的處理邏輯
    const handleSearch = () => {
      const searchParams = {
        city: selectedCity,
        district: selectedDistrict,
        budget,
        keyword,
      };
      console.log("Search parameters: ", searchParams);
      // 可將此參數傳遞給後端進行搜尋
    };
  };

  return (
    <>
      <div>
        <Helmet>
          <title>QuickLease</title> {/* 網頁標題 */}
        </Helmet>
        <h1>歡迎來到購物車範例</h1>
        <p>探索我們的商品，並將喜愛的商品加入購物車！</p>
      </div>
      <div className="search-bar-container">
        <select
          className="search-bar-select"
          onChange={(e) => setSelectedCity(e.target.value)}
          // value={selectedCity}
        >
          <option value="">縣市</option>
          {/* {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))} */}
        </select>

        <select
          className="search-bar-select"
          onChange={(e) => setSelectedDistrict(e.target.value)}
          // value={selectedDistrict}
        >
          <option value="">區域</option>
          {/* {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))} */}
        </select>

        <input
          className="search-bar-input"
          type="text"
          placeholder="輸入預算"
          // value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          className="search-bar-input"
          type="text"
          placeholder="輸入關鍵字"
          // value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* <button className="search-bar-button" onClick={handleSearch}>
          搜尋
        </button> */}
      </div>
    </>
  );
}

export default Home;