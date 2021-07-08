const functions = require('firebase-functions');
const db = require("../database")
// const axios = require('../axios')
// const tamplates = require('./tamplates')
const api = 'https://www.myofficeguy.com/api'
const axios = require('axios');
const cors = require('cors')({origin: true});

const CompanyID = 91849298
const APIKey = "e3cPUXi0jn3Gpn3mHwDmFnMnOaCSWb7lL0GNuGobaen4nIc4bS"

exports.validatePayment = functions.https.onCall(async (data, context) => {
    const uid = context.auth.uid;
    const entity = `users/${uid}/data/package/paymentDetails/data/OG-CustomerID`
    const isUserPay = await db.get(entity)

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
//
// exports.billingRecurringCancel = functions.https.onCall(async (data, context) => {
//         const uid = context.auth.uid;
//         let entity = `users/${uid}/data/package/paymentDetails/data`
//         const userPaymentDetailsFromDB = await db.get(entity)
//         const EntityID = userPaymentDetailsFromDB['OG-PaymentID']
//         const CustomerID = userPaymentDetailsFromDB['OG-CustomerID']
//
//         data = getUserEntity(CompanyID, APIKey, EntityID)
//         entity = '/crm/data/getentity/'
//         post({api, entity, data}).then((userEntity) => {
//
//             let RecurringCustomerItemID = userEntity['Data']['Entity']['Billing_CustomerItems']['ID']
//             data = cancelRecurringCustomer(CompanyID, APIKey, CustomerID, RecurringCustomerItemID)
//             entity = '/billing/recurring/cancel/'
//             post({api, entity, data}).then((result) => {
//
//                 console.log(result.data, '////////////////////// result.data///////////////')
//                 console.log(result, '////////////////////// result ///////////////')
//             })
//         })
//     }
// )
exports.billingRecurringCancel = functions.region('europe-west1').https.onRequest(async (req, res) => {
    let data = null
    await cors(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(401).json({
                message: "Not allowed"
            });
        }
        const uid = req.body.uid
        console.log(uid)
        let entity = `users/${uid}/data/package/paymentDetails/data`
        const userPaymentDetailsFromDB = await db.get(entity)
        console.log(userPaymentDetailsFromDB)

        const EntityID = userPaymentDetailsFromDB['OG-PaymentID']
        const CustomerID = userPaymentDetailsFromDB['OG-CustomerID']

        data = getUserEntity(CompanyID, APIKey, EntityID)
        entity = '/crm/data/getentity/'
        return axios.post(api + entity, data).then((userEntity) => {
            console.log('///////////////////////////////////////////'
                ,userEntity.data.Data,
                '//////////////////////////////////////////////////////')
            console.log('///////////////////////////////////////////'
                ,userEntity.data.Data.Entity,
                '//////////////////////////////////////////////////////')
            console.log('///////////////////////////////////////////'
                ,userEntity.data.Data.Entity.Billing_CustomerItems,
                '//////////////////////////////////////////////////////')

            let RecurringCustomerItemID = userEntity.data['Data']['Entity']['Billing_CustomerItems']['ID']
            data = cancelRecurringCustomer(CompanyID, APIKey, CustomerID, RecurringCustomerItemID)
            entity = '/billing/recurring/cancel/'
            return axios.post(api + entity, data).then((result) => {

                console.log(result.data, '////////////////////// result.data///////////////')
            }).catch(err => {
                console.log(err)
                return res.status(500).json({
                    error: err
                })
            })
        }).catch(err => {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        })
    })
});


const getUserEntity = (CompanyID, APIKey, EntityID) => {
    return {
        Credentials: {
            CompanyID: CompanyID,
            APIKey: APIKey
        },
        EntityID,
        IncludeIncomingProperties: true,
        IncludeFields: true
    }
}
const cancelRecurringCustomer = (CompanyID, APIKey, CustomerID, RecurringCustomerItemID) => {
    return {
        Credentials: {
            CompanyID,
            APIKey
        },
        Customer: {
            ID: CustomerID,
        },
        RecurringCustomerItemID
    }
}
