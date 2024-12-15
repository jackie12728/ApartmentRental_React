import React from "react";
import "./ProfileHeader.css";

function ProfileHeader() {
    return (
        <div className="profile-header">
            <img
                src="https://via.placeholder.com/80"
                alt="user-avatar"
                className="avatar"
            />
            <h2>KingBradley0</h2>
            <p>等級：LV6</p>
            <p>經驗值：32425 / 28800</p>
        </div>
    );
}

export default ProfileHeader;
