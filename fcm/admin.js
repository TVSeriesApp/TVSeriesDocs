var admin = require("firebase-admin");

var serviceAccount = require("./the-tv-series-app-firebase-adminsdk-k5va3-78457f8120.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-tv-series-app.firebaseio.com"
});