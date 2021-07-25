
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

    setComment: ((state, options) => {
        const index = state.leads.findIndex(p => p.phoneNumber === options.phoneNumber)
       if (!state.leads[index]['comments']){
           state.leads[index]['comments'] = {}
       }
        state.leads[index]['comments'][`${options.cid}`] = options.comment
        state.leads = [...state.leads]
    }),


}
