import { createSlice } from '@reduxjs/toolkit';

const matchSlice = createSlice({
    name: 'match',
    initialState: {
        gameStep: 0,
        homeCards: [],
        awayCards: [],
        homeScore: 0,
        awayScore: 0,
        isMatchOn: false
    },
    reducers: {
        incrementGameStep(state) {
            state.gameStep++;
        },
        setTeam(state, action) {
            const {cards, team} = action.payload;
            const teamName = team + 'Cards';

            state[teamName].length = 0;
            cards.forEach(card => {
                state[teamName].push(card);
            });
        }
    }
});

export const { incrementGameStep, setTeam } = matchSlice.actions;

export default matchSlice.reducer;
