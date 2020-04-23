import { connect } from 'react-redux';
import { removeCard, setTeam } from './cardsSlice';
import CardSelectionContainer from './CardSelectionContainer';

const mapStateToProps = state => {
    return {
        cards: state.cards
    };
};

const mapDispatchToProps = { removeCard, setTeam };

const CardSelection = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardSelectionContainer);

export default CardSelection;
