import React from "react";
import "./InputField.css";

function InputField({ type, placeholder }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="login-input"
        />
    );
}

export default InputField;
