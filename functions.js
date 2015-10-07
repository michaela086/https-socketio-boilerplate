/*global require, module */
var models = require('./models');
var server_config = require('./server_config');

module.exports = function(io) {
    var functions = {};

    functions.saveUser = function(profile) {
        // Check to see if the user is already saved
        models.User.find({ id: profile.id }, function(err, users) {
            if (users.length === 0) {
                // If user has not been saved before, then save them
                var new_user = new models.User();
                new_user.id = profile.id;
                new_user.displayName = profile.displayName;
                new_user.name = profile.name;
                new_user.provider = profile.provider;

                new_user.save(function(err) {
                    console.log('saved user');
                    if (err) { console.log(err); }
                });
            }
        });
    };
    
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
