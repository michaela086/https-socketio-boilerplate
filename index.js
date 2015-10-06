var server_config = require('./server_config');
var express = require('express');
var app = express();
var httpapp = express();
var fs = require('fs');
var path = require('path');
var options = {
        key: fs.readFileSync('./cert/client.key'),
        cert: fs.readFileSync('./cert/client.crt'),
        requestCert: true
    };
var http = require('http').createServer(httpapp);
var server = require('https').createServer(options, app);
var io = require('socket.io').listen(server);
var swig = require('swig');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var functions = require('./functions.js')(io);

httpapp.get('*', function(req,res) {
    res.redirect('https://' + server_config.serverip + ':' + serverhttpport + req.url);
});

var routes = require('./routes.js')(app, functions, io);
var socket = require('./socket.js')(io);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

server.listen(server_config.serverport);
http.listen(server_config.serverhttpport);
