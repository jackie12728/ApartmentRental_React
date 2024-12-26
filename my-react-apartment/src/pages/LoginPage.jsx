import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // 驗證驗證碼
        if (!validateCaptcha(captchaInput)) {
            alert("驗證碼輸入錯誤，請重試！");
            return;
        }

        onLogin(email, password); // 呼叫 onLogin 進行登入驗證
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
