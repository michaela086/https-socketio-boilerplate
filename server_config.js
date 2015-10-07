module.exports.webtitle = 'Auction Site';

var server = 'localhost';
var http_port = '8081';
var https_port = '8080';

module.exports.serverip = server;
module.exports.serverport = https_port;
module.exports.serverhttpport = http_port;

module.exports.mongodb = server + ':27017/auction';

// these are the local fb keys
module.exports.FACEBOOK_APP_ID = "680549462081788";
module.exports.FACEBOOK_APP_SECRET = "7e4a939626a5f4f115b272488637709c";
module.exports.FACEBOOK_CALLBACK_URL = "https://" + server + ":" + https_port + "/auth/facebook/callback";
