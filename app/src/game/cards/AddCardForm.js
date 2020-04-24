import React from 'react';
import PropTypes from 'prop-types';
import FormField from '../../components/FormField';
import TypeSelect from '../widgets/TypeSelect';
import StatsSelect from '../widgets/StatsSelect';
import Notification from '../../components/Notification';

const AddCardForm = ({ name, type, stats, error, handles }) => {
    const isDisabled = name.length === 0 || type.length === 0;

    return (
        <>
            <form className="add-card-form" onSubmit={handles.submit}>
                <TypeSelect value={type} handleChange={handles.type}></TypeSelect>
                <FormField name="name" type="text" label="Name" value={name} handleChange={handles.name}></FormField>
                <StatsSelect stats={stats} handleChange={handles.stats}></StatsSelect>
                <button className="btn success add-btn" type="submit" disabled={isDisabled}>
                    Add Card
                </button>
            </form>
            {error.length > 0 && <Notification text={error} type="error" />}
        </>
    );
};

AddCardForm.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    stats: PropTypes.object,
    error: PropTypes.string,
    handles: PropTypes.object
};

export default AddCardForm;
