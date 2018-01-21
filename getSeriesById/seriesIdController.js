var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

let tvdb = require(__dirname + '/../tvdb');

var html;

var middleware = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

router.use(bodyParser.urlencoded({ extended: true }),middleware);

router.post('/', function (req, res) {
    console.log("haha")
    var editedBody = req.body;
    if(Object.values(req.body) == "") {
        var editedBody = Object.keys(req.body)
        editedBody = JSON.parse(editedBody[0])
    } 
    
    
    tvdb.getSeriesById(editedBody.series_id)
    .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            console.log(error)
        });
});

router.get('/', function (req, res) {
    res.status(200).sendFile("./site.html", {root: __dirname });
});
module.exports = router;
