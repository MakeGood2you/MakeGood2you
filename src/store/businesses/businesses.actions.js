import db from '../../middleware/firebase/database/api'
import functions from "../../middleware/firebase/functions";
import axios from "../../middleware/axios";
import storage from "../../middleware/firebase/storage";
import {getUserFromLocalStorage} from '../../middleware/utils'

const user = getUserFromLocalStorage()
const tableName = 'businessInfo'

const paymentPath = (uid) => `payments/${uid}/package`
const businessesPath = (uid) => `users/${user.uid}/data/${tableName}`
export default {

    addBusinessDetails: async ({commit, state}, businessDetails) => {
        const entity = `${businessesPath(user.uid)}`
        if (state.currentImageProfile) {
            businessDetails.photoURL = state.currentImageProfile
        }
        await db.set(entity, businessDetails)
        commit('addDetails', businessDetails)
    },

    getBusinessDetails: async ({commit, state, getters}) => {
        // if (!state.user.uid) return

        const user = getUserFromLocalStorage()
        if (!user) return
        const entity = businessesPath(user.uid)
        const businessDetails = await db.get(entity)
        console.log('businessDetails ', businessDetails)
        if (!businessDetails) return
        commit('addDetails', businessDetails)
    },

    isUserPayValidate: async ({commit, state}) => {
        let isUserPay
        if (!state.isPay) {
            isUserPay = await functions.callableFunction({}, 'payment-validatePayment')
        }
        console.log('is user pay? ', isUserPay)
        debugger
        commit('isUserPay', isUserPay)
    },

    setPayment: async ({commit}, details) => {
        const entity = `${paymentPath(user.uid)}/paymentDetails`
        debugger
        await db.set(entity, details.data)
        commit('isUserPay', true)
    },
    billingRecurringCancelAction: async () => {
        const api = 'https://europe-west1-osher-project.cloudfunctions.net'
        const entity = '/payment-billingRecurringCancel'
        const data = {uid: getUserFromLocalStorage().uid}
        const options = {api, entity, data}
        await axios.post(options)

        console.log('is canceling')
    },


    uploadProfileImage: async ({rootState, dispatch, state, commit}, file) => {
        const entity = `users/${user.uid}/business/profilePic`
        let photoURL = null
        const ref = await storage.getStorageRef(entity)
        await ref.put(file).then(async (result) => {
            photoURL = await result.ref.getDownloadURL()
            console.log(photoURL)
            commit('setImage', photoURL)
        })

    },

    setPackagePayment: async ({state, commit}, paymentMethod) => {
        const entity = `${paymentPath(user.uid)}/selected`
        await db.set(entity, paymentMethod)
    },
}
