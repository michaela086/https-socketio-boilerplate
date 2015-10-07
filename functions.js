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

    functions.getCurrentBid = function(auctionId, cb) {
        var data = 0;
        models.Bid.findOne({ auctionId: auctionId }).sort({ timestamp: 'desc' }).exec(function(err, currentBid) {
            if (currentBid && currentBid.amount > 0) {
                data = currentBid.amount;
            } 
            return cb(data);
        });
    };

    functions.saveNewBid = function(data) {
        var bid = new models.Bid();
        bid.auctionId = data.auctionId;
        bid.userId = data.userId;
        bid.amount = data.amount;

        bid.save(function(err) {
            if (err) { console.log(err); }
        });
    };

    functions.ensureAuthenticated = function(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    };

    return functions;
};
