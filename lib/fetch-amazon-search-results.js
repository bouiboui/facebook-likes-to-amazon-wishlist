const scrapeIt = require('scrape-it');

const fetchAmazonSearchResults = async query => {

    const {data} = await scrapeIt(process.env.AMAZON_SEARCH_URL + query, {
        results: {
            listItem: '.s-result-item',
            data: {
                image: {
                    selector: '.s-image',
                    attr: 'src'
                },

                title: {
                    selector: '.s-image',
                    attr: 'alt'
                },

                price: '.a-price',

                link: {
                    selector: '.a-link-normal',
                    how: a => a.attr('href')
                },

                stars: {
                    selector: '.a-icon-star-small',
                    how: a => a.attr('class')
                }

            }
        }
    });

    return data;

};

module.exports = fetchAmazonSearchResults;