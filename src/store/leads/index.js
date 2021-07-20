import actions from './leads.actions'
import getters from './leads.getters'
import mutations from './leads.mutations'
import state from './leads.state'

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}