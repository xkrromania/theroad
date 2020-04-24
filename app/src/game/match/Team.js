import React from 'react';
import PlayerCard from './PlayerCard';

const Team = ({ team, cards, handleSelect }) => {
    const sortByPosition = function(a, b) {
        let order = {
            gkr: 0,
            def: 1,
            fwd: 2
        };

        return order[a.type] - order[b.type];
    };

    const cardsList = []
        .concat(cards)
        .sort((a, b) => sortByPosition(a, b))
        .map(card => (
            <PlayerCard
                key={card.id}
                card={card}
                team={team}
                handleSelect={handleSelect}></PlayerCard>
        ));

    return (
        <section className={`card-list card-list--${team}`}>
            {cardsList}
        </section>
    );
};

export default Team;
