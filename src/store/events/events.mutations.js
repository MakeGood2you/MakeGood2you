
export default {

    setEvents: ((state, events) => state.events = events ),

    setLeads: ((state, leads) => state.leads = leads ),

    setEventId: ((state, eventId)=> state.eventId = eventId),

    setEventQr: ((state, qrCode)=> state.qrCode = qrCode),

    setEvent: ((state, event)=> state.event = event),

    setEditedEventId: ((state, id) => state.editedEventId= id),

    setEditedEvent: ((state,event) => state.editedEvent= event),

    resetEditedEventId: ((state) => state.editedEventId= ''),

     resetEditedEvent:((state,) =>{
        for (const key in state.editedEvent){
            state.editedEvent[key]=''
        }
        delete state.editedEvent.id;
    }),

    editEvent: ((state, event)=>{
        const index = state.events.findIndex(p => p.id === event.id)
        state.events.splice (index, 1, event)
    }),

    deleteEvent: ((state, id)=>{
        const index = state.events.findIndex(p => p.id === id)
        state.events.splice (index, 1)
    }),

    insertEvent:((state, event)=>{
        state.events.push(event)
    }),

    setDate: ((state, sameDate) => state.sameDate = sameDate ),

    setContacts: ((state, contacts) => state.contacts = contacts ),

    setContactEvent: ((state, contactsEvent)=> state.contactsEvent = contactsEvent),

    setQrTF:((state, qrTF)=> state.qrTF = qrTF),

    setQrF:((state, qrF)=> state.qrF = qrF),

    setContact: ((state, contact)=> state.contact = contact),

    setEditedContactId: ((state, id) => state.editedContactId= id),

    resetEditedContact:((state) =>{
        for (const key in state.editedContact){
            state.editedContact[key]=''
        }
        delete state.editedContact
    }),

    editContact: ((state, contact)=>{
        const index = state.contacts.findIndex(p => p.id === contact.id)
        state.contacts.splice (index, 1, contact)
    }),

    deleteContact: ((state, id)=>{
        const index = state.contacts.findIndex(p => p.id === id)
        state.contacts.splice (index, 1)
    }),

    insertContact:((state, contact)=>{
        state.contacts.push(contact)
    })
}
