import React from 'react';
import PlayerCard from './PlayerCard';

const Team = ({ team, cards, handleSelect }) => {
    return (
        <section className="card-list">
            {cards.map(card => (
                <PlayerCard
                    key={card.id}
                    card={card}
                    team={team}
                    handleSelect={handleSelect}></PlayerCard>
            ))}
        </section>
    );
};

export default Team;
