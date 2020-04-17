import React from 'react';

const Team = ({ cards }) => {
    return (
        <section className="card-list">
            {cards.map(card => (
                JSON.stringify(card)
            ))}
        </section>
    );
};

export default Team;
