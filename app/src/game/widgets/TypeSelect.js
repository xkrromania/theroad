import React from 'react';
import typesService from '../services/types';
import PropTypes from 'prop-types';

const TypeSelect = ({ value, handleChange }) => {
    const types = typesService.get();

    return (
        <>
            <div className="form-field">
                <label className="label" htmlFor="type">
                    Player Role
                </label>
                <div className="form-field__radio-group">
                    {types.map(type => (
                        <div key={type.id} className="form-field__radio-entry">
                            <input
                                className="radio"
                                id={type.value}
                                type="radio"
                                name="type"
                                value={type.value}
                                checked={value === type.value}
                                onChange={handleChange}
                            />
                            <label htmlFor={type.value}>{type.label}</label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

TypeSelect.propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func
};

export default TypeSelect;
