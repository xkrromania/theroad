import React from 'react';
import FormField from '../../components/FormField';
import statsService from '../services/stats';
import TypeSelect from '../widgets/TypeSelect';

const statsOptions = statsService.get();
const AddCardForm = ({ name, description, type, stats, handles }) => {
    const isDisabled =
        name.length === 0 || description.length === 0 || type.length === 0;

    return (
        <form className="add-card-form" onSubmit={handles.submit}>
            <FormField
                name="name"
                type="text"
                label="Name"
                value={name}
                handleChange={handles.name}></FormField>
            <TypeSelect value={type} handleChange={handles.type}></TypeSelect>
            <FormField
                name="description"
                type="textarea"
                label="Description"
                value={description}
                handleChange={handles.description}></FormField>
            <>
                {statsOptions.map(stat => (
                    <FormField
                        key={stat.id}
                        name={stat.property}
                        type="number"
                        label={stat.label}
                        value={stats[stat.property]}
                        handleChange={handles.stats}></FormField>
                ))}
            </>
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
