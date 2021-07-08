import db from '../../middleware/firebase/database/api'
import {getUserUid} from '../../middleware/utils'

export default {
//genric login functions

    addBusinessDetails: async ({commit, rootState}, businessDetails) => {
        const uid = getUserUid()
        const entity = `users${uid}/data/businessInfo`
        await db.set(entity, businessDetails)
        commit('addDetails', businessDetails)
    },

    getBusinessDetails: async ({commit,rootState}) =>{
        const uid = getUserUid()
        const entity = `users${uid}/data/businessInfo`
        const businessDetails = await db.get(entity)
        commit('addDetails', businessDetails)
    }

}
