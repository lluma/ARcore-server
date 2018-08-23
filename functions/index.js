// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const fs = require('fs');
const functions = require("firebase-functions");
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');

var firebase = admin.initializeApp(functions.config().firebase);
var bodyParser = require('body-parser');
var textParser = bodyParser.text;

exports.date = functions.https.onRequest((req, res) => {
    //const date = moment()
    //res.status(200).json({ date: firebase.name });
    cors(req, res, () => {
        
    });

    // Get the firebase storage
    var storage = firebase.storage();

    // Get the bucket we want from our firebase storage
    var bucket = storage.bucket('gs://arcorecloudstorage.appspot.com');
    
    // Get the file we are going to delete
    var file = bucket.file('666.json', {
        contentType: 'application/json'
    });
    
    // Delete file
    // file.delete().then((data) => {
    //     console.log(data[0]);
    // }).catch((err) => {
    //     console.log("Error ", err);
    //     // Send failed response back to client
    //     return res.status(200).json({ response: "Failed" });
    // });

    const contents = req.body;
    
    file.save(contents, {
        contentType: 'application/json'
    }).then(() => {
        // Send succeed response back to client
        return res.status(200).json({ response: "Success with " + contents });
    }).catch((err) => {
        console.log(err);
    });
});
