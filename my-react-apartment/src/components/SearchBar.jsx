import React, { useState, useEffect } from "react";
import { getAllCities, getRegions, getListings } from "../services/searchService";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import ReactPaginate from "react-paginate";
import "./SearchBar.css";

const SearchBar = () => {
    const [cities, setCities] = useState([]);                       // 縣市列表
    const [districts, setDistricts] = useState([]);                 // 區域列表
    const [selectedCity, setSelectedCity] = useState("");           // 選擇的縣市
    const [selectedDistricts, setSelectedDistricts] = useState([]); // 區域多選
    const [budget, setBudget] = useState("");                       // 選擇的預算
    const [keyword, setKeyword] = useState("");                     // 搜尋的關鍵字
    const [searchResults, setSearchResults] = useState([]);         // 搜尋結果
    const [currentPage, setCurrentPage] = useState(0);              // 當前頁數

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

    const handleSearch = async () => {
        try {
            const params = {
                cityId: selectedCity || null,
                regionIds: selectedDistricts.length > 0 ? selectedDistricts : null,
                minRent: budget.minRent || null,
                maxRent: budget.maxRent || null,
                listingName: keyword || null,
            };

            // 調用主 API 獲取房源列表
            const response = await getListings(params);

            // 從 API 返回的數據中提取 data
            const listings = response.data.map((listing) => ({
                ...listing,
                imageUrl: listing.imagePaths?.[0]
                    ? `http://localhost:8080${listing.imagePaths[0]}`
                    : "https://via.placeholder.com/345x140?text=No+Image", // 默認封面
            }));

            setSearchResults(listings); // 更新搜尋結果
            setCurrentPage(0); // 頁碼回到第一頁
        } catch (error) {
            console.error("搜尋失敗：", error.message);
            alert("搜尋失敗，請稍後再試！");
        }
    };

    const itemsPerPage = 4; // 每頁顯示的項目數量

    // 計算分頁數量
    const pageCount = Math.ceil(searchResults.length / itemsPerPage);

    // 處理頁碼點擊
    const handlePageChange = (data) => {
        setCurrentPage(data.selected);
    };

    // 根據當前頁碼選取顯示的結果
    const displayedResults = searchResults.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <div className="search-page">
            <div className="search-bar-container">
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
                    < br />

                    <div>
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
                        &nbsp;&nbsp;&nbsp;

                        {/* 關鍵字輸入框 */}
                        <input
                            className="input"
                            type="text"
                            placeholder="輸入關鍵字"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        &nbsp;&nbsp;&nbsp;

                        <button className="button" onClick={handleSearch}>
                            搜尋
                        </button>
                    </div>
                </div>
            </div>
            <br />

            {/* 搜尋結果 */}
            <div>
                <div className="search-results">
                    {/* 顯示搜尋結果 */}
                    {displayedResults.map((listing) => (
                        <Card key={listing.id} className="card" sx={{ maxWidth: 345 }}>
                            <a
                                href={`/listing/${listing.id}`}
                                target="_blank"
                                rel="noopener noreferrer" // 安全性措施，防止跨站點腳本攻擊
                                style={{ textDecoration: "none" }}
                                onClick={() => {
                                    localStorage.setItem("listing", JSON.stringify(listing));
                                }}
                            >

                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={listing.imageUrl}
                                        alt={listing.listingname}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {listing.listingname || "未命名房源"}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            {listing.description || "此房源尚無詳細描述。"}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: "primary.main", marginTop: 1 }}>
                                            租金：{listing.rent} 元/月
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </a>
                        </Card>
                    ))}

                </div>
                <div>
                    {/* 分頁 */}
                    <ReactPaginate
                        // key={currentPage} // 使用 key 來強制重新渲染
                        previousLabel={"上一頁"}
                        nextLabel={"下一頁"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;