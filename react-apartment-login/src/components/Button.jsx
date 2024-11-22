import React from "react";
import "./Button.css";

function Button({ text, type }) {
    return (
        <button className={`login-button ${type}`}>
            {text}
        </button>
    );
}

export default Button;
