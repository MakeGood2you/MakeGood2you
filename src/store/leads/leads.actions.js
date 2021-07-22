import database from "../../middleware/firebase/database";
import storage from "../../middleware/firebase/storage";
import db from "../../middleware/firebase/database/api";
import 'firebase/storage';

import {getUserFromLocalStorage} from '../../middleware/utils'

const user = getUserFromLocalStorage()
let tableName = 'leads'
const path = (uid) => `users/${uid}/data/${tableName}`

export default {
    getLeads: async ({state, commit}) => {
        const entity = `${path(user.uid)}`
        const leads = await db.getList(entity)
        commit('setLeads', leads)
    },

    deleteLeadFromDB:async  ({commit}, params) => {
        const entity = `${path(user.uid)}/${params}`
        await db.remove(entity, params)
        commit('removeLead', params)
    },

}
