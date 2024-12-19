import React, { useEffect, useState } from "react";
import "./ReservationRecords.css";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { getUserAppointments } from "../services/searchService";

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
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    function DataTable() {
        return (
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        );
    }

    return (
        <div className="reservation-records">
            <h2>預約看房紀錄</h2>
            <br />
            {DataTable()};
        </div>
    );
}

export default ReservationRecords;
