import React, { useState, useEffect } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import "./RegisterPage.css";

function RegisterPage({ onRegister }) {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // 驗證驗證碼
        if (!validateCaptcha(captchaInput)) {
            alert("驗證碼輸入錯誤，請重試！");
            return;
        }

        // 調用 onRegister 並傳遞輸入數據
        onRegister(userName, email, password, phoneNumber);
    };

    useEffect(() => {
        // 初始化驗證碼引擎
        loadCaptchaEnginge(4); // 生成4位數驗證碼
    }, []);

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
                        inputMode="tel"
                        required
                        className="login-input"
                        maxLength={10} // 限制輸入最多 10 個字符
                        pattern="[0-9]*" // 確保只允許數字輸入
                    />
                    
                    {/* 圖形驗證碼部分 */}
                    <LoadCanvasTemplate />
                    <input
                        type="text"
                        placeholder="輸入驗證碼"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        required
                        className="login-input"
                    />
                    <br />驗證碼有區分大小寫<br /><br />

                    <button type="submit" className="login-button">註冊</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
