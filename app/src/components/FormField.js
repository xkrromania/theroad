import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ label, type, name, value, options, handleChange }) => {
    return (
        <div className={`form-field ${ type === 'stat' ? 'form-field--stat': ''}`}>
            <label htmlFor={name} className="label">
                {label}
            </label>
            {type === 'stat' && (
                <input
                    id={name}
                    className="input"
                    name={name}
                    autoComplete="off"
                    min="1"
                    max="10"
                    type="number"
                    value={value}
                    onChange={handleChange}
                />
            )}

            {type === 'number' && (
                <input
                    id={name}
                    className="input"
                    name={name}
                    autoComplete="off"
                    type={type}
                    value={value}
                    onChange={handleChange}
                />
            )}

            {type === 'text' && (
                <input
                    className="input"
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                />
            )}

            {type === 'textarea' && (
                <textarea
                    className="textarea"
                    id={name}
                    maxLength = "100"
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                />
            )}

            {type === 'select' && (
                <select
                    id={name}
                    className="select"
                    value={value}
                    onChange={handleChange}>
                    {options.map(option => {
                        return (
                            <option key={option.id} value={option.value}>
                                {option.label}
                            </option>
                        );
                    })}
                </select>
            )}
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    options: PropTypes.array,
    handleChange: PropTypes.func.isRequired
};

export default FormField;
