import actions from './events.actions'
import getters from './events.getters'
import mutations from './events.mutations'
import state from './events.state'

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}