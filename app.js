let express = require('express');
let app = express();

var seriesNameController = require('./getSeriesByName/nameController.js');
var seriesIdController = require("./getSeriesById/seriesIdController.js");
var allController = require("./getSeriesAllById/allController.js");
var fedor = require('./fcm/fedor.js');

app.use('/getSeriesByName', seriesNameController);
app.use('/getSeriesById', seriesIdController);
app.use('/getSeriesAllById', allController);
app.use("/fcm",fedor);

module.exports = app;