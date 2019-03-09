require('dotenv').load();

const db = require('../lib/db');

const fetchFacebookLikes = require('../lib/fetch-facebook-likes');

const facebook = {

    updateLikes: async () => {
        console.log('Fetching Facebook likes');
        const likes = await fetchFacebookLikes();
        await db.set('facebook.likes', likes);
        return likes;
    },

    loadLikes: async () => {
        const likes = await db.get('facebook.likes');
        likes && console.log(`Found ${likes.length} likes`);
        if (likes) return likes;
        return await facebook.updateLikes();
    }

};

module.exports = async (req, res) => {

    const likes = await facebook.loadLikes();
    return res.json(likes);

};
