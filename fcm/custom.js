var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var admin = require('./admin.js')

let tvdb = require(__dirname + '/../tvdb');

var html;

var middleware = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

router.use(bodyParser.urlencoded({ extended: true }), middleware);

router.post('/', function (req, res) {
    var editedBody = req.body;
    /*if (Object.values(req.body) == "") {
        var editedBody = Object.keys(req.body)
        editedBody = JSON.parse(editedBody[0])
    }*/

    var registrationToken = editedBody.token;
    
    /*var payload = {
        notification: {
          title: "Fedor",
          body: "Accident 💩!!!!"
        }
      };
      
      var options = {
        priority: "high",
        timeToLive: 60 * 60 *24
      };*/

    var payload = {
        data: {
            title: editedBody.title,
            body: editedBody.body
        }
    };

    var options = {
        priority: editedBody.priority,
        timeToLive: JSON.parse(editedBody.timetolive)
    };

    admin.messaging().sendToDevice(registrationToken, payload, options)
        .then(function (response) {
            console.log("Successfully sent message:", response.results[0]);
            res.status(200).send("Message Sent!");
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
            res.status(500).send("An error occured. Blame Konrad <br>" + error);
        });

    console.log(editedBody);
    

});

router.get('/', function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../html/site.html"));
});

module.exports = router;
