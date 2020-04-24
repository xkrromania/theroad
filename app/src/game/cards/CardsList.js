import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import gameService from '../services/game';

const CardsList = ({ cards, removeHandle }) => {
    const maxPlayers = gameService.getMaxPlayers();
    const fillPlaceholderCards = () => {
        const placeholderNeeded = maxPlayers - cards.length;
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

        return placeholders;
    };

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
            <Card
                key={card.id}
                name={card.name}
                type={card.type}
                stats={card.stats}
                removeHandle={() => removeHandle(card.id)}></Card>
        ));

    return (
        <section className="card-list">
            {cardsList}
            {fillPlaceholderCards()}
        </section>
    );
};

CardsList.propTypes = {
    cards: PropTypes.array.isRequired,
    removeHandle: PropTypes.func
};

export default CardsList;
