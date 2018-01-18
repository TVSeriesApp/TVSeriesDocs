let express = require('express');
let app = express();
let db = require('./db');

var UserController = require('./user/UserController');
app.use('/users', UserController);

module.exports = app;