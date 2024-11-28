import React from "react";
import "./LoginPage.css";

function LoginPage() {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">QuickLease</h1>
                <input
                    type="text"
                    placeholder="電子郵件地址"
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="密碼"
                    className="login-input"
                />
                <button className="login-button">登入</button>
                {/* <div className="separator">或</div> */}
                {/* <button className="fb-login-button">使用 Facebook 帳號登入</button> */}
                <a href="#" className="forgot-password">
                    忘記密碼？
                </a>
                <div className="signup-container">
                    沒有帳號嗎？ <a href="#" className="signup-link">註冊</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
