import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0;

const cardsSlice = createSlice({
  name: 'cards',
  initialState: [],
  reducers: {
    addCard: {
      reducer(state, action) {
        const { id, name, description, type, stats } = action.payload;
        state.push({ id, name, description, type, stats });
      },
      prepare(name, description, type, stats) {
        return { payload: { name, description, type, stats, id: nextTodoId++ } };
      }
    },
    removeCard(state, action) {
      return state.filter((card) => card.id !== action.payload);
    }
  }
});

export const { addCard, removeCard } = cardsSlice.actions;

export default cardsSlice.reducer;
