import utilsService from './utils';
import NAMES from './constants/names';
import SURNAMES from './constants/surnames';
import MAX_PLAYERS from './constants/max_players';

const getPlayerName = () => {
    let name = NAMES[utilsService.getRandom(0, NAMES.length - 1)],
        surname = SURNAMES[utilsService.getRandom(0, SURNAMES.length - 1)];

    return `${name} ${surname}`;
};

/**
 * Generate stats for a player
 *
 * @param {number} overall
 *
 * @returns {object}
 */
const generateStats = (overall) => {
    let statPointsRemaining = overall,
        stats = {},
        statValue;

    statValue = utilsService.getRandom(5, statPointsRemaining/2);
    statPointsRemaining -= statValue;
    stats.abi = statValue;

    statValue = utilsService.getRandom(5, statPointsRemaining - stats.abi);
    statPointsRemaining -= statValue;
    stats.int = statValue;

    stats.phy = utilsService.getRandom(5, statPointsRemaining);

    return stats;
};

/**
 * Generate a team
 *
 * @param {minAttr} minOverall
 * @param {maxAttr} maxOverall
 */
const generateTeam = (minOverall, maxOverall) => {
    minOverall = minOverall | 20;
    maxOverall = maxOverall | 40;

    const overall = utilsService.getRandom(minOverall, maxOverall);
    const possibleTypes = ['gkr'];
    const outfieldPlayers = MAX_PLAYERS - 1;
    let team = [];

    for (let i = 1; i < outfieldPlayers + 1; i++) {
        if (i <= outfieldPlayers / 2) {
            possibleTypes.push('def');
        } else {
            possibleTypes.push('fwd');
        }
    }

    for (let i = 0; i < MAX_PLAYERS; i++) {
        let UserCard = {
            id: i,
            name: getPlayerName(),
            stats: generateStats(overall),
            changedStats: [],
            type: possibleTypes[i]
        };

        team.push(UserCard);
    }

    return team;
};

const gameService = {
    generateTeam,
    getOpponentTeam: generateTeam
};

export default gameService;
