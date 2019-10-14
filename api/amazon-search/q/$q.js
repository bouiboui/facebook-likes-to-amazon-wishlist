require('dotenv').config();

const db = require('../../../lib/db');
const md5 = require('../../../lib/md5');

const fetchAmazonSearchResults = require('../../../lib/fetch-amazon-search-results');

const amazon = {

    updateSearchResults: async query => {
        console.log(`Fetching results for query: ${query}`);
        const results = await fetchAmazonSearchResults(query);
        results && console.log(`Found ${results.length} results for query: ${query}`);
        await db.set('amazon.results.' + md5(query), results);
        return results;
    },

    getSearchResults: async query => {
        const results = await db.get('amazon.results.' + md5(query));
        results && console.log(`Found ${results.length} results for query: ${query}`);
        if (results) return results;
        return await amazon.updateSearchResults(query);
    },

};

module.exports = async (req, res) => {
    const {q: query} = req.params;
    const results = await amazon.getSearchResults(query);
    return res.json(results);
};
