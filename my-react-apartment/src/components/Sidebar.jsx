import React from "react";
import "./Sidebar.css";

function Sidebar({ setCurrentTab, currentUser }) {
    return (
        <div className="sidebar">
            <ul>
                <li onClick={() => setCurrentTab("profile")}>個人資訊</li>
                <li onClick={() => setCurrentTab("reservations")}>預約看房紀錄</li>
                <li onClick={() => setCurrentTab("favorites")}>收藏紀錄</li>
                {currentUser.permissionId === 2 && (
                    <li onClick={() => setCurrentTab("listings")}>房屋管理</li>
                )}
                {currentUser.permissionId === 1 && (
                    <li onClick={() => setCurrentTab("becomeLandlord")}>成為房東</li>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
