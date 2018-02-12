/*Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

Date.prototype.get365 = function() {
  /*var month;
  switch (this.getMonth()) {
    case 0:
      month = 1;
      break;
    case 1:
      month = 32;
      break;
    case 2:
      month = 60;
      break;
    case 3:
      month = 91;
      break;
    case 4:
      month = 121;
      break;
    case 5:
      month = 152;
      break;
    case 6:
      month = 182;
      break;
    case 7:
      month = 213;
      break;
    case 8:
      month = 243;
      break;
    case 9:
      month = 274;
      break;
    case 10:
      month = 304;
      break;
    case 11:
      month = 334;
      break;
    default:
      month = null;
  }
  return month + this.getDate() - 1;
};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};*/

var arrayFunctions = require("./arrayFunctions.js")
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");

let tvdb = require(__dirname + "/../tvdb");

var html;

var middleware = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

router.use(bodyParser.urlencoded({ extended: true }), middleware);

router.post("/", function(req, res) {
  var editedBody = req.body;
  if (Object.values(req.body) == "") {
    var editedBody = Object.keys(req.body);
    editedBody = JSON.parse(editedBody[0]);
  }

  tvdb
    .getSeriesAllById(editedBody.series_id)
    .then(response => {
      var eps = response.episodes;
      //res.status(200).send(eps[eps.length - 1]);
      var now = new Date();
      var dates = [];
      for (var i = 0; i < eps.length; i++) {
        dates[i] = new Date(`${eps[i].firstAired} ${response.airsTime}`);
      }
      console.log(arrayFunctions)
      res.status(200).send(arrayFunctions.latestFunction(dates, eps));

    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/", function(req, res) {
  res.status(200).sendFile(path.join(__dirname + "/../html/site.html"));
});

module.exports = router;
