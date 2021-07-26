const functions = require('firebase-functions');
const db = require("../database")
// const axios = require('../axios')
// const tamplates = require('./tamplates')
const api = 'https://www.myofficeguy.com/api'
const axios = require('axios');
const cors = require('cors')({origin: true});

const CompanyID = 91849298
const APIKey = "e3cPUXi0jn3Gpn3mHwDmFnMnOaCSWb7lL0GNuGobaen4nIc4bS"
const paymentPath = (uid) => `payments/${uid}/package`

exports.validatePayment = functions.https.onCall(async (data, context) => {
    if (!context.auth.uid) return false
    const uid = context.auth.uid;
    const entity = `${paymentPath(uid)}`
    const result = await db.get(entity)
    functions.logger.log(result)
    let isUserPay = false
    // !!result.data['OG-CustomerID']
    let lastDate = null
    // result['last_date']
    for (const details in result) {
        if (details === 'paymentDetails') {
            isUserPay = true
            functions.logger.log(isUserPay)
            break;
        }
        if (details === 'last_date') {
            lastDate = result[details]
            functions.logger.log(lastDate)
            break;
        }

    }
    if (!lastDate && !isUserPay) {
        console.log(`////////////////////////////// IS USER PAY? /////////////////////////////`)
        console.log(`////////////////////////////// FALSE /////////////////////////////`)
        return false
    } else if (lastDate && !isUserPay) {
        const isLastDate = new Date().getTime() < new Date(lastDate).getTime()

        console.log(`////////////////////////////// IS USER last date is ? ${lastDate} /////////////////////////////`)
        console.log(`////////////////////////////// ${isLastDate} /////////////////////////////`)
        return isLastDate
    } else {
        console.log(`////////////////////////////// IS USER PAY? /////////////////////////////`)
        console.log(`////////////////////////////// TRUE /////////////////////////////`)
        return true
    }

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
        let entity = `${paymentPath(uid)}/paymentDetails/`
        const userPaymentDetailsFromDB = await db.get(entity)
        functions.logger.log(userPaymentDetailsFromDB,'userPaymentDetailsFromDB')

        const EntityID = userPaymentDetailsFromDB['OG-PaymentID']
        const CustomerID = userPaymentDetailsFromDB['OG-CustomerID']

        data = getUserEntityObj(CompanyID, APIKey, EntityID)
        functions.logger.log('getUserEntity', data)

        entity = '/crm/data/getentity/'
        const userEntity = await axios.post(api + entity, data)
        functions.logger.log('userEntity', userEntity.data['Data']['Entity']['Billing_CustomerItems'][0])
        let RecurringCustomerItemID = userEntity.data['Data']['Entity']['Billing_CustomerItems'][0]['ID']
        console.log(`/////////////////////////////////////////// ${RecurringCustomerItemID}//////////////////////////////////////////////////////`)
        data = recurringList(CompanyID, APIKey, CustomerID)
        entity = '/billing/recurring/listforcustomer'
        const getRecurringItems = await axios.post(api + entity, data)
        const customerItem = getRecurringItems.data['Data']['RecurringItems']
        functions.logger.log(customerItem)

        for (const item of customerItem) {
            if (item['ID'] === RecurringCustomerItemID) {
                functions.logger.log('item[ID]', item['ID'])
                functions.logger.log(`item['Date_NextBilling']`, item['Date_NextBilling'])
                let res = item['Date_NextBilling']
                entity = `${paymentPath(uid)}/last_date`
                await db.set(entity, res)
            }
        }
        // customerItem.find(item => item['Item']['ID'] === RecurringCustomerItemID)


        data = cancelRecurringCustomerObj(CompanyID, APIKey, CustomerID, RecurringCustomerItemID)
        functions.logger.log('cancelRecurringCustomer', data)
        entity = '/billing/recurring/cancel/'
        const result = await axios.post(api + entity, data)
        console.log(result.data, '////////////////////// result.data///////////////')

        entity = `${paymentPath(uid)}/paymentDetails`
        await db.remove(entity, uid)
        return res.status(200).json(result.data)
        //     }).catch(err => {
        //         console.log(err)
        //         return res.status(500).json({
        //             error: err
        //         })
        //     })
        // }).catch(err => {
        //     console.log(err)
        //     return res.status(500).json({
        //         error: err
        //     })
    })
});


const getUserEntityObj = (CompanyID, APIKey, EntityID) => {
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

const cancelRecurringCustomerObj = (CompanyID, APIKey, CustomerID, RecurringCustomerItemID) => {
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

const recurringList = (CompanyID, APIKey, CustomerID, RecurringCustomerItemID) => {
    return {
        Credentials: {
            CompanyID,
            APIKey
        },
        Customer: {
            ID: CustomerID,
        }
    }
}
