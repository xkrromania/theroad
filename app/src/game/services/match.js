let state = {
    gameStep: 0,
    homeCards: [],
    awayCards: [],
    homeScore: 0,
    awayScore: 0,
    isMatchOn: false
};

const matchService = {
    state: state,
    startGame: cards => {
        state.isMatchOn = true;
    },
    setCardsForTeam: (cards, team) => {
        const teamName = team + 'Cards';

        state[teamName].length = 0;
        cards.forEach(card => {
            const gameCard = { ...card, isNext: false };
            state[teamName].push(gameCard);
        });
    }
};

export default matchService;
