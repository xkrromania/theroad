import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from '../game/cards/cardsSlice';
import matchSlice from '../game/match/matchSlice';

export default configureStore({
  reducer: {
    cards: cardsSlice,
    match: matchSlice
  },
  devTools: process.env.NODE_ENV !== 'production'
});
