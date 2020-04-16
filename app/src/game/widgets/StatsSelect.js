import React from 'react';
import statsService from '../services/stats';
import FormField from '../../components/FormField';
import PropTypes from 'prop-types';

const StatsSelect = ({ stats, handleChange }) => {
    const statsOptions = statsService.get();
    const overall = statsService.getOverall(stats);
    const maxOverall = statsService.getMaxOverall();

    return (
        <>
            <span className="points-remaining">
                Points remaining: {maxOverall - overall}/{maxOverall}
            </span>
            {statsOptions.map(stat => (
                <FormField
                    key={stat.id}
                    name={stat.property}
                    type="stat"
                    label={stat.label}
                    value={stats[stat.property]}
                    handleChange={handleChange}></FormField>
            ))}
        </>
    );
};

StatsSelect.propTypes = {
    stats: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default StatsSelect;
