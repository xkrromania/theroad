const STATS = [
    {
        id: 0,
        label: 'Ability',
        property: 'abi'
    },
    {
        id: 1,
        label: 'Intelligence',
        property: 'int'
    },
    {
        id: 2,
        label: 'Physical',
        property: 'phy'
    }
];

const MAX_OVERALL = 25;

let statsService = {
    get: () => {
        return STATS;
    },
    getInitialState: () => {
        let stats = {};

        STATS.forEach(stat => {
            const key = stat.property;
            stats[key] = 0;
        });

        return stats;
    },
    getValues: () => {
        return STATS.map(stat => stat.value);
    },
    getMaxOverall: () => {
        return MAX_OVERALL;
    },
    getOverall: stats => {
        return Object.keys(stats).reduce(
            (sum, key) => sum + parseFloat(stats[key] || 0),
            0
        );
    }
};

export default statsService;
