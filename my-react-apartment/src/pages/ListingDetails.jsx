import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ListingDetails = () => {
    const { state } = useLocation(); // 取得傳遞的 state
    const navigate = useNavigate(); // 用於返回上一頁
    const listing = state?.listing;
    const resultParams = state?.resultParams; // 獲取搜尋狀態

    if (!listing) {
        return <Typography variant="h6">找不到相關房源。</Typography>;
    }

    return (
        <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
            <CardMedia
                component="img"
                height="300"
                image={listing.imageUrl}
                alt={listing.listingname}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {listing.listingname || "未命名房源"}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    {listing.description || "此房源尚無詳細描述。"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    租金：{listing.rent} 元/月
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ListingDetails;
