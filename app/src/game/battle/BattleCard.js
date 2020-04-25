import React from 'react';
import statsService from '../services/stats';
import typesService from '../services/types';
import { FaShieldAlt } from 'react-icons/fa';
import { GiCrackedShield, GiBrokenShield, GiSoccerBall } from 'react-icons/gi';

const statsOptions = statsService.get();
const typesOptions = typesService.get();
const BattleCard = ({ card, isUserCard }) => {
    const cardStyle = {
        type: `battle-card--${card.type}`
    };
    const className = `battle-card ${cardStyle.type}`;
    const selectedType = typesOptions.find(option => option.value === card.type);
    const cardClass = (
        <div className="battle-card__class">
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
        <div className="battle-card__stats">
            {statsOptions.map(option => (
                <div
                    key={option.id}
                    className={`battle-card__stat battle-card__stat--${option.property}`}>
                    <span className="stat-label">{option.property}</span>
                    <div className="stat-value">{getStatText(option.property)}</div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={className}>
            {isUserCard ? 'You' : 'Opponent'} selected...
            {cardClass}
            <div className="battle-card__name">{card.name}</div>
            {cardStats}
        </div>
    );
};

export default BattleCard;
