import React from 'react';
import Team from './Team';
import matchService from '../services/match';

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...matchService.state, error: '' };

        this.selectCard = this.selectCard.bind(this);
        this.incrementGameStep = this.incrementGameStep.bind(this);
    }

    selectCard(team, cardId) {
        this.setState(prevState => ({
            ...prevState,
            cards: {
                ...prevState.cards,
                [team]: prevState.cards[team].map(card => ({
                    ...card,
                    isSelected: card.id === cardId
                }))
            }
        }));

        return matchService.selectCardForTeam(team, cardId);
    }

    incrementGameStep() {
        matchService
            .incrementGameStep()
            .then(response => {
                this.setState({
                    error: '',
                    gameStep: this.state.gameStep + 1
                });
            })
            .catch(response =>
                this.setState({
                    error: response
                })
            );

        return;
    }

    render() {
        const { gameStep, score, cards, error } = this.state;
        const { handles } = this.props;
        const gameMenu = (
            <div className="game-menu">
                <button
                    className="btn success"
                    onClick={this.incrementGameStep}>
                    {gameStep} Next
                </button>
                <button className="btn primary" onClick={() => handles.stop()}>
                    End Game
                </button>
                <span className="scoreboard">
                    {score.home} - {score.away}
                </span>
            </div>
        );
        return (
            <>
                {error.length > 0 && (
                    <div className="alert alert--error">{error}</div>
                )}
                {gameMenu}
                <Team
                    team="home"
                    cards={cards.home}
                    handleSelect={this.selectCard}></Team>
                <h1> VS </h1>
                <Team team="away" cards={cards.away}></Team>
            </>
        );
    }
}

export default Match;
