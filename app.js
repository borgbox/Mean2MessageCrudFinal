var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var compression = require('compression');

//Criação variável mongoose para conectar com BD mongo
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
/*
Rotas para os serviços de manipulação de dados de usuário e mensagens
essas novas rotas serão setadas no middleware na linha nas linhas abaixo
*/
var messagesRoutes = require('./routes/messages');
var userRoutes = require('./routes/user');

var app = express();

//Conectando mongoose ao banco
mongoose.connect('localhost:27017/node-angular');

// gzip support
//app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');

    next();
});

/* Seta no middlesware as novas rotas criadas
começando pelas rotas mais concatenadas(mais especificas) para
evitas que a root tente processar as requisições */
app.use('/message', messagesRoutes);
app.use('/user', userRoutes);

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

module.exports = app;
