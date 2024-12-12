import { React, useEffect, useState } from "react";
import { getAppointments, saveAppointment } from "../services/appointmentService";
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

    const [date, setDate] = useState("2024-12-12");
    const [time, setTime] = useState("16:30");
    const [selectedTime, setSelectedTime] = useState(null);

    const availableTimes = ["17:00", "17:30"];

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    useEffect(() => {
        const storedListing = localStorage.getItem("listing");
        if (storedListing) {
            setListing(JSON.parse(storedListing));
            handleSearch();
        }
    }, []);

    if (!listing) {
        return <Typography variant="h6">找不到相關房源。</Typography>;
    }

    const handleSearch = async () => {
        try {
            // 調用 API 獲取預約列表，從返回的數據中提取 data
            const appointments = await getAppointments(Number(listing.id));
            setSearchResults(appointments.data); // 更新搜尋結果
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
            </CardContent>

            <br />
            <hr />

            <div style={{ width: "300px", padding: "20px" }}>
                <Typography gutterBottom variant="h5" component="div">
                    {"預約看房"}
                </Typography>

                <br />

                <div style={{ marginBottom: "10px" }}>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        {"日期："}
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </Typography>
                </div>

                <br />

                <Typography variant="body1">
                    {"選擇時間"}
                </Typography>
                {availableTimes.map((time) => (
                    <button
                        key={time}
                        style={{
                            margin: "5px",
                            padding: "5px 10px",
                            backgroundColor: selectedTime === time ? "#007BFF" : "#fff",
                            color: selectedTime === time ? "#fff" : "#000",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleTimeSelect(time)}
                    >
                        {time}
                    </button>
                ))}

                <br />
                <br />

                <div style={{ marginTop: "20px" }}>
                    <p>好消息！還有 {availableTimes.length} 個時段可供預訂</p>
                </div>

                <br />
                <br />

                {/* onClick={e} */}
                <Stack direction="row">
                    <Button variant="contained" size="large" endIcon={<CalendarMonthIcon />}>
                        預約看房
                    </Button>
                </Stack>
            </div>
            <br />
            <br />
        </Card>
    );
};

export default ListingDetails;
