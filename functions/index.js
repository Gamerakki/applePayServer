const functions = require("firebase-functions");
const fs = require('fs');
const path = require('path');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port =  3000;

// Configure express to use body parser and cors, and add our API endpoints
const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
    res.send('Hi!');
});


app.post('/validateSession', async (req, res) => {
    const { appleUrl } = req.body;

    // use set the certificates for the POST request
    // httpsAgent = new https.Agent({
    //     rejectUnauthorized: false,
    //     cert: fs.readFileSync(path.join(__dirname, './certificate.pem')),
    //     key: fs.readFileSync(path.join(__dirname, './sandbox.key')),
    // });

    response = await axios.post(
        appleUrl,
        {
            merchantIdentifier: 'merchant.exampleapple',
            domainName: 'apple-pay-3ed05.web.app',
            displayName: 'Demo Shop',
        }
        // {
        //     httpsAgent,
        // }
    );
    res.send(response.data);
});

app.post('/pay', async (req, res) => {
    const { data } = req.body;

    console.log(data);

    // send payment request based o your payment provider requirements

    res.send({
        approved: true,
    });
});



exports.app = functions.https.onRequest(app)