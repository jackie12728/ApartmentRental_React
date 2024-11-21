import React from 'react';
import './InputField.css';

const InputField = ({ placeholder, type }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="input-field"
        />
    );
};

export default InputField;
