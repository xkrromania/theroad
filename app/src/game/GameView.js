import React from 'react';
import CardSelection from './cards/CardSelection';
import Match from './match/Match';
import matchService from './services/match';
import gameService from './services/game';

class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMatchOn: false
        };
    }

    startMatch(cards) {
        matchService.setCardsForTeam(cards, 'home');
        matchService.setCardsForTeam(gameService.getBasicTeam(), 'away');
        this.setState({
            isMatchOn: true
        });
    }

    stopMatch() {
        matchService.setCardsForTeam([], 'home');
        matchService.setCardsForTeam([], 'away');
        this.setState({
            isMatchOn: false
        });
    }

    render() {
        const isMatchOn = this.state.isMatchOn;
        const handles = {
            start: (cards) => this.startMatch(cards),
            stop: () => this.stopMatch()
        };

        return (
            <section className="game-view">
                {isMatchOn ? 'isOn' : 'isOff'}
                {!isMatchOn && <CardSelection handles={handles} />}
                {isMatchOn && <Match handles={handles} />}
            </section>
        );
    }
}

export default GameView;
