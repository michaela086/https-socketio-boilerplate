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

    app.get('/auth/facebook',
        passport.authenticate('facebook'),
        function(req, res){
    });

    app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/account');
        });

    app.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    });

};
