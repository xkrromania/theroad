import React from 'react';
import Team from './Team';
import matchService from '../services/match';
import MatchMenu from './MatchMenu';
import { GiSoccerBall } from 'react-icons/gi';
import { FaShieldAlt } from 'react-icons/fa';

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...matchService.state, error: '' };

        this.selectCard = this.selectCard.bind(this);
        this.playTurn = this.playTurn.bind(this);
    }

    selectCard(team, cardId) {
        this.setState(prevState => ({
            ...prevState,
            error: '',
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

    playTurn() {
        matchService
            .playTurn()
            .then(response => {
                this.setState({
                    error: '',
                    cards: { ...this.state.cards, ...response.cards },
                    isMatchEnded: response.isMatchEnded,
                    isUserAttacking: response.isUserAttacking,
                    minute: response.minute,
                    score: response.score,
                    timeline: response.timeline
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
        const {
            cards,
            error,
            isMatchEnded,
            isUserAttacking,
            minute,
            score,
            timeline
        } = this.state;
        const { handles } = this.props;

        const timelineBar = (
            <div className="timeline">
                {timeline.map(entry => {
                    return (
                        <span
                            key={entry.id}
                            className={`timeline__entry ${
                                entry.isUserAttacking
                                    ? 'timeline__entry--attacking'
                                    : ''
                            }`}>
                            <span className="minute">{entry.minute}'</span>
                            <span className="text">
                                <i className="goal-icon">
                                    {entry.isGoal && <GiSoccerBall />}
                                </i>
                                {entry.text}
                            </span>
                        </span>
                    );
                })}
            </div>
        );

        const menuActions = {
            stop: () => handles.stop()
        };

        return (
            <div className="match-board">
                <MatchMenu
                    score={score}
                    minute={minute}
                    isMatchEnded={isMatchEnded}
                    isUserAttacking={isUserAttacking}
                    actions={menuActions}></MatchMenu>
                {error.length > 0 && (
                    <div className="alert alert--error">{error}</div>
                )}
                <Team
                    team="user"
                    cards={cards.user}
                    handleSelect={this.selectCard}></Team>

                {!isMatchEnded && (
                    <button
                        className={`btn ${
                            isUserAttacking ? 'success' : 'primary'
                        }`}
                        disabled={isMatchEnded}
                        onClick={() => this.playTurn()}>
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
                )}
                {isMatchEnded && (
                    <span className="alert alert--success">
                        The game has ended.
                    </span>
                )}

                {timelineBar}
                <Team team="opponent" cards={cards.opponent}></Team>
            </div>
        );
    }
}

export default Match;
