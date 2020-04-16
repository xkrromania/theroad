import { connect } from 'react-redux';
import CardsList from './CardsList';
import { removeCard } from './cardsSlice';

const mapStateToProps = (state) => {
    return {
        cards: state.cards
    };
};

const mapDispatchToProps = { removeCard };

const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsList);

export default Cards;
