const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');


// Automatically allow cross-origin requests
app.use(cors({origin: true}));



// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
