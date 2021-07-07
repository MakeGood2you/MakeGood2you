import db from '../../middleware/firebase/database/api'
const user = JSON.parse(localStorage.getItem('user'))
const entity = `users${user.uid}/data/businessInfo`
export default {
//genric login functions

    addBusinessDetails: async ({commit, rootState}, businessDetails) => {
        await db.set(entity, businessDetails)
        commit('addDetails', businessDetails)
    },

    getBusinessDetails: async ({commit,rootState}) =>{
      const businessDetails = await db.get(entity)
        commit('addDetails', businessDetails)
    }

}
