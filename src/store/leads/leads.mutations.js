
export default {

    setLeads: ((state, leads) => state.leads = leads),

    removeLead: ((state, phoneNumber) => {
        const index = state.leads.findIndex(p => p.phoneNumber === phoneNumber)
        state.leads.splice(index, 1)
    }),

    editLead: ((state, lead) => {
        const index = state.leads.findIndex(p => p.phoneNumber === lead.phoneNumber)
        state.leads.splice(index, 1, lead)
    }),


}
