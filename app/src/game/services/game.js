import utilsService from './utils';
import NAMES from './constants/names';
import SURNAMES from './constants/surnames';

const MAX_PLAYERS = 5;
const getPlayerName = () => {
    let name = NAMES[utilsService.getRandom(0, NAMES.length - 1)],
        surname = SURNAMES[utilsService.getRandom(0, SURNAMES.length - 1)];

    return `${name} ${surname}`;
};

/**
 * Generate a team
 *
 * @param {minAttr} minAttr
 * @param {maxAttr} maxAttr
 */
const generateTeam = (minAttr, maxAttr) => {
    minAttr = minAttr | 5;
    maxAttr = maxAttr | 15;

    let team = [];
    let possibleTypes = ['gkr'];
    let outfieldPlayers = MAX_PLAYERS - 1;

    for (let i = 1; i < outfieldPlayers + 1; i++) {
        if (i <= outfieldPlayers / 2) {
            possibleTypes.push('def');
        } else {
            possibleTypes.push('atk');
        }
    }

    for (let i = 0; i < MAX_PLAYERS; i++) {
        let playerCard = {
            id: i,
            name: getPlayerName(),
            stats: {
                abi: utilsService.getRandom(minAttr, maxAttr),
                int: utilsService.getRandom(minAttr, maxAttr),
                phy: utilsService.getRandom(minAttr, maxAttr)
            },
            type: possibleTypes[i]
        };

        team.push(playerCard);
    }

    return team;
};

const gameService = {
    getMaxPlayers: () => {
        return MAX_PLAYERS;
    },
    generateTeam: generateTeam,
    getOpponentTeam: generateTeam
};

export default gameService;
