import React, { useState } from 'react';
import typesService from '../services/types';
import statsService from '../services/stats';

import { connect } from 'react-redux';
import { addCard } from './cardsSlice';
import AddCardForm from './AddCardForm';

const mapDispatch = { addCard };

const AddCard = ({ addCard }) => {
    const initialType = typesService.getInitialState();
    const initialStats = statsService.getInitialState();
    const maxOverall = statsService.getMaxOverall();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(initialType);
    const [stats, setStats] = useState(initialStats);
    const [error, setError] = useState('');

    const resetError = () => {
        setError('');
    };

    const isStatsSelectionValid = (stat, value) => {
        const updatedStats = { ...stats, [stat]: value };
        let overall = statsService.getOverall(updatedStats);

        return maxOverall >= overall;
    };

    const onNameChange = e => setName(e.target.value);
    const onDescriptionChange = e => setDescription(e.target.value);
    const onStatsChange = e => {
        const stat = e.target.name;
        const value = e.target.value;

        resetError();
        if (!isStatsSelectionValid(stat, value)) {
            return setError('The points are limited to 25. Spend them wisely.');
        }

        return setStats(prevState => {
            return { ...prevState, [stat]: value };
        });
    };
    const onTypeChange = e => setType(e.target.value);

    const onSubmit = e => {
        e.preventDefault();
        addCard(name, description, type, stats);
        setName('');
        setDescription('');
        setType(initialType);
        setStats(initialStats);
    };

    const handles = {
        name: onNameChange,
        description: onDescriptionChange,
        type: onTypeChange,
        submit: onSubmit,
        stats: onStatsChange
    };

    return (
        <AddCardForm
            name={name}
            description={description}
            type={type}
            stats={stats}
            error={error}
            handles={handles}></AddCardForm>
    );
};

export default connect(
    null,
    mapDispatch
)(AddCard);
