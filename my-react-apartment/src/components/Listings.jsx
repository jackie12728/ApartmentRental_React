import React, { useEffect, useState } from "react";
import "./ReservationRecords.css";
import { DataGrid } from '@mui/x-data-grid';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Paper from '@mui/material/Paper';
import { getUserAppointments } from "../services/searchService";

function Listings({ currentUser }) {
    const [appointments, setAppointments] = useState([]); // 預約紀錄

    // 獲取預約列表
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const appointmentsData = await getUserAppointments(Number(currentUser.id));
                setAppointments(appointmentsData.data);
            } catch (error) {
                console.error("獲取預約紀錄失敗：", error.message);
            }
        };

        fetchAppointments();
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
            width: 130,
            headerAlign: 'center', // 表頭置中
            align: 'center' // 欄位內容置中
        },
        {
            field: 'modify',
            headerName: '編輯房屋',
            width: 130,
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
            width: 130,
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
        }
        
    ];

    // 動態生成 rows 並加入自動遞增的 id
    const rows = appointments.map((appointment, index) => ({
        id: index + 1, // 自動生成 ID
        listingname: appointment.listingname,
        address: appointment.address
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
