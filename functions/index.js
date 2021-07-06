const functions = require("firebase-functions");

// Automatically allow cross-origin requests


// Expose Express API as a single Cloud Function:

exports.payment = require("./middleware/payments");


