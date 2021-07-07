import actions from './businesses.actions'
import getters from './businesses.getters'
import mutations from './businesses.mutations'
import state from './businesses.state'

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}