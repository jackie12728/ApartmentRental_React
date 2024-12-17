import React, { useState } from "react";
import "./ProfileInfo.css";
import { updateUserPhoneNumber } from "../services/authService";

function ProfileInfo({ currentUser }) {
    const [isModalOpen, setIsModalOpen] = useState(false);    // 控制彈出視窗顯示
    const [newPhoneNumber, setNewPhoneNumber] = useState(""); // 新的電話號碼
    const [loading, setLoading] = useState(false);            // 更新狀態

    // 開啟彈出視窗
    const handleEdit = () => {
        setNewPhoneNumber(currentUser.phoneNumber || ""); // 預設帶入當前電話號碼
        setIsModalOpen(true);
    };

    // 關閉彈出視窗
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 更新電話號碼
    const handleUpdatePhoneNumber = async () => {
        setLoading(true);
        try {
            await updateUserPhoneNumber(currentUser.id, newPhoneNumber); // 呼叫 API 更新電話號碼
            alert("電話號碼更新成功！");
            currentUser.phoneNumber = newPhoneNumber; // 本地即時更新
            setIsModalOpen(false);
        } catch (error) {
            console.error("更新失敗:", error);
            alert("更新失敗，請重試！");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-info-container">
            {/* 標題 */}
            <h2 className="profile-title">基本資訊</h2>

            {/* 基本資訊表格 */}
            <div className="profile-section">
                <div className="profile-header">
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

            {/* 彈出視窗 */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>修改電話號碼</h3>
                        <input
                            type="text"
                            value={newPhoneNumber}
                            onChange={(e) => {
                                const input = e.target.value;
                                // 只允許輸入數字，限制長度為 10 位數
                                if (/^\d*$/.test(input) && input.length <= 10) {
                                    setNewPhoneNumber(input);
                                }
                            }}
                            placeholder="請輸入10位數的新電話號碼"
                            maxLength={10} // 限制最大長度
                        />

                        <div className="modal-actions">
                            <button onClick={handleUpdatePhoneNumber} disabled={loading}>
                                {loading ? "更新中..." : "確認修改"}
                            </button>
                            <button onClick={handleCloseModal}>取消</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileInfo;
