import { React, useEffect, useState } from "react";
import { getAppointments, saveAppointment} from "../services/appointmentService";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Stack from '@mui/material/Stack';

const ListingDetails = () => {
    const [listing, setListing] = useState(null);
    const [searchResults, setSearchResults] = useState([]); // 搜尋結果

    useEffect(() => {
        const storedListing = localStorage.getItem("listing");
        if (storedListing) {
            setListing(JSON.parse(storedListing));
        }
    }, []);

    if (!listing) {
        return <Typography variant="h6">找不到相關房源。</Typography>;
    }

    const handleSearch = async () => {
        try {
            // 調用 API 獲取預約列表，從返回的數據中提取 data
            console.log(listing.id);
            const appointments = await getAppointments(Number(listing.id)).data;
            
            setSearchResults(appointments); // 更新搜尋結果
        } catch (error) {
            console.error("搜尋預約紀錄失敗：", error.message);
            alert("搜尋預約紀錄失敗，請稍後再試！");
        }
    };

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
                <Typography variant="body2" color="text.secondary">
                    地址：{listing.address}
                </Typography>
                <br />
                <Stack direction="row">
                    <Button variant="contained" size="large"  onClick={handleSearch} endIcon={<CalendarMonthIcon />}>
                        預約看房
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ListingDetails;
