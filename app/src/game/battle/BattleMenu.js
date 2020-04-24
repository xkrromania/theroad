import React from 'react';
import PropTypes from 'prop-types';
import { GiSoccerBall } from 'react-icons/gi';
import { FaShieldAlt } from 'react-icons/fa';

const BattleMenu = ({ actions, minute, score, isUserAttacking, isMatchEnded }) => (
    <div className="battle-menu">
        <button
            className={`btn ${isUserAttacking ? 'success' : 'primary'}`}
            disabled={isMatchEnded}
            onClick={actions.playTurn}>
            {isUserAttacking ? (
                <>
                    <GiSoccerBall /> Attack
                </>
            ) : (
                <>
                    <FaShieldAlt /> Defend
                </>
            )}
        </button>
        <span className="scoreboard">
            <span className="scoreboard__minute">{`min. ${minute}' `}</span>
            <span className="scoreboard__score">
                {score.user} - {score.opponent}
            </span>
        </span>
        <button className="btn primary quit-game" onClick={actions.stop}>
            Quit Game
        </button>
    </div>
);

BattleMenu.propTypes = {
    actions: PropTypes.object,
    isMatchEnded: PropTypes.bool,
    isUserAttacking: PropTypes.bool,
    minute: PropTypes.number,
    score: PropTypes.object
};

export default BattleMenu;
