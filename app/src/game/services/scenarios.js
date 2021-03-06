import utilsService from './utils';

const SCENARIOS = {
    set_piece: 20, //20% a free kick/penalty
    cross: 60, // 40% a cross
    open_play: 100 // 40% an open play shot
};

/**
 *
 * @param {string} scenario
 * @param {object} offCard
 * @param {object} defCard
 * @param {boolean} isGoal
 * @param {number} lostStatPoints
 *
 * @returns {string}
 */
const getTextByScenario = (scenario, offCard, defCard, isGoal, lostStatPoints) => {
    let text = '';
    let statLost = '';

    switch (scenario) {
        case 'set_piece':
            statLost = 'INT';
            if (isGoal) {
                text = `Goal scored by ${offCard.name}! `;
                text += `He scores from free kick `;
                text += `despite ${defCard.name} efforts`;
            } else {
                text = `${defCard.name} `;
                text += `heads the ball out after the free kick from ${offCard.name}`;
            }
            break;
        case 'cross':
            statLost = 'PHY';
            if (isGoal) {
                text = `Goal! ${offCard.name} heads the ball into the net despite ${defCard.name} efforts`;
            } else {
                text = `${defCard.name} heads the ball out after the free kick from ${offCard.name}`;
            }
            break;
        default:
            statLost = 'ABI';
            if (isGoal) {
                text = `Goal! ${offCard.name} shoots and scores despite ${defCard.name} opposition`;
            } else {
                text = `${defCard.name} takes the ball from ${offCard.name}`;
            }
            break;
    }

    text += ` (who lost ${lostStatPoints} ${statLost}).`;

    return text;
};

/**
 * Get scenario name
 */
const getScenarioName = () => {
    const random = utilsService.getRandom(0, 100);

    if (random < SCENARIOS.set_piece) {
        return 'set_piece';
    }

    if (random < SCENARIOS.cross) {
        return 'cross';
    }

    return 'open_play';
};

const scenariosService = {
    getScenarioName: getScenarioName,
    getTextByScenario: getTextByScenario,
    SCENARIOS: SCENARIOS
};

export default scenariosService;
