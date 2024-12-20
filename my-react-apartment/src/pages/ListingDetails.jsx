import { React, useEffect, useState } from "react";
import { getAppointments, saveAppointment } from "../services/appointmentService";
import { format } from "date-fns";
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import "./ListingDetails.css";

function ListingDetails({ isLoggedIn, currentUser }) {
    const [listing, setListing] = useState(null);           // 從 SearchBar 點進來的房屋
    const [searchResults, setSearchResults] = useState([]); // 搜尋預約結果
    const [selectedDate, setSelectedDate] = useState('');   // 使用者選擇的日期
    const [selectedTime, setSelectedTime] = useState(null); // 使用者點選的時段
    const availableTimes = [
        "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
    ];

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    // 獲取今天的日期（YYYY-MM-DD 格式）
    const today = format(new Date(), "yyyy-MM-dd");

    useEffect(() => {
        const storedListing = localStorage.getItem("listing");
        if (storedListing) {
            setListing(JSON.parse(storedListing));
        }
    }, []);

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

    useEffect(() => {
        if (listing && listing.id) {
            handleSearch(); // 當 listing.id 存在時呼叫 handleSearch
        }
    }, [listing]); // 監聽 listing 的變化

    // 檢查按鈕是否禁用邏輯
    const isTimeUnavailable = (date, time) => {
        return searchResults.some(
            (result) => result.appointmentDate === date && result.appointmentTime === time
        );
    };

    if (!listing) {
        return <Typography variant="h6">找不到相關房源。</Typography>;
    }

    const handleSave = async () => {
        if (!isLoggedIn) {
            alert("請先登入以提交預約");
            return;
        }

        try {
            saveAppointment(listing.id, currentUser.id, selectedDate, selectedTime);
            alert("預約提交成功！");
        } catch (error) {
            console.error("錯誤：", error.message);
            alert("提交預約時發生錯誤，請稍後再試！");
        }
    };


    return (
        <div className="detail">
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
                            <label htmlFor="datePicker">選擇日期：</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)} // 更新選擇的日期狀態
                                id="datePicker"
                                min={today}
                            />
                        </Typography>
                    </div>

                    <br />

                    <Typography variant="body1">
                        {"選擇時間："}
                    </Typography>
                    {availableTimes.map((time) => {
                        // 將時間轉為 Date 物件
                        const [hours, minutes] = time.split(":").map(Number);
                        const [year, month, date] = selectedDate.split("-").map(Number);
                        const currentDate = new Date(); // 當前時間
                        const timeDate = new Date(); // 提供給每個待選擇的時間判斷用
                        timeDate.setFullYear(year, month - 1, date);
                        timeDate.setHours(hours, minutes, 0, 0);

                        // 檢查是否早於當前時間
                        const isPastTime = timeDate < currentDate;

                        // 檢查當前按鈕是否已被預約
                        const isUnavailable = isTimeUnavailable(selectedDate, time);

                        return (
                            <button
                                key={time}
                                style={{
                                    margin: "5px",
                                    padding: "5px 10px",
                                    backgroundColor: selectedTime === time ? "#007BFF" : isPastTime || isUnavailable ? "#e0e0e0" : "#fff",
                                    color: selectedTime === time ? "#fff" : isPastTime || isUnavailable ? "#aaa" : "#000",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    cursor: isPastTime || isUnavailable ? "not-allowed" : "pointer",
                                }}
                                onClick={() => {
                                    if (!isPastTime && !isUnavailable) {
                                        handleTimeSelect(time);
                                    }
                                }}
                                disabled={isPastTime || isUnavailable}
                            >
                                {time}
                            </button>
                        );
                    })}

                    <br />
                    <br />

                    <Stack direction="row">
                        <Button variant="contained" size="large" endIcon={<CalendarMonthIcon />} onClick={handleSave}>
                            預約看房
                        </Button>
                    </Stack>
                </div>
                <br />
                <br />
            </Card>
        </div>
    );
};

export default ListingDetails;
