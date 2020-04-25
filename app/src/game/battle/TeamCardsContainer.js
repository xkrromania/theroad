import React from 'react';
import TeamCard from './TeamCard';

const TeamCardsContainer = ({ team, cards, handleSelect }) => {
    const sortByPosition = function(a, b) {
        let order = {
            def: 0,
            fwd: 1
        };

        return order[a.type] - order[b.type];
    };

    const cardsList = []
        .concat(cards)
        .sort((a, b) => sortByPosition(a, b))
        .map(card => <TeamCard key={card.id} card={card} team={team} handleSelect={handleSelect}></TeamCard>);

    return (
        <>
            <section className={`card-list card-list--${team}`}>{cardsList}</section>
        </>
    );
};

export default TeamCardsContainer;
