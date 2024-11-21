import React from 'react';
import './Button.css';

const Button = ({ text, color, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="custom-button"
            style={{ backgroundColor: color }}
        >
            {text}
        </button>
    );
};

export default Button;
