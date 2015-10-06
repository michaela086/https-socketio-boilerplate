/*global require, module */
var server_config = require('./server_config');

module.exports = function(io) {
    var functions = {};
    
    functions.loadGlobalData = function(cb) {
        var data = {};
        data.settings = server_config;
        return cb(data);
    };

    functions.ensureAuthenticated = function(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    };

    return functions;
};
