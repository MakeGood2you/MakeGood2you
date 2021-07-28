import storage from "../../middleware/firebase/storage";
import db from "../../middleware/firebase/database/api";
import 'firebase/storage';

import {getUserFromLocalStorage} from '../../middleware/utils'

let tableName = 'events'
const path = (uid) => `users/${uid}/data/${tableName}`

export default {

    getLimitCounter: async ({stat, commit, getters}, options) => {

        let entity = `${path(window.user.uid)}/${options.eid}`
        const storageRef = await storage.getStorageRef(entity)
        let listResult = await storageRef.listAll()//// check the object
        let length = listResult.items.length
        commit('setImagesCounter', length)
    },

    changePermissionValue: async ({state, commit}, eid) => {

        const entity = `${path(window.user.uid)}/${eid}/isOpen`
        const index = state.events.findIndex(event => event.id === eid)
        let isOpen = !state.events[index].isOpen// change the value
        await db.set(entity, isOpen)
        commit('changePermissionState', {index, isOpen})
    },

    setQrF: async ({stat, commit}, eid) => {
        if (!window.user) return

        const entity = `${path(window.user.uid)}/${eid}/QR`
        const document = false
        await db.set(entity, document)
        commit('setQrF', document)
    },

    setQrTF: async ({state, commit}, eid) => {
        const index = state.events.findIndex(event => event.id === eid)
        let QR = !state.events[index].QR
        commit('setQr', {QR, index})
        return QR
        // const entity = `${path(user.uid)}/${eid}/QR`
        // await db.set(entity, QR) // we not need to update
    },
    ///database///

    updatePhotosToFirebase: async ({commit}, options)=>{
        const entity = `${path(window.user.uid)}/${options.eid}/photos/${options.key}/isDownload`
        await db.set(entity, true);
        commit('updatePhoto', {isDownload: true, key: options.key, id: options.eid})
    },

    getEvents: async ({commit}) => {
        if (!window.user) return
        const entity = path(window.user.uid)
        const events = await db.getList(entity);
        console.log(events)
        commit('setEvents', events)
    },

    getEventById: async ({state, commit}, eid) => {
        const entity = `${path(window.user.uid)}/${eid}`
        const event = await db.get(entity);
        console.log(event)
        commit('setEvent', event)
    },
 getPhotos: async ({state, commit}, eid) => {
     const entity = `${path(window.user.uid)}/${eid}/photos`
     const photos = await db.getList(entity);
        console.log(photos)
        commit('setPhotos', photos)
    },

    deleteEvent: async ({state, commit}, eid) => {
        const entity = `${path(window.user.uid)}/${eid}`
        await db.remove(entity);
        commit('deleteEvent', eid)
    },


    updateEvent: async ({state, commit}, event) => {
        const entity = `${path(window.user.uid)}/${event.id}`
        //save in database
        const res = await db.update(entity, event)
        console.log(res)
        //save in store
        commit('editEvent', event)

    },

    insertEvent: async ({state, commit}) => {
        const event = {}
        Object.assign(event, state.editedEvent)
        //save in database
        event.id = `${new Date().getTime()}`
        event.canvas = `https://picpic-guests.web.app/#/${window.user.uid}/${event.id}`

        const entity = `${path(window.user.uid)}/${event.id}`
        await db.set(entity, event)
        console.log(event)
        commit('resetEditedEvent')
        commit('insertEvent', event)
        return event.id
    },

    setEditEventById: async ({state, commit}, eid) => {
        let event = null;
        const entity = `${path(window.user.uid)}/${eid}`
        if (state.events.length) {
            event = state.events.find(event => event.id === eid)
        } else {
            event = await db.get(entity)
        }
        commit('setEditedEvent', event);
    },

}
