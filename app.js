let express = require('express');
let app = express();

var userController = require('./getSeriesByName/nameController.js');
app.use('/getSeriesByName', userController);

module.exports = app;