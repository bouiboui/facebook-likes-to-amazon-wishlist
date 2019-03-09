const scrapeIt = require('scrape-it');

const fetchAmazonSearchResults = async query => {

    const {data} = await scrapeIt(process.env.AMAZON_SEARCH_URL + query, {
        results: {
            listItem: '.s-item-container',
            data: {
                image: {
                    selector: '.s-access-image',
                    attr: 'src'
                },

                title: {
                    selector: '.s-access-image',
                    attr: 'alt'
                },

                price: '.s-price',

                link: {
                    selector: '.s-access-detail-page',
                    how: a => a.attr('href')
                },

                stars: {
                    selector: '.a-icon-star',
                    how: a => a.attr('class')
                }

            }
        }
    });

    return data;

};

module.exports = fetchAmazonSearchResults;