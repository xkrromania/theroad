import React from 'react';
import PropTypes from 'prop-types';
import statsService from '../services/stats';
import typesService from '../services/types';

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
        <div className="card__class">
            <span>{selectedType.label}</span>
        </div>
    );
    const cardStats = statsOptions.map(option => (
        <div key={option.id} className="player-card__stat">
            <span className="stat-label">{option.label}</span>
            <span className={`stat-value stat-value--${option.property}`}>
                {!card.hasHiddenStats && card.stats[option.property]}
                {card.hasHiddenStats && '?'}
            </span>
        </div>
    ));

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
