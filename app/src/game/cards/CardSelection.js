import { connect } from 'react-redux';
import { removeCard, setBasicTeam } from './cardsSlice';
import CardSelectionContainer from './CardSelectionContainer';

const mapStateToProps = state => {
    return {
        cards: state.cards
    };
};

const mapDispatchToProps = { removeCard, setBasicTeam };

const CardSelection = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardSelectionContainer);

export default CardSelection;
