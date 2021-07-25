
export default {
    setLocalImages: (state, setPics) => {
        state.localPics = [...state.localPics]
        Array.prototype.push.apply(state.localPics, setPics)
        // this.localPics = this.localPics.concat(setPics
    },

    setImagesCounter: (state, length) => (state.imagesCounter = length),
    setImages: (state, data) => (state.pics = data),
    setEvents: ((state, events) => state.events = events),

    setCountPhoto: ((state, count) => state.countPhoto = count),

    changePermissionState: ((state, options) => {
        const event = state.events[options.index]
        event.isOpen = options.isOpen
        state.events = [...state.events]
    }),

    setQr: (state, options) => {
        const event = state.events[options.index]
        event.QR = options.QR
        state.events = [...state.events]
    },

    updatePhoto: ((state, options) => {
        state.event.photos[options.key].isDownload = options.isDownload
        debugger
        state.event = {...state.event}
    }),


    setEventId: ((state, eventId) => state.eventId = eventId),

    setEventQr: ((state, qrCode) => state.qrCode = qrCode),

    setEvent: ((state, event) => {
        state.event = event
    }),
    photos: ((state, photos) => {
        state.photos = photos
    }),

    setEditedEventId: ((state, id) => state.editedEventId = id),

    setEditedEvent: ((state, event) => state.editedEvent = event),

    resetEditedEventId: ((state) => state.editedEventId = ''),

    resetEditedEvent: ((state,) => {
        for (const key in state.editedEvent) {
            state.editedEvent[key] = ''
        }
        delete state.editedEvent.id;
    }),

    editEvent: ((state, event) => {
        const index = state.events.findIndex(p => p.id === event.id)
        state.events.splice(index, 1, event)
    }),

    deleteEvent: ((state, id) => {
        const index = state.events.findIndex(p => p.id === id)
        state.events.splice(index, 1)
    }),

    insertEvent: ((state, event) => {
        if (!state.events){
            state.events = []
        }
        state.events.push(event)
    }),

    setDate: ((state, sameDate) => state.sameDate = sameDate),

    setContacts: ((state, contacts) => state.contacts = contacts),

    setContactEvent: ((state, contactsEvent) => state.contactsEvent = contactsEvent),


    setQrF: ((state, qrF) => state.qrF = qrF),

    setContact: ((state, contact) => state.contact = contact),

    setEditedContactId: ((state, id) => state.editedContactId = id),

    resetEditedContact: ((state) => {
        for (const key in state.editedContact) {
            state.editedContact[key] = ''
        }
        delete state.editedContact
    }),

    editContact: ((state, contact) => {
        const index = state.contacts.findIndex(p => p.id === contact.id)
        state.contacts.splice(index, 1, contact)
    }),

    deleteContact: ((state, id) => {
        const index = state.contacts.findIndex(p => p.id === id)
        state.contacts.splice (index, 1)
    }),

    insertContact:((state, contact)=>{
        state.contacts.push(contact)
    })
}
