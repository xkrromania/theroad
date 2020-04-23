import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardsList = ({ cards, removeHandle }) => {
    const fillPlaceholderCards = () => {
        const placeholderNeeded = 5 - cards.length;
        let placeholders = [];

        for (let i = 0; i < placeholderNeeded; i++) {
            placeholders.push(
                <article
                    key={`placeholder-${i}`}
                    className={`card card--placeholder`}></article>
            );
        }

        if (placeholders.length === 0) {
            return;
        }

        console.dir(placeholders);

        return placeholders;
    };

    return (
        <section className="card-list">
            {cards.map(card => (
                <Card
                    key={card.id}
                    name={card.name}
                    type={card.type}
                    stats={card.stats}
                    removeHandle={() => removeHandle(card.id)}></Card>
            ))}
            {fillPlaceholderCards()}
        </section>
    );
};

CardsList.propTypes = {
    cards: PropTypes.array.isRequired,
    removeHandle: PropTypes.func
};

export default CardsList;
