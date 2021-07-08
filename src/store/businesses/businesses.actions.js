import db from '../../middleware/firebase/database/api'
import {getUserFromLocalStorage} from '../../middleware/utils'
import functions from "../../middleware/firebase/functions";
import database from "../../middleware/firebase/database";
const user = getUserFromLocalStorage()

export default {
//genric login functions

    addBusinessDetails: async ({commit, rootState}, businessDetails) => {
        const uid = getUserFromLocalStorage().uid
        const entity = `users/${uid}/data/businessInfo`
        await db.set(entity, businessDetails)
        commit('addDetails', businessDetails)
    },

    getBusinessDetails: async ({commit,rootState, getters}) => {
        const uid = getUserFromLocalStorage().uid
        const entity = `users/${uid}/data/businessInfo`
        const businessDetails = await db.get(entity)
        debugger
        commit('addDetails', businessDetails)
    },

    isUserPayValidate: async ({commit}, uid) => {
        const isUserPay = await functions.callableFunction({you: 'got', it: 'bro', uid,}, 'payment-validatePayment')
        console.log('is user pay? ', isUserPay)
        commit('isUserPay', isUserPay)
    },

    setPayment: async  ({}, details) => {
        const entity = `users/${user.uid}/data/package/paymentDetails`
        debugger
        await db.set(entity, details)
    },

}
