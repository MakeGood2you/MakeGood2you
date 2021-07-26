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
    setComment: async ({state, commit}, options) => {

        const lead = {...options.lead}
        if (!lead.comments) {
            lead.comments = {}
        }
        const cid = new Date().getTime()
        lead.comments[cid] = options.comment
        commit('editLead', lead)
        const entity = `${path(lead.uid)}/${lead.phoneNumber}/comments/`
        await db.set(entity, lead.comments)

    },
    moveToOldLeadsAction: async ({state, commit}, lead) => {
        const newLead = {...lead}
        newLead.isNewLead = !newLead.isNewLead
        commit('editLead', newLead)
        const entity = `${path(lead.uid)}/${lead.phoneNumber}/isNewLead`
        await db.set(entity, newLead.isNewLead)
        debugger
        // commit('setIsNewLead', options.isNewLead)

    },
}
