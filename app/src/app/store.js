import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from '../game/cards/cardsSlice';

export default configureStore({
  reducer: {
    cards: cardsSlice
  }
});
