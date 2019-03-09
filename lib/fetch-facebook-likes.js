const FB = require('fb');

FB.setAccessToken(process.env.FB_ACCESS_TOKEN);

async function fetchNextLikes(after) {
    const url = 'me/likes?limit=100' + (after ? '&after=' + after : '');
    const response = await FB.api(url);
    return [
        response.data.map(like => like.name),
        response.paging && response.paging.cursors.after
    ];
}

async function fetchFacebookLikes() {
    let allLikes = [];
    let isComplete = false;
    let finalAfter = null;
    while (!isComplete) {
        const [nextLikes, after] = await fetchNextLikes(finalAfter);
        allLikes = allLikes.concat(nextLikes);
        finalAfter = after;
        isComplete = nextLikes.length < 1;

        console.log('Fetched ' + nextLikes.length + ' likes');
    }
    return allLikes;
}

module.exports = fetchFacebookLikes;
