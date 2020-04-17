import React from 'react';
import Team from './Team';

const MatchContainer = (props) => {
    console.dir(props);
    const { gameStep, homeCards, awayCards, homeScore, awayScore, incrementGameStep, handles } = props;

    return (
        <>
            <button className="btn success" onClick={() => incrementGameStep()}>
                {gameStep} Next
            </button>
            {homeScore} - {awayScore}
            <Team cards={homeCards}></Team>
                <h1> VS </h1>
            <Team cards={awayCards}></Team>
            <button
                className="btn primary"
                onClick={() => handles.stop()}>
                End Game
            </button>
        </>
    );
};

export default MatchContainer;
