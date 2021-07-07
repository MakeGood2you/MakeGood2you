const functions = require('firebase-functions');
const db = require("../database")
// const axios = require('../axios')
const API = 'https://www.myofficeguy.com/api/billing/recurring/cancel/'


exports.validatePayment = functions.https.onCall(async (data, context) => {
    const uid = context.auth.uid;
    console.log(`//////////////////////////////  USER ID  /////////////////////////////`)
    console.log('///////////////////' + uid + '////////////////////////////////////')
    const entity = `users/${uid}/data/package/paymentDetails/data/OG-CustomerID`
    const isUserPay = await db.get(entity)
    console.log(`//////////////////////////////${isUserPay}/////////////////////////////`)
    if (!isUserPay) {
        console.log(`////////////////////////////// IS USER PAY? /////////////////////////////`)
        console.log(`////////////////////////////// FALSE /////////////////////////////`)
        return false
    }
    console.log(`////////////////////////////// IS USER PAY? /////////////////////////////`)
    console.log(`////////////////////////////// TRUE /////////////////////////////`)
    return true
})


 // OG-CustomerID:
 // OG-DocumentNumber:
 // OG-PaymentID:
 // OG-PaymentType:

exports.billingRecurringCancel = functions.https.onCall(async (data, context) => {
    const uid = context.auth.uid;
    const entity = `users/${uid}/data/package/paymentDetails/data`
    const userPaymentDetailsFromDB = await db.get(entity)
    console.log(`//////////////////////////////////////////////////////////////////////////////
    ${userPaymentDetailsFromDB}//////////////////////////////////////////////////////////////////`)
    const CompanyID = 91849298
    const APIKey = "e3cPUXi0jn3Gpn3mHwDmFnMnOaCSWb7lL0GNuGobaen4nIc4bS"

    const userPaymentId = userPaymentDetailsFromDB['OG-CustomerID']
    console.log(`///////////////////////////////////////////////////////////////////////////
    ${userPaymentId}
    ////////////////////////////////////////////////////////////////////////////////////`)
    const userPaymentDetailsToOfficeGuy = {
        Credentials: {
            CompanyID: CompanyID,
            APIKey: APIKey
        },
        Customer: {
            ID: userPaymentDetailsFromDB['OG-CustomerID'],
        },
            RecurringCustomerItemID: 'c96159372'
        }

        // const options = {}
        // const canceltion = await axios.post()


    }
)
