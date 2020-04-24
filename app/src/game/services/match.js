import utilsService from './utils';
import scenariosService from './scenarios';

const TIMELINE_MIN = 5;
const TIMELINE_MAX = 10;
const MAX_LOST_STAT = 6;
const MIN_LOST_STAT = 1;
const DEFAULT_DEFICIT = 0.5;

let timelineEntryId = 0;
let state = {
    cards: {
        user: [],
        opponent: []
    },
    score: {
        user: 0,
        opponent: 0
    },
    minute: 0,
    timeline: [],
    isUserAttacking: true,
    isMatchEnded: false
};

/**
 *
 * @param {string} team
 *
 * @returns {object | undefined}
 */
const getSelectedCard = team => {
    return state.cards[team].find(card => card.isSelected);
};

/**
 * Select a card for a team
 *
 * @param {string} team
 * @param {number} cardId
 */
const selectCardForTeam = (team, cardId) => {
    state.cards[team].forEach(card => {
        card.isSelected = card.id === cardId;
    });
};

/**
 * Add a generic text event
 *
 * @param {string} text
 */
const addGenericEvent = text => {
    state.timeline.unshift({
        id: timelineEntryId,
        minute: state.minute,
        text: text,
        isUserAttacking: true
    });
};

const addTurnEvent = text => {
    const endMinute = utilsService.getRandom(91, 96);
    const computedMinute = utilsService.getRandom(TIMELINE_MIN, TIMELINE_MAX);
    state.minute += computedMinute;

    if (state.minute >= endMinute) {
        state.minute = endMinute;
        state.isMatchEnded = true;
    }
    timelineEntryId++;
    state.timeline.unshift({
        id: timelineEntryId,
        minute: state.minute,
        text: text,
        isUserAttacking: state.isUserAttacking
    });
};

/**
 * Get deficit if the wrong type is selected (e.g. offensive player for defending)
 *
 * @param {string} type
 * @param {*} isAttacking
 *
 * @returns {number}
 */
const getTypeDeficit = (type, isAttacking) => {
    const percentages = {
        attacking: {
            gkr: 0.1,
            def: 0.5,
            fwd: 1
        },
        defending: {
            gkr: 0.8,
            def: 1,
            fwd: 0.1
        }
    };
    const percentageGroup = isAttacking ? 'attacking' : 'defending';

    return percentages[percentageGroup][type] || DEFAULT_DEFICIT;
};

/**
 * Get the card compare value that will be used for this turn
 *
 * @param {object} stats
 * @param {string} type
 * @param {boolean} isAttacking
 * @param {string} scenario
 *
 * @returns {object}
 */
const getCardValueForTurn = (stats, type, scenario, isAttacking) => {
    const typeDeficit = getTypeDeficit(type, isAttacking);
    const statAffectedMap = {
        set_piece: 'int',
        cross: 'phy',
        open_play: 'abi'
    };
    let statAffected = statAffectedMap[scenario] || 'abi';

    return {
        name: statAffected,
        value: parseInt(stats[statAffected] * typeDeficit)
    };
};

/**
 * Update card stats
 *
 * @param {string} team
 * @param {number} cardId
 * @param {string} stat
 * @param {number} lostPoints
 */
const updateCardStat = (team, cardId, stat, lostPoints) => {
    let value;

    state.cards[team].forEach(card => {
        if (card.id === cardId) {
            value = card.stats[stat] - lostPoints;
            value = value < 0 ? 0 : value;
            card.stats = { ...card.stats, [stat]: value };
            card.changedStats.push(stat);

            return;
        }
    });
};

/**
 * Get the side that won the turn
 *
 * @param {string} offTeam
 * @param {object} offCard
 * @param {object} defCard
 * @param {number} lostStatPoints
 * @param {string} scenario
 *
 * @returns {string} offense/defense
 */
const getTurnWinner = function(offTeam, offCard, defCard, lostStatPoints, scenario) {
    const offStat = getCardValueForTurn(offCard.stats, offCard.type, scenario, true);
    const defStat = getCardValueForTurn(defCard.stats, defCard.type, scenario, false);
    const difference = offStat.value - defStat.value;
    const winner = difference > 0 ? 'offense' : 'defense';

    if (winner === 'offense') {
        updateCardStat(offTeam === 'user' ? 'opponent' : 'user', defCard.id, defStat.name, lostStatPoints);
    } else {
        updateCardStat(offTeam, offCard.id, offStat.name, lostStatPoints);
    }

    return winner;
};

/**
 * Simulate the event that involves the two cards
 */
const simulateEvent = () => {
    const selected = {
        user: getSelectedCard('user'),
        opponent: getSelectedCard('opponent')
    };
    const offCard = state.isUserAttacking ? selected.user : selected.opponent;
    const defCard = state.isUserAttacking ? selected.opponent : selected.user;
    const offTeam = state.isUserAttacking ? 'user' : 'opponent';
    const scenario = scenariosService.getScenarioName(offCard, defCard);

    let timelineText = '';
    let isGoal = false;

    const lostStatPoints = utilsService.getRandom(MIN_LOST_STAT, MAX_LOST_STAT);
    const winner = getTurnWinner(offTeam, offCard, defCard, lostStatPoints, scenario);

    if (winner === 'offense') {
        isGoal = true;
        state.score[offTeam]++;
    }

    timelineText = scenariosService.getTextByScenario(scenario, offCard, defCard, isGoal, lostStatPoints);

    addTurnEvent(timelineText);
};

/**
 * Auto select an opponent card for the turn
 */
const autoSelectOpponentCard = () => {
    let opponentCardId = state.isUserAttacking ? utilsService.getRandom(0, 2) : utilsService.getRandom(3, 4);

    selectCardForTeam('opponent', opponentCardId);
    state.cards.opponent[opponentCardId].hasHiddenStats = false;
};

/**
 * Play the turn
 */
const simulateTurn = () => {
    if (state.isMatchEnded) {
        return;
    }

    if (state.timeline.length === 0) {
        addGenericEvent('Game started.');
    }

    try {
        autoSelectOpponentCard();
        simulateEvent();
    } catch (error) {
        console.error(error);
    }
};

const matchService = {
    state: state,
    resetState: () => {
        state.score.user = 0;
        state.score.opponent = 0;
        state.cards.user.length = 0;
        state.cards.opponent.length = 0;
        state.isMatchEnded = false;
        state.timeline.length = 0;
        state.isUserAttacking = true;
        state.minute = 0;
    },
    getCardsForTeam: team => {
        return state.cards[team];
    },
    /**
     * Set cards for a team
     *
     * @param {array} cards
     * @param {string} team user/opponent
     */
    setCardsForTeam: (cards, team) => {
        const hasHiddenStats = team === 'opponent';

        cards.forEach(card => {
            let gameCard = {
                ...card,
                hasHiddenStats: hasHiddenStats,
                changedStats: [],
                isSelected: false
            };

            state.cards[team].push(gameCard);
        });
    },
    /**
     * Clear all cards
     *
     * @param {array} cards
     * @param {string} team user/opponent
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
    selectCardForTeam: selectCardForTeam,
    /**
     * Play game turn
     */
    playTurn: async () => {
        let promise = new Promise((resolve, reject) => {
            if (getSelectedCard('user')) {
                simulateTurn();
                state.isUserAttacking = !state.isUserAttacking;
                if (state.isMatchEnded) {
                    timelineEntryId++;
                    addGenericEvent('Game has ended.');
                    timelineEntryId = 0;
                }
                return resolve({
                    cards: state.cards,
                    score: state.score,
                    minute: state.minute,
                    timeline: state.timeline,
                    isMatchEnded: state.isMatchEnded,
                    isUserAttacking: state.isUserAttacking
                });
            }
            return reject('Select a card first.');
        });

        return promise;
    }
};

export default matchService;
