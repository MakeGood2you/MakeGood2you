
export default {

    setLeads: ((state, leads) => state.leads = leads),

    // editLead: ((state, lead) => {
    //     const index = state.events.findIndex(p => p.id === event.id)
    //     state.events.splice(index, 1, lead)
    // }),

    removeLead: ((state, phoneNumber) => {
        const index = state.leads.findIndex(p => p.phoneNumber === phoneNumber)
        state.leads.splice(index, 1)
    }),

    editLead: ((state, lead) => {
        const index = state.leads.findIndex(p => p.phoneNumber === lead.phoneNumber)
        debugger
        state.leads.splice(index, 1, lead)
    }),


}
