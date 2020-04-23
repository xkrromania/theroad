import React from 'react';
import PropTypes from 'prop-types';

const MatchMenu = ({
    actions,
    minute,
    score
}) => (
    <div className="match-menu"> <button className="btn primary" onClick={actions.stop}>
            Quit Game
        </button>

        <span className="scoreboard">
            <span className="scoreboard__minute">
                {`min. ${minute}' `}
            </span>
            <span className="scoreboard__score">
                {score.user} - {score.opponent}
            </span>
        </span>
    </div>
);

MatchMenu.propTypes = {
    actions: PropTypes.object,
    isMatchEnded: PropTypes.bool,
    isUserAttacking: PropTypes.bool,
    minute: PropTypes.number,
    score: PropTypes.object
};

export default MatchMenu;
