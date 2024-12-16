import React, { useState } from "react";
import "./ProfileInfo.css";

function ProfileInfo({currentUser}) {
    // 假設會員的基本資訊
    // const [userInfo, setUserInfo] = useState({
    //     avatar: "https://via.placeholder.com/80", // 頭像圖片
    //     name: "鄭善一",
    //     birthday: "1994年11月21日",
    //     gender: "男性",
    //     email: ["as212638@gmail.com", "jackie3389@yahoo.com.tw"],
    //     phone: "0909 674 687",
    // });

    // 模擬修改功能
    const handleEdit = () => {
        alert("進入資訊修改頁面或彈出修改視窗");
    };

    return (
        <div className="profile-info-container">
            {/* 標題 */}
            <h2 className="profile-title">基本資訊</h2>

            {/* 基本資訊表格 */}
            <div className="profile-section">
                <div className="profile-header">
                    {/* <img
                        src={userInfo.avatar}
                        alt="user-avatar"
                        className="avatar"
                    /> */}
                    <div className="profile-name">
                        <h3>{currentUser.username}</h3>
                    </div>
                    <button className="edit-button" onClick={handleEdit}>
                        修改資訊
                    </button>
                </div>

                {/* 資料顯示表格 */}
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <td className="label"> 電話 </td>
                            <td>{currentUser.phoneNumber}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProfileInfo;
