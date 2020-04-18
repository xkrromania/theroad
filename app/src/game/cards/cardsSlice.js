import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0;

const cardsSlice = createSlice({
    name: 'cards',
    initialState: [],
    reducers: {
        addCard: {
            reducer(state, action) {
                const { id, name, type, stats } = action.payload;
                state.push({ id, name, type, stats });
            },
            prepare(name, type, stats) {
                return {
                    payload: {
                        name,
                        type,
                        stats,
                        id: nextTodoId++
                    }
                };
            }
        },
        removeCard(state, action) {
            return state.filter(card => card.id !== action.payload);
        },
        // TESTING ONLY
        setBasicTeam(state, action) {
            state.length = 0;
            action.payload.forEach(card => {
                state.push(card);
            });
        }
    }
});

export const { addCard, removeCard, setBasicTeam } = cardsSlice.actions;

export default cardsSlice.reducer;
