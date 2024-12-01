import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password); // 呼叫 onLogin 進行登入驗證
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="login-box">
                    <h1 className="login-title">QuickLease</h1>
                    <label htmlFor="email"></label>
                    <input
                        type="text"
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
                        className="login-input"
                    />
                    <button type="submit" className="login-button">登入</button>
                    {/* <div className="separator">或</div> */}
                    {/* <button className="fb-login-button">使用 Facebook 帳號登入</button> */}
                    <a href="#" className="forgot-password">
                        忘記密碼？
                    </a>
                    <div className="signup-container">
                        沒有帳號嗎？ <a href="#" className="signup-link">註冊</a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
