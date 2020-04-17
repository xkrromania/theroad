import { connect } from 'react-redux';
import { incrementGameStep, setTeam } from './matchSlice';
import MatchContainer from './MatchContainer';
import matchService from '../services/match';

const mapStateToProps = state => {
    const match = state.match;

    return {
        gameStep: match.gameStep,
        homeCards: matchService.state.homeCards,
        awayCards: matchService.state.awayCards,
        homeScore: state.homeScore,
        awayScore: state.awayScore
    };
};

const mapDispatchToProps = { incrementGameStep, setTeam };

const Match = connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchContainer);

export default Match;
