import React from 'react';
import FormField from '../../components/FormField';
import TypeSelect from '../widgets/TypeSelect';
import StatsSelect from '../widgets/StatsSelect';

const AddCardForm = ({ name, description, type, stats, handles }) => {
    const isDisabled =
        name.length === 0 || type.length === 0;

    return (
        <form className="add-card-form" onSubmit={handles.submit}>
            <TypeSelect value={type} handleChange={handles.type}></TypeSelect>
            <FormField
                name="name"
                type="text"
                label="Name"
                value={name}
                handleChange={handles.name}></FormField>
            <StatsSelect stats={stats} handleChange={handles.stats}></StatsSelect>
            <FormField
                name="description"
                type="textarea"
                label="Description"
                value={description}
                handleChange={handles.description}></FormField>
            <button
                className="btn success add-btn"
                type="submit"
                disabled={isDisabled}>
                Add Card
            </button>
        </form>
    );
};

export default AddCardForm;
