const Keyv = require('keyv');

const keyv = new Keyv('sqlite://' + __dirname + '/../database.sqlite');
keyv.on('error', err => console.log('Connection Error', err));

module.exports = keyv;
