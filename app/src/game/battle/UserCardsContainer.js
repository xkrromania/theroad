import React from 'react';
import UserCard from './UserCard';

const UserCardsContainer = ({ team, cards, handleSelect }) => {
    const sortByPosition = function(a, b) {
        let order = {
            gkr: 0,
            def: 1,
            fwd: 2
        };

        return order[a.type] - order[b.type];
    };

    const getCount = function(cards, position) {
        return cards.filter(card => card.type === position).length;
    };

    const teamComposition = {
        gkr: getCount(cards, 'gkr'),
        def: getCount(cards, 'def'),
        fwd: getCount(cards, 'fwd')
    };

    const cardsList = []
        .concat(cards)
        .sort((a, b) => sortByPosition(a, b))
        .map(card => <UserCard key={card.id} card={card} team={team} handleSelect={handleSelect}></UserCard>);

    return (
        <>
            <span className="team-composition">
                {cards.length} players: {teamComposition.gkr} GK | {teamComposition.def} DEF | {teamComposition.fwd} FWD
            </span>
            <section className={`card-list card-list--${team}`}>{cardsList}</section>
        </>
    );
};

export default UserCardsContainer;
