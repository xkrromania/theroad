const TYPES = [
    {
        id: 0,
        label: 'Defender',
        value: 'def'
    },
    {
        id: 1,
        label: 'Forward',
        value: 'fwd'
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
