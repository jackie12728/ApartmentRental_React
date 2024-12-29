import React, { useState, useEffect } from "react";
import { getVerificationCode, verifyCode } from '../services/verificationService';
import { sendVerification, validateCode } from '../services/authService';
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
    const [showEmailVerification, setShowEmailVerification] = useState(false);
    const [emailVerificationCode, setEmailVerificationCode] = useState('');

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
            // 首先驗證圖形驗證碼
            const imageVerificationResult = await verifyCode(uuid, userInput);
            if (imageVerificationResult.status === 200) {
                // 圖形驗證碼正確，發送 Email 驗證碼
                const emailVerificationResult = await sendVerification(email);
                if (emailVerificationResult.status === 200) {
                    setShowEmailVerification(true);
                } else {
                    alert("發送 Email 驗證碼失敗，請重試！");
                }
            } else {
                alert("圖形驗證碼輸入錯誤，請重試！");
                fetchVerificationCode();
            }
        } catch (error) {
            console.error('驗證失敗:', error);
            alert("驗證過程發生錯誤，請重試！");
        }
    };

    const handleEmailVerification = async () => {
        try {
            const result = await validateCode(email, emailVerificationCode);
            if (result.status === 200) {
                // Email 驗證碼正確，進行註冊
                onRegister(userName, email, password, phoneNumber);
                setShowEmailVerification(false);
            } else {
                alert("Email 驗證碼錯誤，請重試！");
            }
        } catch (error) {
            console.error('Email 驗證失敗:', error);
            alert("驗證過程發生錯誤，請重試！");
        }
    };

    return (
        <div className="login-container">
            {!showEmailVerification ? (
                <form onSubmit={handleSubmit}>
                    <div className="login-box">
                        <h1 className="login-title">QuickLease</h1>
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
                            maxLength={10}
                            pattern="[0-9]*"
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
            ) : (
                <div className="login-box">
                    <h2>請輸入 Email 驗證碼</h2>
                    <input
                        type="text"
                        value={emailVerificationCode}
                        onChange={(e) => setEmailVerificationCode(e.target.value)}
                        placeholder="請輸入 Email 驗證碼"
                        required
                        className="login-input"
                    />
                    <button onClick={handleEmailVerification} className="login-button">
                        驗證
                    </button>
                </div>
            )}
        </div>
    );
}

export default RegisterPage;
