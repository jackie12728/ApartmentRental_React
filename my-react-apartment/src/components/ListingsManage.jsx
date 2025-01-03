import React, { useEffect, useState } from "react";
import "./ReservationRecords.css";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Paper from '@mui/material/Paper';
import TabIcon from '@mui/icons-material/Tab';
import { getUserListing } from "../services/searchService";

function Listings({ currentUser }) {
    const [listings, setListings] = useState([]); // 房屋資料

    const handleEdit = (row) => {
        sessionStorage.setItem('editListingData', JSON.stringify(row)); // 存入資料
        window.open('/editListing', '_blank'); // 開啟新分頁
    };

    const handleCreate = () => {
        window.open('/createListing', '_blank'); // 開啟新分頁
    };

    // 獲取房屋資料
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingsData = await getUserListing(Number(currentUser.id));
                setListings(listingsData.data);
            } catch (error) {
                console.error("獲取房屋資料：", error.message);
            }
        };

        fetchListings();
    }, []);

    const columns = [
        {
            field: 'listingname',
            headerName: '房屋名稱',
            width: 180,
            headerAlign: 'center', // 表頭置中
            align: 'center' // 欄位內容置中
        },
        {
            field: 'address',
            headerName: '房屋地址',
            width: 240,
            headerAlign: 'center', // 表頭置中
            align: 'center' // 欄位內容置中
        },
        {
            field: 'rent',
            headerName: '房屋租金',
            width: 110,
            headerAlign: 'center', // 表頭置中
            align: 'center' // 欄位內容置中
        },
        {
            field: 'rentalId',
            headerName: '房屋狀態',
            width: 110,
            headerAlign: 'center', // 表頭置中
            renderCell: (params) => {
                let color = '';
                let icon = null;
                let label = ''; // 初始化為空字串

                switch (params.value) {
                    case 1:
                        color = '#FFC107'; // 黃色
                        icon = <HourglassEmptyIcon style={{ color }} />;
                        label = '待出租';
                        break;
                    case 2:
                        color = '#4CAF50'; // 綠色
                        icon = <CheckCircleIcon style={{ color }} />;
                        label = '已出租';
                        break;
                    case 3:
                        color = '#8B0000';
                        icon = <DeleteForeverIcon style={{ color }} />;
                        label = '已下架';
                        break;
                    default:
                        color = '#9E9E9E'; // 灰色
                        icon = null;
                        label = '';
                }

                return (
                    <div style={{ display: 'flex', alignItems: 'center', color, justifyContent: 'center' }}>
                        {icon}
                        <span style={{ marginLeft: 8 }}>{label}</span>
                    </div>
                );
            }
        },
        {
            field: 'modify',
            headerName: '編輯房屋',
            width: 110,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleEdit(params.row)}
                    startIcon={<AutoFixHighIcon />}
                >
                    編輯
                </Button>
            )
        },
        // {
        //     field: 'browse',
        //     headerName: '瀏覽房屋',
        //     width: 110,
        //     headerAlign: 'center',
        //     align: 'center',
        //     renderCell: (params) => (
        //         <Button
        //             variant="outlined"
        //             color="info"
        //             onClick={() => handleDelete(params.row.id)}
        //             startIcon={<TabIcon />}
        //         >
        //             瀏覽
        //         </Button>
        //     )
        // }
    ];

    const rows = listings.map((listing) => ({
        id: listing.id,
        listingname: listing.listingname,
        address: listing.address,
        rent: Number(listing.rent).toLocaleString('zh-TW'), // 格式化為千分位
        description: listing.description,
        cityId: listing.cityId,
        regionId: listing.regionId,
        userId: listing.userId,
        rentalId: listing.rentalId,
        imagePaths: listing.imagePaths
    }));

    const paginationModel = { page: 0, pageSize: 5 };

    function DataTable() {
        return (
            <Paper sx={{ height: '100%', width: 870 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        );
    }

    return (
        <div className="reservation-records">
            <h2>房屋列表</h2>
            <br />
            <Button
                variant="outlined"
                color="info"
                onClick={() => handleCreate()}
                startIcon={<AddIcon />}
            >
                建立房屋
            </Button>
            <br /><br />
            {DataTable()}
        </div>
    );
}

export default Listings;
