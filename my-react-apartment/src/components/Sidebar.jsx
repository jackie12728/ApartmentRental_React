import React from "react";
import "./Sidebar.css";

function Sidebar({ setCurrentTab }) {
    return (
        <div className="sidebar">
            <ul>
                <li onClick={() => setCurrentTab("profile")}>個人資訊</li>
                <li onClick={() => setCurrentTab("reservations")}>預約看房紀錄</li>
                <li onClick={() => setCurrentTab("favorites")}>收藏紀錄</li>
            </ul>
        </div>
    );
}

export default Sidebar;
