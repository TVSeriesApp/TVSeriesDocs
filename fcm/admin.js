var admin = require("firebase-admin");

var serviceAccount = require("./the-tv-series-app-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-tv-series-app.firebaseio.com"
});

/*var registrationToken = "euaTN6kHWzs:APA91bGBRO2osv_jf4KhSF9bbN2_Me7LeS04wnMp2lSSwIYxSoVKpwzKd142UITBQQ1S18XwZC9qAcw0J74Ffd-35TwiM_KOUCPvQ3iVJpYyot8LOHH_SQpJ-lhsAbzrfQHoX9gqDsIg";

var payload = {
  notification: {
    title: "Fedor",
    body: "Accident 💩!!!!"
  }
};

var options = {
  priority: "high",
  timeToLive: 60 * 60 *24
};

admin.messaging().sendToDevice(registrationToken, payload, options)
  .then(function(response) {
    console.log("Successfully sent message:", response.results[0]);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });*/
module.exports = admin;  
