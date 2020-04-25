import React from 'react';
import PropTypes from 'prop-types';
import statsService from '../services/stats';
import typesService from '../services/types';
import { FaShieldAlt } from 'react-icons/fa';
import { GiCrackedShield, GiBrokenShield, GiSoccerBall } from 'react-icons/gi';

const statsOptions = statsService.get();
const typesOptions = typesService.get();
const TeamCard = ({ card, team, handleSelect }) => {
    const cardStyle = {
        user: !card.hasHiddenStats ? 'team-card--selectable' : '',
        selected: card.isSelected ? 'team-card--selected' : '',
        type: `team-card--${card.type}`
    };
    const className = `team-card ${cardStyle.type} ${cardStyle.user} ${cardStyle.selected}`;
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
        <div className="team-card__class">
            <span>
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
        <div className="team-card__stats">
            {statsOptions.map(option => (
                <div
                    key={option.id}
                    className={`team-card__stat team-card__stat--${option.property}`}>
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

TeamCard.propTypes = {
    card: PropTypes.object.isRequired,
    handleSelect: PropTypes.func
};

export default TeamCard;
