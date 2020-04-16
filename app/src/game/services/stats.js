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

let statsService = {
    get: () => {
        return STATS;
    },
    getInitialState: () => {
        let stats = {};

        STATS.forEach((stat) => {
            const key = stat.property;
            stats[key] = 0;
        });

        return stats;
    },
    getValues: () => {
        return STATS.map((stat) => stat.value);
    }
};

export default statsService;
