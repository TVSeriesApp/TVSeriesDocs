var admin = require("firebase-admin");

var serviceAccount = require("./the-tv-series-app-firebase-adminsdk-k5va3-56ded94bc5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-tv-series-app.firebaseio.com"
});

var registrationToken = "euaTN6kHWzs:APA91bF7vckyE5_geM63f5vtWicWKI2PZUwqPmdnJG_ITOLSqTeLqH1HkrP0JAduhVa_Yz4n9iNimCl4mC4AgLrRJKhkHq4wl9S8bU_KpRARW2XgHanWgG8yAJvHpm-xiVXBPKDTjJNB";

var payload = {
  notification: {
    title: "Fedor",
    body: "If you read this, msg me on discord!!!!"
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
  });