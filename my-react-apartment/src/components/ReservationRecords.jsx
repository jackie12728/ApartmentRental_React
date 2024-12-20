import React, { useEffect, useState } from "react";
import "./ReservationRecords.css";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { getUserAppointments } from "../services/searchService";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneAllIcon from '@mui/icons-material/DoneAll';

function ReservationRecords({ currentUser }) {
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
            field: 'appointmentDate', 
            headerName: '預約日期', 
            width: 130,
            headerAlign: 'center', // 表頭置中
            align: 'center' // 欄位內容置中
        },
        { 
            field: 'appointmentTime', 
            headerName: '預約時間', 
            width: 130,
            headerAlign: 'center', // 表頭置中
            align: 'center' // 欄位內容置中
        },
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
            field: 'scheduleName', 
            headerName: '預約狀態', 
            width: 180,
            headerAlign: 'center', // 表頭置中
            renderCell: (params) => {
                let color = '';
                let icon = null;

                switch (params.value) {
                    case '等待確認':
                        color = '#FFC107'; // 黃色
                        icon = <HourglassEmptyIcon style={{ color }} />;
                        break;
                    case '接受預約':
                        color = '#4CAF50'; // 綠色
                        icon = <CheckCircleIcon style={{ color }} />;
                        break;
                    case '看房完成':
                        color = '#2196F3'; // 藍色
                        icon = <DoneAllIcon style={{ color }} />;
                        break;
                    default:
                        color = '#9E9E9E'; // 灰色
                        icon = null;
                }

                return (
                    <div style={{ display: 'flex', alignItems: 'center', color, justifyContent: 'center' }}>
                        {icon}
                        <span style={{ marginLeft: 8 }}>{params.value}</span>
                    </div>
                );
            }
        },
    ];

    // 動態生成 rows 並加入自動遞增的 id
    const rows = appointments.map((appointment, index) => ({
        id: index + 1, // 自動生成 ID
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        listingname: appointment.listingname,
        address: appointment.address,
        scheduleName: appointment.scheduleName,
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
            <h2>預約看房紀錄</h2>
            <br />
            {DataTable()}
        </div>
    );
}

export default ReservationRecords;
