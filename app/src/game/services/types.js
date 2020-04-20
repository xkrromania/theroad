const TYPES = [
    {
        id: 0,
        label: 'Goalkeeper',
        value: 'gkr'
    },
    {
        id: 1,
        label: 'Defender',
        value: 'def'
    },
    {
        id: 2,
        label: 'Attacker',
        value: 'atk'
    }
];

let typesService = {
    get: () => {
        return TYPES;
    },
    getValues: () => {
        return TYPES.map((type) => type.value);
    },
    getInitialState :() => {
        return TYPES[0].value;
    }
};

export default typesService;
