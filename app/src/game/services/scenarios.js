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
 * @param {number} difference
 *
 * @returns {string}
 */
const getTextByScenario = (scenario, offCard, defCard, isGoal, difference) => {
    const isDefCardGoalkeeper = defCard.type === 'gkr';
    let text = '';
    let statLost = '';

    switch (scenario) {
        case 'set_piece':
            statLost = 'INT';
            if (isGoal) {
                text = `Goal scored by ${offCard.name}! `;
                text += isDefCardGoalkeeper
                    ? `He converts the penalty `
                    : `He scores from free kick `;
                text += `despite ${defCard.name} efforts`;
            } else {
                text = `${defCard.name} `;
                text += isDefCardGoalkeeper
                    ? `saves the attempt from ${offCard.name}`
                    : `heads the ball out after the free kick from ${offCard.name}`;
            }
            break;
        case 'cross':
            statLost = 'PHY';
            if (isGoal) {
                text = `${offCard.name} heads the ball into the net `;
                text += isDefCardGoalkeeper
                    ? `despite ${defCard.name} efforts`
                    : `after jumping with ${defCard.name}`;
            } else {
                text = `${defCard.name} `;
                text += isDefCardGoalkeeper
                    ? `saves the attempt from ${offCard.name}`
                    : `heads the ball out after the free kick from ${offCard.name}`;
            }
            break;
        default:
            statLost = 'ABI';
            text = `${offCard.name} `;
            if (isGoal) {
                text += isDefCardGoalkeeper
                    ? ` shoots on goal and the attempt can't be saved by ${defCard.name}`
                    : ` shoots and scores despite ${defCard.name} opposition`;
            } else {
                text = `${defCard.name} `;
                text += isDefCardGoalkeeper
                    ? ` saves the attempt from ${offCard.name}`
                    : ` takes the ball from ${offCard.name}`;
            }
            break;
    }

    if (difference > 0) {
        text += ` (who lost ${Math.abs(difference)} ${statLost}).`;
    } else {
        text += '.';
    }

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
