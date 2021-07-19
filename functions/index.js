
const functions = require('firebase-functions')
// const express = require("express")
// const app = express();
// const cors = require('cors');
//
// app.use(cors({origin: true}))
// app.use(express.json())
// app.use('/', require('./routes'))
//
// exports.api = functions.https.onRequest(app)
//
// // To handle "Function Timeout" exception
// exports.functionsTimeOut = functions.runWith({
//     timeoutSeconds: 300
// })

exports.payment = require("./middleware/payments");
exports.storage = require("./middleware/storage");


