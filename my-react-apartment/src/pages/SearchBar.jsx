import React, { useState, useEffect } from "react";
import { getAllCities, getRegions } from "../services/searchService";
import "./SearchBar.css";

const SearchBar = () => {
    const [cities, setCities] = useState([]); // 縣市列表
    const [districts, setDistricts] = useState([]); // 區域列表
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [budget, setBudget] = useState(""); // 預算選項
    const [keyword, setKeyword] = useState("");

    // 獲取縣市列表
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const citiesData = await getAllCities();
                if (Array.isArray(citiesData.data)) {
                    setCities(citiesData.data); // 提取 data 屬性
                } else {
                    console.error("API 返回的縣市數據不是數組");
                }
            } catch (error) {
                console.error("獲取縣市失敗:", error.message);
            }
        };

        fetchCities();
    }, []);

    // 根據選擇的縣市獲取區域列表
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                if (selectedCity) {
                    const regionsData = await getRegions(selectedCity);
                    setDistricts(regionsData.data || []); // 提取 data 或設置為空數組
                } else {
                    setDistricts([]);
                }
            } catch (error) {
                console.error("獲取區域失敗:", error.message);
            }
        };

        fetchRegions();
    }, [selectedCity]);

    const handleSearch = () => {
        const searchParams = {
            city: selectedCity,
            district: selectedDistrict,
            budget,
            keyword,
        };
        console.log("Search parameters: ", searchParams);
    };

    return (
        <div>
            {/* 縣市選單 */}
            <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                <option value="">縣市</option>
                {Array.isArray(cities) &&
                    cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
            </select>

            {/* 區域選單 */}
            <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
                <option value="">區域</option>
                {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                        {district.name}
                    </option>
                ))}
            </select>

            {/* 預算下拉選單 */}
            <select onChange={(e) => setBudget(e.target.value)} value={budget}>
                <option value="">不限</option>
                <option value="5000以下">5,000元以下</option>
                <option value="5000-10000">5,000-10,000元</option>
                <option value="10000-15000">10,000-15,000元</option>
                <option value="15000-20000">15,000-20,000元</option>
                <option value="20000-40000">20,000-40,000元</option>
                <option value="40000以上">40,000元以上</option>
            </select>

            {/* 關鍵字輸入框 */}
            <input
                type="text"
                placeholder="輸入關鍵字"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>搜尋</button>
        </div>
    );
};

export default SearchBar;