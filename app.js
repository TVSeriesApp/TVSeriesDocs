let express = require('express');
let app = express();

var seriesNameController = require('./getSeriesByName/nameController.js');
var seriesIdController = require("./getSeriesById/seriesIdController.js")

app.use('/getSeriesByName', seriesNameController);
app.use('/getSeriesById', seriesIdController);

module.exports = app;