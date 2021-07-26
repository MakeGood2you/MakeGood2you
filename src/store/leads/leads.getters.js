export default {
    getFilterLeads: (state) => (isNewLeads) => {
        let filterLeads = []
        const leads = [...state.leads]
        if (isNewLeads) {
            filterLeads = leads.filter(lead => lead.isNewLead)
        } else {
            filterLeads = leads.filter(lead => !lead.isNewLead)
        }
        return filterLeads
    }

}