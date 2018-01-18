let express = require('express');
let app = express();
let db = require('./db');

var userController = require('./user/userController');
app.use('/users', userController);

module.exports = app;