import localforage from 'localforage';

localforage.config({
    name: 'gameDb'
});

/**
 * Retrieve the saved team
 *
 * @returns {object}
 */
const getTeam = () => localforage.getItem('team');

/**
 * Save a given team as your default
 *
 * @param {*} cards
 */
const setTeam = (cards) => {
    localforage.removeItem('team').then(function() {
        localforage.setItem('team', cards);
    }).catch(function(err) {
        console.error(err);
    });
};

const dbService = {
    getTeam: getTeam,
    setTeam: setTeam
};

export default dbService;
