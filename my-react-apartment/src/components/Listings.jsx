import React, { useEffect, useState } from "react";
import "./ReservationRecords.css";
import { DataGrid } from '@mui/x-data-grid';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Paper from '@mui/material/Paper';
import TabIcon from '@mui/icons-material/Tab';
import { getUserListing } from "../services/searchService";

function Listings({ currentUser }) {
    const [listings, setListings] = useState([]); // 房屋資料

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
            field: 'modify',
            headerName: '編輯房屋',
            width: 110,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleDelete(params.row.id)}
                    startIcon = {<AutoFixHighIcon />}
                >
                    編輯
                </Button>
            )
        },
        {
            field: 'delete',
            headerName: '刪除房屋',
            width: 110,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(params.row.id)}
                    startIcon = {<DeleteForeverIcon />}
                >
                    刪除
                </Button>
            )
        },
        {
            field: 'browse',
            headerName: '瀏覽房屋',
            width: 110,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="info"
                    onClick={() => handleDelete(params.row.id)}
                    startIcon = {<TabIcon />}
                >
                    瀏覽
                </Button>
            )
        }
    ];

    const rows = listings.map((listing) => ({
        id: listing.id,
        listingname: listing.listingname,
        address: listing.address,
        rent: Number(listing.rent).toLocaleString('zh-TW'), // 格式化為千分位
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
            {DataTable()}
        </div>
    );
}

export default Listings;
