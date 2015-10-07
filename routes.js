module.exports = function(app, functions, io) {

    var passport = require('passport');

    app.get('/', functions.ensureAuthenticated, function(req, res) {
        functions.loadGlobalData(function (globalData) {
            res.render('index', {
                globalData: globalData,
                message: 'welcome',
            });
        });
    });

    app.get('/login', function(req, res) {
        functions.loadGlobalData(function (globalData) {
            res.render('login', {
                globalData: globalData,
                user: req.user
            });
        });
    });

    app.get('/account', functions.ensureAuthenticated, function(req, res) {
        functions.loadGlobalData(function (globalData) {
            res.render('account', {
                globalData: globalData,
                user: req.user
            });
        });
    });

    app.get('/auction/*', functions.ensureAuthenticated, function(req, res) {
        var auctionId = req.params[0];
        functions.loadGlobalData(function (globalData) {
            functions.getCurrentBid(auctionId, function (currentBid) {
                res.render('auction', {
                    globalData: globalData,
                    auctionId: auctionId,
                    currentBid: currentBid,
                    user: req.user
                });
            });
        });
    });

    app.post('/api/new_bid', functions.ensureAuthenticated, function(req, res) {
        var auctionId = req.body.auction_id;
        var newBid = req.body.new_bid;
        functions.getCurrentBid(auctionId, function (currentBid) {
            if (currentBid < newBid) {
                var data = {};
                data.auctionId = auctionId;
                data.userId = req.user.id;
                data.amount = newBid;
                functions.saveNewBid(data, function (result) {
                    console.log(result);
                });
                res.send('success');
            } else {
                res.send('too small');
            }
        });
    });

    app.get('/auth/facebook',
        passport.authenticate('facebook'),
        function(req, res){
    });

    app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/auction/1234');
        });

    app.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    });

};
