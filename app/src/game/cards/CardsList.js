import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardsList = ({ cards, removeHandle }) => {
    return (
        <section className="card-list">
            {cards.map(card => (
                <Card
                    key={card.id}
                    name={card.name}
                    description={card.description}
                    type={card.type}
                    stats={card.stats}
                    removeHandle={() => removeHandle(card.id)}></Card>
            ))}
        </section>
    );
};

CardsList.propTypes = {
    cards: PropTypes.array.isRequired,
    removeHandle: PropTypes.func
};

export default CardsList;
