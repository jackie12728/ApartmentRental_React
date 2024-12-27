import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getVerificationCode, verifyCode } from '../services/verificationService';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import "./LoginPage.css";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const result = await verifyCode(uuid, userInput);
            if (result.status == "200") {
                onLogin(email, password); // 呼叫 onLogin 進行登入驗證
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

    useEffect(() => {
        // 組件加載時獲取驗證碼
        fetchVerificationCode();
    }, []);

    return (
        <div className="login-container">
            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={handleVerify}>
                <div className="login-box">
                    <h1 className="login-title">QuickLease</h1>
                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="電子郵件地址"
                        className="login-input"
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
                    />

                    <br /><br />
                    <img src={verificationImage} alt="驗證碼" />
                    <IconButton color="primary" aria-label="重新整理按鈕" onClick={fetchVerificationCode}>
                        <RefreshIcon />
                    </IconButton>

                    <br /><br />
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="請輸入驗證碼"
                        required
                        className="login-input"
                    />
                    <br /><br /><br />

                    <button type="submit" className="login-button">登入</button>
                    <a href="#" className="forgot-password">
                        忘記密碼？
                    </a>
                    <div className="signup-container">
                        沒有帳號嗎？
                        <Link to="/register" className="signup-link">
                            註冊
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
