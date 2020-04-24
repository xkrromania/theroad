import utilsService from './utils';
import scenariosService from './scenarios';
import MAX_PLAYERS from './constants/max_players';

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
    minute: 0,
    isMatchEnded: false,
    isUserAttacking: true,
    score: {
        user: 0,
        opponent: 0
    },
    timeline: []
};

/**
 * Reset match to its initial state
 */
const resetState = () => {
    state.cards.user.length = 0;
    state.cards.opponent.length = 0;
    state.minute = 0;
    state.isMatchEnded = false;
    state.isUserAttacking = true;
    state.score.user = 0;
    state.score.opponent = 0;
    state.timeline.length = 0;
};

/**
 * Returns card for the given team
 *
 * @param {string} team
 *
 * @returns {array}
 */
const getCardsForTeam = team => {
    return state.cards[team];
};

/**
 * Set cards for the given team
 *
 * @param {array} cards
 * @param {string} team
 */
const setCardsForTeam = (cards, team) => {
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
};

/**
 * Clear all cards for the given team
 *
 * @param {string} team
 */
const clearCardsForTeam = team => {
    state.cards[team].length = 0;
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
 * Auto select an opponent card for the turn
 */
const autoSelectOpponentCard = () => {
    let opponentCardId = state.isUserAttacking
        ? utilsService.getRandom(0, MAX_PLAYERS / 2)
        : utilsService.getRandom((MAX_PLAYERS - 1) / 2, MAX_PLAYERS);

    console.log(opponentCardId);
    selectCardForTeam('opponent', opponentCardId);
    state.cards.opponent[opponentCardId].hasHiddenStats = false;
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
 * Update Match Minute
 */
const updateMinute = () => {
    const endMinute = utilsService.getRandom(91, 96);
    const computedMinute = utilsService.getRandom(TIMELINE_MIN, TIMELINE_MAX);
    state.minute += computedMinute;

    if (state.minute >= endMinute) {
        state.minute = endMinute;
        state.isMatchEnded = true;
    }
};

/**
 * Add a generic text event
 *
 * @param {string} text
 */
const logGenericEvent = text => {
    state.timeline.unshift({
        id: timelineEntryId,
        minute: state.minute,
        text: text,
        isUserAttacking: true
    });
};

/**
 * Add turn outcome to the timeline
 *
 * @param {string} text
 */
const logTurnOutcome = text => {
    updateMinute();
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
        updateCardStat(
            offTeam === 'user' ? 'opponent' : 'user',
            defCard.id,
            defStat.name,
            lostStatPoints
        );
    } else {
        updateCardStat(offTeam, offCard.id, offStat.name, lostStatPoints);
    }

    return winner;
};

/**
 * Simulate the event that involves the two cards
 */
const simulateBattle = () => {
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

    timelineText = scenariosService.getTextByScenario(
        scenario,
        offCard,
        defCard,
        isGoal,
        lostStatPoints
    );

    logTurnOutcome(timelineText);
};

/**
 * Simulate the card battle
 */
const simulateTurn = () => {
    if (state.isMatchEnded) {
        return;
    }

    if (state.timeline.length === 0) {
        logGenericEvent('Game started.');
    }

    try {
        autoSelectOpponentCard();
        simulateBattle();
    } catch (error) {
        console.error(error);
    }
};

/**
 * Play the turn
 *
 * @returns {promise}
 */
const playTurn = async function() {
    let promise = new Promise((resolve, reject) => {
        if (getSelectedCard('user')) {
            simulateTurn();
            state.isUserAttacking = !state.isUserAttacking;
            if (state.isMatchEnded) {
                timelineEntryId++;
                logGenericEvent('Game has ended.');
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
};

const matchService = {
    state,
    resetState,
    getCardsForTeam,
    setCardsForTeam,
    clearCardsForTeam,
    selectCardForTeam,
    playTurn
};

export default matchService;
