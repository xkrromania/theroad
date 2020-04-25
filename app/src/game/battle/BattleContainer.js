import React from 'react';
import matchService from '../services/match';
import BattleCard from './BattleCard';
import BattleMenu from './BattleMenu';
import Notification from '../../components/Notification';
import TeamCardsContainer from './TeamCardsContainer';
import { GiSoccerBall } from 'react-icons/gi';

class BattleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...matchService.state, error: '', showOpponentBattleCard: true };

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
            },
            showOpponentBattleCard: false
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
                    showOpponentBattleCard: true,
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
            timeline,
            showOpponentBattleCard
        } = this.state;
        const { handles } = this.props;

        const timelineBar = (
            <div className="battleground__timeline with-scrollbar">
                {timeline.map(entry => {
                    return (
                        <span
                            key={entry.id}
                            className={`timeline-entry ${
                                entry.isUserAttacking ? 'timeline-entry--attacking' : ''
                            }`}>
                            <span className="minute">{entry.minute}'</span>
                            <span className="text">
                                <i className="goal-icon">{entry.isGoal && <GiSoccerBall />}</i>
                                {entry.text}
                            </span>
                        </span>
                    );
                })}
            </div>
        );

        const menuActions = {
            stop: () => handles.stop(),
            playTurn: () => this.playTurn()
        };

        const battleCard = {
            user: cards.user.find(card => card.isSelected),
            opponent: cards.opponent.find(card => card.isSelected)
        };

        return (
            <>
                {isMatchEnded && <Notification text="Game has ended" type="success" />}
                {error.length > 0 && <Notification text={error} type="error" />}
                <div className="match-board">
                    <TeamCardsContainer
                        team="user"
                        cards={cards.user}
                        handleSelect={this.selectCard}></TeamCardsContainer>
                    <BattleMenu
                        score={score}
                        minute={minute}
                        isMatchEnded={isMatchEnded}
                        isUserAttacking={isUserAttacking}
                        actions={menuActions}></BattleMenu>
                    <section className="battleground">
                        <div className="battleground__cards">
                            {battleCard.user && (
                                <BattleCard card={battleCard.user} isUserCard={true}></BattleCard>
                            )}
                            {!battleCard.user && (
                                <div className="battle-card battle-card--placeholder"></div>
                            )}
                            {showOpponentBattleCard && battleCard.opponent && (
                                <BattleCard
                                    card={battleCard.opponent}
                                    isUserCard={false}></BattleCard>
                            )}
                            {(!battleCard.opponent || !showOpponentBattleCard) && (
                                <div className="battle-card battle-card--placeholder"></div>
                            )}
                        </div>
                        {timeline.length > 0 && timelineBar}
                    </section>
                    <TeamCardsContainer
                        team="opponent"
                        cards={cards.opponent}></TeamCardsContainer>
                </div>
            </>
        );
    }
}

export default BattleContainer;
