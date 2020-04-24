import React from 'react';
import PropTypes from 'prop-types';
import statsService from '../services/stats';
import typesService from '../services/types';
import { FaShieldAlt, FaHandPaper } from 'react-icons/fa';
import { GiSoccerBall } from 'react-icons/gi';

const statsOptions = statsService.get();
const typesOptions = typesService.get();
const Card = ({ name, type, stats, removeHandle }) => {
    const selectedType = typesOptions.find(option => option.value === type);
    const cardClass = (
        <div className="card__class">
            <span>
                {selectedType.value === 'gkr' && <FaHandPaper />}
                {selectedType.value === 'def' && <FaShieldAlt />}
                {selectedType.value === 'fwd' && <GiSoccerBall />}
                {selectedType.label}
            </span>
        </div>
    );

    const maxOverall = statsService.getMaxOverall();
    const getStatWidth = statValue => {
        return `${(100 * statValue) / maxOverall}%`;
    };

    const cardStats = (
        <div className="card__stats">
            {statsOptions.map(option => (
                <div
                    key={option.id}
                    className={`card__stat card__stat--${option.property}`}>
                    <span className="stat-value">{stats[option.property]}</span>
                    <span
                        className="stat-bar"
                        style={{
                            width: getStatWidth(stats[option.property])
                        }}></span>
                    <span className="stat-label">{option.label}</span>
                </div>
            ))}
        </div>
    );

    const removeIcon = removeHandle && (
        <button className="btn remove-btn" onClick={removeHandle}>
            x
        </button>
    );

    return (
        <article className={`card card--${type}`}>
            {removeIcon}
            {cardClass}
            <div className="card__name">{name}</div>
            {cardStats}
        </article>
    );
};

Card.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    stats: PropTypes.object.isRequired,
    removeHandle: PropTypes.func
};

export default Card;
