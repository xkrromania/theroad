import React from 'react';
import typesService from '../services/types';
import FormField from '../../components/FormField';
import PropTypes from 'prop-types';

const TypeSelect = ({ value, handleChange }) => {
    const types = typesService.get();

    return (
        <FormField
            label="Player Role"
            type="select"
            name="type"
            value={value}
            options={types}
            handleChange={handleChange}></FormField>
    );
};

TypeSelect.propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func
};

export default TypeSelect;
