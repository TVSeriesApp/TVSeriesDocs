let express = require('express');
let app = express();
let db = require('./db');

var userController = require('./user/userController.js');
app.use('/users', userController);

module.exports = app;