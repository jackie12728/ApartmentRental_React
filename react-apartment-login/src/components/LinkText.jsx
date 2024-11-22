import React from "react";
import "./LinkText.css";

function LinkText({ href, text }) {
    return (
        <a href={href} className="link-text">
            {text}
        </a>
    );
}

export default LinkText;
