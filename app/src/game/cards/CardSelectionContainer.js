import React from 'react';

import AddCard from './AddCard';
import PropTypes from 'prop-types';

import gameService from '../services/game';
import CardsList from './CardsList';

const maxPlayers = gameService.getMaxPlayers();
const CardSelectionContainer = ({
    cards,
    removeCard,
    setBasicTeam,
    handles
}) => {
    const addCard = cards.length < maxPlayers && <AddCard />;
    const gameMenu = (
        <div className="game-menu">
            <button
                className="btn primary"
                onClick={() => setBasicTeam(gameService.getBasicTeam())}>
                Generate Team
            </button>
            {cards.length === maxPlayers && (
                <button
                    className="btn primary"
                    onClick={() => handles.start(cards)}>
                    Start Game
                </button>
            )}
        </div>
    );
    const cardsList = cards.length > 0 && (
        <CardsList cards={cards} removeHandle={removeCard}></CardsList>
    );

    return (
        <>
            {gameMenu}
            {addCard}
            {cardsList}
        </>
    );
};

CardSelectionContainer.propTypes = {
    cards: PropTypes.array.isRequired,
    removeCard: PropTypes.func.isRequired,
    setBasicTeam: PropTypes.func
};

export default CardSelectionContainer;
