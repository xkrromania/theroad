import utilsService from './utils';
import scenariosService from './scenarios';

const TIMELINE_MIN = 5;
const TIMELINE_MAX = 10;

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

const addTimelineEntry = text => {
    const endMinute = utilsService.getRandom(91, 96);
    const computedMinute = utilsService.getRandom(TIMELINE_MIN, TIMELINE_MAX);
    state.minute += computedMinute;

    if (state.minute >= endMinute) {
        state.minute = endMinute;
        state.isMatchEnded = true;
    }

    state.timeline.unshift({
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
    if (isAttacking) {
        if (type === 'atk') {
            return 1;
        }

        if (type === 'def') {
            return 2;
        }

        return 3;
    } else {
        if (type === 'atk') {
            return 2;
        }

        if (type === 'def') {
            return 1;
        }

        return 1;
    }
};

/**
 *
 * @param {object} stats
 * @param {string} type
 * @param {boolean} isAttacking
 * @param {string} scenario
 *
 * @returns {object}
 */
const getCardLevelForScenario = (stats, type, scenario, isAttacking) => {
    let typeDeficit = getTypeDeficit(type, isAttacking);

    switch (scenario) {
        case 'set_piece':
            return {
                name: 'int',
                value: parseInt(stats.int / typeDeficit)
            };
        case 'cross':
            return {
                name: 'phy',
                value: parseInt(stats.phy) // Physical stats are the same for each pos.
            };
        default:
            return {
                name: 'abi',
                value: parseInt(stats.abi / typeDeficit)
            };
    }
};

const updateCardStat = (team, cardId, stat, value) => {
    value = value < 0 ? 0 : value;
    state.cards[team].forEach(card => {
        if (card.id === cardId) {
            card.stats = { ...card.stats, [stat]: value };
            return;
        }
    });
};

/**
 * Simulate the event that involves the two cards
 *
 * @param {object} card
 * @param {object} opponentCard
 * @param {string} offTeam
 *
 * @return {string}
 */
const simulateEvent = (offCard, defCard, offTeam) => {
    const scenario = scenariosService.getScenarioName(offCard, defCard);
    const offStat = getCardLevelForScenario(
        offCard.stats,
        offCard.type,
        scenario,
        true
    );
    const defStat = getCardLevelForScenario(
        defCard.stats,
        defCard.type,
        scenario,
        false
    );
    console.log(JSON.stringify(offStat));
    console.log(JSON.stringify(defStat));
    let timelineText = '';
    let isGoal = false;
    let difference = offStat.value - defStat.value;

    // Offense Wins
    if (difference > 0) {
        isGoal = true;
        state.score[offTeam]++;
        timelineText = scenariosService.getTextByScenario(scenario, offCard, defCard, isGoal, difference);
        updateCardStat(
            offTeam === 'user' ? 'opponent' : 'user',
            defCard.id,
            defStat.name,
            defCard.stats[defStat.name] - difference
        );

        return timelineText;
    }

    // DefenseWins
    updateCardStat(
        offTeam,
        offCard.id,
        offStat.name,
        offCard.stats[offStat.name] - (-difference)
    );
    timelineText = scenariosService.getTextByScenario(scenario, offCard, defCard, isGoal, difference);

    return timelineText;
};

/**
 * Play the turn
 */
const simulateTurn = () => {
    if (state.isMatchEnded) {
        return;
    }

    if (state.timeline.length === 0) {
        state.timeline.unshift({
            minute: state.minute,
            text: 'Game started.',
            isUserAttacking: state.isUserAttacking
        });
    }

    try {
        let opponentCardId = state.isUserAttacking
            ? utilsService.getRandom(0, 2)
            : utilsService.getRandom(3, 4);
        selectCardForTeam('opponent', opponentCardId);
        state.cards.opponent[opponentCardId].hasHiddenStats = false;
        let opponentCard = getSelectedCard('opponent');

        let selected = {
            user: getSelectedCard('user'),
            opponent: opponentCard
        };

        if (state.isUserAttacking) {
            addTimelineEntry(
                simulateEvent(selected.user, selected.opponent, 'user')
            );
        } else {
            addTimelineEntry(
                simulateEvent(selected.opponent, selected.user, 'opponent')
            );
        }
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
                    state.timeline.unshift({
                        minute: state.minute,
                        text: 'Game has ended.',
                        isUserAttacking: state.isUserAttacking
                    });
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
