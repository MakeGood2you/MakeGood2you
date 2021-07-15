import db from '../../middleware/firebase/database/api'
import functions from "../../middleware/firebase/functions";
import axios from "../../middleware/axios";
import storage from "../../middleware/firebase/storage";
import {getUserFromLocalStorage} from '../../middleware/utils'

const user = getUserFromLocalStorage()

export default {

    addBusinessDetails: async ({commit, state}, businessDetails) => {
        const uid = getUserFromLocalStorage().uid
        const entity = `users/${uid}/data/businessInfo`
        businessDetails.photoURL = state.currentImageProfile

        await db.set(entity, businessDetails)
        commit('addDetails', businessDetails)
    },

    getBusinessDetails: async ({commit, state, getters}) => {
        // if (!state.user.uid) return
        const user = getUserFromLocalStorage()
        if (!user) return
        const entity = `users/${user.uid}/data/businessInfo`
        const businessDetails = await db.get(entity)
        console.log('businessDetails ',businessDetails)
        if (!businessDetails) return
        commit('addDetails', businessDetails)
    },

    isUserPayValidate: async ({commit}, uid) => {
        const isUserPay = await functions.callableFunction({you: 'got', it: 'bro', uid,}, 'payment-validatePayment')
        console.log('is user pay? ', isUserPay)
        localStorage.setItem('isPay', JSON.stringify(isUserPay))
        commit('isUserPay', isUserPay)
    },

    setPayment: async ({commit}, details) => {
        const entity = `users/${user.uid}/data/package/paymentDetails`
        let isUserPay = await db.set(entity, details)
        commit('isUserPay', true)
        localStorage.setItem('isPay', JSON.stringify(true))
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
        const entity = `users/${user.uid}/data/businessInfo/businessesLogo`
        let photoURL = null
        if (typeof file === 'object') {
            if (file.name) {
            }
            const result = await storage.getStorageRef(entity).put(file)
            photoURL = await result.ref.getDownloadURL()
            console.log(photoURL)
            commit('setImage', photoURL)
        }
    },


}
