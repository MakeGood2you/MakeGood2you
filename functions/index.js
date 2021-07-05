const functions = require("firebase-functions");

// Automatically allow cross-origin requests
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://osher-project-default-rtdb.europe-west1.firebasedatabase.app"
});

// Expose Express API as a single Cloud Function:

// exports.payment = require("./middleware/payments");


exports.validatePayment = functions.https.onCall(async (data, context) => {
    // const uid = context.auth.uid;
    //
    // console.log('///////////////////'+uid+'////////////////////////////////////')
    //
    console.log('///////////////////'+data+'////////////////////////////////////')
    // const user = await db.get(data.entity)
    // console.log('///////////////////'+user+'////////////////////////////////////')
    //
    //
    // console.log('/////////////////////////////////////////////////////// FINISH /////////////////////////////////////////////////')
    return 'hello kobi'
})

