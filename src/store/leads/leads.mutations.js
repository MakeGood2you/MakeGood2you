
export default {

    setLeads: ((state, leads) => state.leads = leads),

    editLead: ((state, event) => {
        const index = state.events.findIndex(p => p.id === event.id)
        state.events.splice(index, 1, event)
    }),

    deleteLead: ((state, id) => {
        const index = state.events.findIndex(p => p.id === id)
        state.events.splice(index, 1)
    }),

    insertLead: ((state, event) => {
        state.events.push(event)
    }),


}
