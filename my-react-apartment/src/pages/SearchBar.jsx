import React, { useState, useEffect } from "react";
import { getAllCities, getRegions, getListings, getListingImages } from "../services/searchService";
import "./SearchBar.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const SearchBar = () => {
    const [cities, setCities] = useState([]); // 縣市列表
    const [districts, setDistricts] = useState([]); // 區域列表
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistricts, setSelectedDistricts] = useState([]); // 區域多選
    const [budget, setBudget] = useState("");
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

    // 更新選中的區域，限制最多選擇三個
    const handleDistrictChange = (districtId) => {
        if (selectedDistricts.includes(districtId)) {
            // 如果已選擇，則取消選中
            setSelectedDistricts(selectedDistricts.filter((id) => id !== districtId));
        } else {
            // 如果未選擇，檢查是否超過三個
            if (selectedDistricts.length < 3) {
                setSelectedDistricts([...selectedDistricts, districtId]);
            } else {
                alert("最多只能選擇三個區域");
            }
        }
    };

    const handleSearch = () => {
        const searchParams = {
            city: selectedCity,
            districts: selectedDistricts, // 選中的區域
            budget,
            keyword,
        };
        console.log("Search parameters: ", searchParams);
    };

    return (
        <>
            <div className="search-bar">
                {/* 縣市選單 */}
                <select
                    className="dropdown"
                    onChange={(e) => setSelectedCity(e.target.value)}
                    value={selectedCity}
                >
                    <option value="">縣市</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>

                {/* 區域多選 - 勾選 */}
                <div className="districts">
                    <p>選擇區域（最多3個）：</p>
                    <div className="checkbox-container">
                        {districts.map((district) => (
                            <label key={district.id} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    value={district.id}
                                    checked={selectedDistricts.includes(district.id)}
                                    onChange={() => handleDistrictChange(district.id)}
                                />
                                {district.name}
                            </label>
                        ))}
                    </div>
                </div>

                {/* 預算下拉選單 */}
                <select
                    className="dropdown"
                    onChange={(e) => {
                        const selectedValue = JSON.parse(e.target.value); // 將 JSON 字符串解析為物件
                        setBudget(selectedValue); // 將解析後的 minRent 和 maxRent 存入 state
                    }}
                >
                    <option value={JSON.stringify({ minRent: null, maxRent: null })}>不限</option>
                    <option value={JSON.stringify({ minRent: null, maxRent: 5000 })}>5,000元以下</option>
                    <option value={JSON.stringify({ minRent: 5000, maxRent: 10000 })}>5,000-10,000元</option>
                    <option value={JSON.stringify({ minRent: 10000, maxRent: 15000 })}>10,000-15,000元</option>
                    <option value={JSON.stringify({ minRent: 15000, maxRent: 20000 })}>15,000-20,000元</option>
                    <option value={JSON.stringify({ minRent: 20000, maxRent: 40000 })}>20,000-40,000元</option>
                    <option value={JSON.stringify({ minRent: 40000, maxRent: null })}>40,000元以上</option>
                </select>


                {/* 關鍵字輸入框 */}
                <input
                    className="input"
                    type="text"
                    placeholder="輸入關鍵字"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="button" onClick={handleSearch}>
                    搜尋
                </button>
            </div>
            <div>
                <br />
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/listingImages/house-Brian-Babb.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </>

    );
};

export default SearchBar;