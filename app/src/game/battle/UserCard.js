import React from 'react';
import PropTypes from 'prop-types';
import statsService from '../services/stats';
import typesService from '../services/types';
import { FaHandPaper, FaShieldAlt } from 'react-icons/fa';
import { GiCrackedShield, GiBrokenShield, GiSoccerBall } from 'react-icons/gi';

const statsOptions = statsService.get();
const typesOptions = typesService.get();
const UserCard = ({ card, team, handleSelect }) => {
    const cardStyle = {
        user: !card.hasHiddenStats ? 'user-card--selectable' : '',
        selected: card.isSelected ? 'user-card--selected' : '',
        type: `user-card--${card.type}`
    };
    const className = `user-card ${cardStyle.type} ${cardStyle.user} ${cardStyle.selected}`;
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
        <div className="user-card__class">
            <span>
                {selectedType.value === 'gkr' && <FaHandPaper />}
                {selectedType.value === 'def' && <FaShieldAlt />}
                {selectedType.value === 'fwd' && <GiSoccerBall />}
                {selectedType.label}
            </span>
        </div>
    );
    const isStatChanged = stat => {
        return card.changedStats.indexOf(stat) > -1;
    };
    const getStatText = stat => {
        let statValue = card.stats[stat];

        if (card.hasHiddenStats) {
            return '?';
        }

        if (statValue === 0) {
            return (
                <>
                    <GiBrokenShield />
                    {statValue}
                </>
            );
        }

        if (isStatChanged(stat)) {
            return (
                <>
                    <GiCrackedShield /> {statValue}
                </>
            );
        }

        return <> {statValue} </>;
    };
    const cardStats = (
        <div className="user-card__stats">
            {statsOptions.map(option => (
                <div
                    key={option.id}
                    className={`user-card__stat user-card__stat--${option.property}`}>
                    <span className="stat-label">{option.property}</span>
                    <div className="stat-value">
                        {getStatText(option.property)}
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

UserCard.propTypes = {
    card: PropTypes.object.isRequired,
    handleSelect: PropTypes.func
};

export default UserCard;
