module.exports = function(app, functions, io) {
    
    app.get('/', function(req, res) {
        functions.loadGlobalData(function (globalData) {
            res.render('index', {
                globalData: globalData,
                message: 'welcome',
            });
        });
    });

};
