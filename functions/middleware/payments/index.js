const functions = require('firebase-functions');
const db = require("../database")


exports.validatePayment = functions.https.onCall(async (data, context) => {
    const uid = context.auth.uid;
    console.log('///////////////////' + data + '////////////////////////////////////')

    console.log('///////////////////'+uid+'////////////////////////////////////')

    const entity = `users/${uid}/data/package/paymentDetails/data/OG-CustomerID`
    const isUserPay = await db.get(entity)
    console.log(`//////////////////////////////${isUserPay}/////////////////////////////`)
    if (!isUserPay){
        console.log(`////////////////////////////// FALSE /////////////////////////////`)
        return false
    }
    console.log(`////////////////////////////// TRUE /////////////////////////////`)
    return true
})
