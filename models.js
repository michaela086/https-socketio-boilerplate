var mongoose = require('mongoose');
var server_config = require('./server_config.js');
var db = mongoose.createConnection('mongodb://' + server_config.mongodb);


module.exports.User = db.model('User', {
    id: String,
    displayName: String,
    name: Object,
    provider: String
});

