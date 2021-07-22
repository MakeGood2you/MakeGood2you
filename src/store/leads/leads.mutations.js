
export default {

    setLeads: ((state, leads) => state.leads = leads),

    editLead: ((state, event) => {
        const index = state.events.findIndex(p => p.id === event.id)
        state.events.splice(index, 1, event)
    }),

    removeLead: ((state, phoneNumber) => {
        const index = state.leads.findIndex(p => p.phoneNumber === phoneNumber)
        state.leads.splice(index, 1)
    }),

    insertLead: ((state, event) => {
        state.events.push(event)
    }),


}
