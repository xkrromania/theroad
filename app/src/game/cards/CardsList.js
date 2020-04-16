import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

const CardsList = ({ cards, removeCard }) => {
  const cardsContainer = cards.length > 0 && (
    <section className="card-list">
      {cards.map(card => (
        <Card
          key={card.id}
          name={card.name}
          description={card.description}
          type={card.type}
          stats={card.stats}
          removeHandle={() => removeCard(card.id)}></Card>
      ))}
    </section>
  );

  return <> {cardsContainer} </>;
};

CardsList.propTypes = {
  cards: PropTypes.array.isRequired,
  removeCard: PropTypes.func.isRequired
};

export default CardsList;
