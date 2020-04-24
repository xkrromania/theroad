import React, { useState } from 'react';

import AddCard from './AddCard';
import CardsList from './CardsList';
import PropTypes from 'prop-types';
import { FaDownload, FaRandom, FaUpload } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { GiSoccerBall } from 'react-icons/gi';

import gameService from '../services/game';
import dbService from '../../app/database';

const maxPlayers = gameService.getMaxPlayers();

const CardSelectionContainer = ({ cards, removeCard, setTeam, handles }) => {
    const [notification, setNotification] = useState({
        type: '',
        text: ''
    });

    /**
     * Show a notification
     *
     * @param {string} text
     * @param {string} type
     */
    const showNotification = (text, type) => {
        type = type || 'error';
        setNotification({
            type: type,
            text: text
        });

        setTimeout(function() {
            setNotification({
                type: '',
                text: ''
            });
        }, 3000);
    };

    /**
     * Load the team
     */
    async function loadTeam() {
        try {
            let team = await dbService.getTeam();

            if (team == null) {
                showNotification('You have no saved team..', 'error');
            }

            return setTeam(team);
        } catch (err) {
            showNotification('The team could not be loaded..', 'error');
        }
    }

    /**
     * Save team in the db
     *
     * @param {array} cards
     */
    async function saveTeam(cards) {
        try {
            await dbService.setTeam(cards);
            showNotification('Your team has been saved.', 'success');
        } catch (err) {
            console.dir(err);
            showNotification('The team could not be saved..', 'error');
        }
    }

    const addCard = cards.length < maxPlayers && <AddCard />;
    const gameMenu = (
        <div className="game-menu">
            {cards.length > 0 && (
                <button className="btn primary" onClick={() => setTeam([])}>
                    <MdDeleteForever /> Clear Team
                </button>
            )}
            <button
                className="btn primary"
                onClick={() => setTeam(gameService.generateTeam())}>
                <FaRandom /> Random Team
            </button>
            <button className="btn primary" onClick={() => loadTeam()}>
                <FaDownload /> Load Team
            </button>
            {cards.length === maxPlayers && (
                <button className="btn primary" onClick={() => saveTeam(cards)}>
                    <FaUpload /> Save team
                </button>
            )}
            {cards.length === maxPlayers && (
                <button
                    className="btn success"
                    onClick={() => handles.start(cards)}>
                    <GiSoccerBall /> Start Game
                </button>
            )}
        </div>
    );
    const cardsList = (
        <CardsList cards={cards} removeHandle={removeCard}></CardsList>
    );

    return (
        <>
            {notification.text.length > 0 && (
                <div className={`alert alert--${notification.type}`}>
                    {notification.text}
                </div>
            )}
            {gameMenu}
            {cardsList}
            {addCard}
        </>
    );
};

CardSelectionContainer.propTypes = {
    cards: PropTypes.array.isRequired,
    removeCard: PropTypes.func.isRequired,
    setTeam: PropTypes.func
};

export default CardSelectionContainer;
