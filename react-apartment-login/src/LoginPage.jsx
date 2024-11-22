import React from "react";
import Title from "./components/Title";
import InputField from "./components/InputField";
import Button from "./components/Button";
import LinkText from "./components/LinkText";
import "./LoginPage.css";

function LoginPage() {
    return (
        <div className="login-container">
            <div className="login-box">
                <Title text="QuickLease" />
                <InputField
                    type="text"
                    placeholder="電子郵件地址"
                />
                <InputField type="password" placeholder="密碼" />
                <Button text="登入" type="primary" />
                {/* <div className="separator">或</div> */}
                {/* <Button text="使用 Facebook 帳號登入" type="secondary" /> */}
                <LinkText href="#" text="忘記密碼？" />
                <div className="signup-container">
                    沒有帳號嗎？ <LinkText href="#" text="註冊" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
