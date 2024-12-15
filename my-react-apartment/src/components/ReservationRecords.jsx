import React from "react";
import "./ReservationRecords.css";

function ReservationRecords() {
    const reservations = [
        { id: 1, date: "2024-12-01", property: "台北市中山區某公寓" },
        { id: 2, date: "2024-12-05", property: "新北市永和區某別墅" },
    ];

    return (
        <div className="reservation-records">
            <h3>預約看房紀錄</h3>
            <ul>
                {reservations.map((item) => (
                    <li key={item.id}>
                        日期：{item.date}，物件：{item.property}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReservationRecords;
