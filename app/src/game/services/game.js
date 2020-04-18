const MAX_PLAYERS = 5;
const basicTeam = [{
    id: 0,
    name: 'Iker Casillas',
    stats: { abi: '10', int: '10', phy: '5' },
    type: 'gkr'
},{
    id: 1,
    name: 'Sergio Ramos',
    stats: { abi: '10', int: '10', phy: '5' },
    type: 'def'
},{
    id: 2,
    name: 'Andreea Pirlo',
    stats: { abi: '11', int: '12', phy: '2' },
    type: 'mid'
},{
    id: 3,
    name: 'Ngolo Kante',
    stats: { abi: '4', int: '10', phy: '11' },
    type: 'mid'
},{
    id: 4,
    name: 'Fernando Torres',
    stats: { abi: '8', int: '10', phy: '7' },
    type: 'atk'
}];

const gameService = {
    getMaxPlayers: () => {
        return MAX_PLAYERS;
    },
    getBasicTeam: () => {
        return basicTeam;
    }
};

export default gameService;
