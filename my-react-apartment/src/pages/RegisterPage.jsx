import React, { useState, useEffect } from "react";
import { getVerificationCode, verifyCode } from '../services/verificationService';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import "./RegisterPage.css";

function RegisterPage({ onRegister }) {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [uuid, setUuid] = useState('');
    const [verificationImage, setVerificationImage] = useState('');
    const [userInput, setUserInput] = useState('');

    const fetchVerificationCode = async () => {
        try {
            const result = await getVerificationCode();
            if (result.status == "200") {
                setUuid(result.data.uuid);
                setVerificationImage(result.data.code);
            } else {
                // 處理錯誤
                console.error(result.message);
            }
        } catch (error) {
            console.error('獲取驗證碼失敗:', error);
        }
    };

    useEffect(() => {
        // 組件加載時獲取驗證碼
        fetchVerificationCode();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await verifyCode(uuid, userInput);
            if (result.status == "200") {
                onRegister(userName, email, password, phoneNumber);
                // 驗證成功處理
                console.log('驗證成功');
            } else {
                // 驗證失敗處理
                console.error('驗證失敗:');
                alert("驗證碼輸入錯誤，請重試！");
                // 重新獲取驗證碼
                fetchVerificationCode();
            }
        } catch (error) {
            console.error('驗證失敗:', error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="login-box">
                    <h1 className="login-title">QuickLease</h1>
                    <label htmlFor="userName"></label>
                    <input
                        type="text"
                        id="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        placeholder="用戶名稱"
                        className="login-input"
                        autoComplete="username"
                    />
                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="電子郵件地址"
                        className="login-input"
                        autoComplete="email"
                    />
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="密碼"
                        required
                        className="login-input"
                        autoComplete="current-password"
                    />
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="手機號碼"
                        inputMode="tel"
                        required
                        className="login-input"
                        maxLength={10} // 限制輸入最多 10 個字符
                        pattern="[0-9]*" // 確保只允許數字輸入
                    />

                    <br /><br /><br />
                    <img src={verificationImage} alt="驗證碼" />
                    <IconButton color="primary" aria-label="重新整理按鈕" onClick={fetchVerificationCode}>
                        <RefreshIcon />
                    </IconButton>

                    <br />
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="請輸入驗證碼"
                        required
                        className="login-input"
                    />
                    <br /><br /><br />

                    <button type="submit" className="login-button">註冊</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
