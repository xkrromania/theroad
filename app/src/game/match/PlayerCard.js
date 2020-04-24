import React from 'react';
import PropTypes from 'prop-types';
import statsService from '../services/stats';
import typesService from '../services/types';
import { GiCrackedShield } from 'react-icons/gi';

const statsOptions = statsService.get();
const typesOptions = typesService.get();
const PlayerCard = ({ card, team, handleSelect }) => {
    const cardStyle = {
        user: !card.hasHiddenStats ? 'player-card--selectable' : '',
        selected: card.isSelected ? 'player-card--selected' : '',
        type: `player-card--${card.type}`
    };
    const className = `player-card ${cardStyle.type} ${cardStyle.user} ${cardStyle.selected}`;
    const selectedType = typesOptions.find(
        option => option.value === card.type
    );
    const selectCard = () => {
        if (!handleSelect) {
            return;
        }

        return handleSelect(team, card.id);
    };
    const cardClass = (
        <div className="player-card__class">
            <span>{selectedType.label}</span>
        </div>
    );
    const isStatChanged = stat => {
        return card.changedStats.indexOf(stat) > -1;
    };
    const cardStats = (
        <div className="player-card__stats">
            {statsOptions.map(option => (
                <div
                    key={option.id}
                    className={`player-card__stat player-card__stat--${option.property}`}>
                    <span className="stat-label">{option.property}</span>
                    <div className="stat-value">
                        {isStatChanged(option.property) && <GiCrackedShield />}
                        {!card.hasHiddenStats && card.stats[option.property]}
                        {card.hasHiddenStats && '?'}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={className} onClick={selectCard}>
            {cardClass}
            <div className="card__name">{card.name}</div>
            {cardStats}
        </div>
    );
};

PlayerCard.propTypes = {
    card: PropTypes.object.isRequired,
    handleSelect: PropTypes.func
};

export default PlayerCard;
