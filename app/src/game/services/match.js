/**
 * How we are going to play:
 *
 * For each turn select a card. Depending on what opponent select:
 *
 * YOU | OPPONENT | OUTCOME
 * gk       gk      the weaker card get destroyed
 * gk       def     scenarios.
 * gk       mid     scenarios.
 * gk       atk     scenarios.
 */
let state = {
    gameStep: 0,
    cards: {
        home: [],
        away: []
    },
    score: {
        home: 0,
        away: 0
    }
};

const matchService = {
    state: state,
    resetState: () => {
        state.gameStep = 0;
        state.score.home = 0;
        state.score.away = 0;
        state.cards.home.length = 0;
        state.cards.away.length = 0;
    },
    getCardsForTeam: team => {
        return state.cards[team];
    },
    /**
     * Set cards for a team
     *
     * @param {array} cards
     * @param {string} team home/away
     */
    setCardsForTeam: (cards, team) => {
        const hasHiddenStats = team === 'away';

        cards.forEach(card => {
            let gameCard = {
                ...card,
                hasHiddenStats: hasHiddenStats,
                isSelected: false
            };

            state.cards[team].push(gameCard);
        });
    },
    /**
     * Clear all cards
     *
     * @param {array} cards
     * @param {string} team home/away
     */
    clearCardsForTeam: team => {
        state.cards[team].length = 0;
    },
    /**
     * Set a card to selected
     *
     * @param {number} cardId
     * @param {string} team
     */
    selectCardForTeam: (team, cardId) => {
        state.cards[team].forEach(card => {
            card.isSelected = card.id === cardId;
        });

        console.log(state.cards.home.map(card => card.isSelected));
    },
    /**
     * Increment game step
     */
    incrementGameStep: async () => {
        let promise = new Promise((resolve, reject) => {
            console.log(state.cards.home.map(card => card.isSelected));
            if (state.cards['home'].find(card => card.isSelected)) {
                return resolve(state.gameStep++);
            }
            return reject('Select a card first.');
        });

        return promise;
    }
};

export default matchService;
