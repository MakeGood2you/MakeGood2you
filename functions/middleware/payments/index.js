const functions = require('firebase-functions');
const db = require("../database")
exports.validatePayment = functions.https.onCall(async (data, context) => {
    const uid = context.auth.uid;
    console.log('///////////////////'+uid+'////////////////////////////////////')
    const user = await db.get(data.entity)
    console.log('///////////////////'+user+'////////////////////////////////////')
    console.log('/////////////////////////////////////////////////////// FINISH /////////////////////////////////////////////////')
})
