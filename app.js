let express = require('express');
let app = express();

var seriesNameController = require('./getSeriesByName/nameController.js');
var seriesIdController = require("./getSeriesById/seriesIdController.js");
var allController = require("./getSeriesAllById/allController.js");
var latestep = require('./getLatestEpisodeById/latestEpController.js');
var fedor = require('./fcm/fedor.js');
var custom = require('./fcm/custom.js');

app.use('/getSeriesByName', seriesNameController);
app.use('/getSeriesById', seriesIdController);
app.use('/getSeriesAllById', allController);
app.use('/getLatestEpisodeById', latestep);
app.use("/fcm",fedor);
app.use("/fcmcstm",custom);

module.exports = app;