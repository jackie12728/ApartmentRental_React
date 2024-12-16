import React, { useState } from "react";
import "./RegisterPage.css";

function RegisterPage({ onRegister }) {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(userName, email, password, phoneNumber); // 呼叫 onRegister 進行註冊驗證
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="login-box">
                    <h1 className="login-title">QuickLease</h1>
                    <label htmlFor="userName"></label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        placeholder="用戶名稱"
                        className="login-input"
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
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="手機號碼"
                        inputmode="tel"
                        required
                        className="login-input"
                        maxLength={10}  // 限制輸入最多 10 個字符
                        pattern="[0-9]*"  // 確保只允許數字輸入
                    />
                    <button type="submit" className="login-button">註冊</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
