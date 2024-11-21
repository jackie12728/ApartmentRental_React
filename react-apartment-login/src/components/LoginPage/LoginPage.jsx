import React from 'react';
import './LoginPage.css';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-card">
                <InputField placeholder="電子郵件地址或手機號碼" type="text" />
                <InputField placeholder="密碼" type="password" />
                <Button text="登入" color="#1877F2" onClick={() => alert("登入中...")} />
                <ForgotPassword />
                <Button text="建立新帳號" color="#42B72A" onClick={() => alert("建立帳號")} />
            </div>
        </div>
    );
};

export default LoginPage;
