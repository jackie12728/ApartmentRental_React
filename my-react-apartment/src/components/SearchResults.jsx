import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import "./SearchResults.css"; // 如需樣式，請自行新增此檔案

const SearchResults = ({ results }) => {
    const itemsPerPage = 4; // 每頁顯示的項目數量
    const [currentPage, setCurrentPage] = useState(0);

    // 計算分頁數量
    const pageCount = Math.ceil(results.length / itemsPerPage);

    // 處理頁碼點擊
    const handlePageChange = (data) => {
        setCurrentPage(data.selected);
    };

    // 根據當前頁碼選取顯示的結果
    const displayedResults = results.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <div className="search-results">
            {/* 顯示搜尋結果 */}
            {displayedResults.map((listing) => (
                <Card key={listing.id} className="card" sx={{ maxWidth: 345 }}>
                    <Link
                        to={`/listing/${listing.id}`}
                        state={{ listing }} // 將完整資料透過 state 傳遞
                        style={{ textDecoration: "none" }}
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
                    </Link>
                </Card>
            ))}

            {/* 分頁 */}
            <ReactPaginate
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
    );
};

// PropTypes 用於驗證 props
SearchResults.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            imageUrl: PropTypes.string,
            listingname: PropTypes.string,
            description: PropTypes.string,
            rent: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default SearchResults;
