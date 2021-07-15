import database from "../../middleware/firebase/database";
import storage from "../../middleware/firebase/storage";
import db from "../../middleware/firebase/database/api";
import 'firebase/storage';

import {getUserFromLocalStorage} from '../../middleware/utils'

const user = getUserFromLocalStorage()

export default {

    ///updated database///
    // test: async ({}) =>{
    //     let childRef2 = [your firebase storage path]
    //     storageRef.child(UserDetails.username+"profilepic.jpg");
    //     Bitmap bmp = MediaStore.Images.Media.getBitmap(getContentResolver(), filePath);
    //     ByteArrayOutputStream baos = new ByteArrayOutputStream();
    //     bmp.compress(Bitmap.CompressFormat.JPEG, 25, baos);
    //     byte[] data = baos.toByteArray();
    //     //uploading the image
    //     UploadTask uploadTask2 = childRef2.putBytes(data);
    //     uploadTask2.addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
    //     @Override
    //         public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
    //             Toast.makeText(Profilepic.this, "Upload successful", Toast.LENGTH_LONG).show();
    //         }
    //     }).addOnFailureListener(new OnFailureListener() {
    //     @Override
    //         public void onFailure(@NonNull Exception e) {
    //             Toast.makeText(Profilepic.this, "Upload Failed -> " + e, Toast.LENGTH_LONG).show();
    //         }
    //     });`
    // },
    getLimitCounter: async ({stat, commit, getters}, options) => {
        let entity = `users/${options.uid}/events/${options.eid}`
        const storageRef = await storage.getStorageRef(entity)
        let listResult = await storageRef.listAll()//// check the object
        let length = listResult.items.length
        commit('setImagesCounter', length)
    },
    changePermissionValue: async ({stat, commit}, id) => {
        const entity = `users/${window.user.uid}/data/events/${id}/isOpen`
        const document = await db.get(entity)
        await db.set(entity, !document)
        commit('addPermission', document)
    },

    setQrF: async ({stat, commit}, id) => {
        const entity = `users/${window.user.uid}/data/events/${id}/QR`
        const document = false
        await db.set(entity, document)
        commit('setQrF', document)
    },
    setQrTF:async ({stat,commit},id)=>{
        const entity = `users/${window.user.uid}/data/events/${id}/QR`
        const document = await db.get(entity)
        await db.set(entity, !document)
        commit('setQrTF', document)
        return document
    },
    ///database///

    welcomeFunction: async  ({}, details) => {
        await database.setParams({details})
    },

    getLeads: async ({state, commit}) => {
        const entity = `users/${user.uid}/data/leads`
        const leads = await db.get(entity)
        commit('setLeads', leads)
        return leads
    },


    setPackagePayment: async ({state, commit},paymentMethod) => {
        await database.setPackage({paymentMethod})
    },
    checkPackage: async () => {
        const pack= await database.checkPackage()
        return pack
    },


    checkLastDayAuth: async () => {
        const last = await database.checkLastDayForAuth()
        return last
    },
    checkLastDayForUse: async ({state, commit},valid)=>{
        const LastDayForUse = await database.checkLastDay({valid})
        if (LastDayForUse === false){
            return false
        }
        console.log(LastDayForUse)
    },
    checkPayTrue: async ()=>{
        const checkWelcomePay = await database.checkPayment()
        if (checkWelcomePay === false){
            return false
        }
        console.log(checkWelcomePay)
    },
    updatePhotosToFirebase: async ({commit}, options)=>{
        const entity = `users/${window.user.uid}/data/events/${options.eid}/photos`
       await db.create(entity,options.url);
    },
    getPhotosToFirebase: async ({},eid)=>{
        var photos = await database.getPhotos({entity: 'events', eventId: eid });
        return photos
    },
    getEvents: async ({commit}) => {
        const events = await database.read({entity: 'events'});
        commit('setEvents', events)
    },

    getEventsById: async ({state, commit}) => {

        const event = await database.getItemById({entity: 'events', id: state.eventId});
        commit('setEvent', event)

    },
    setIsOpen: async ({}, obj) => {
       await database.setOpen({entity: 'events', params: obj.params, id: obj.id });
    },
    whatIsHisBulian: async ({}, id) => {
        const isOpen= await database.checkOpen({entity: 'events', id: id })
        return isOpen
    },

    deleteEvent: async ({state, commit}, id) => {

        await database.remove({entity: 'events', id});

        const eventId = id;

        commit('resetEditorEventId')

        commit('deleteEvent', eventId)

    },
    deleteLeadFromDB:async  ({commit}, params) => {
        await database.deleteLeadInDB({params})

    },

    updateEvent: async ({state, commit}) => {

        const event = {}

        Object.assign(event, state.editedEvent)
        event.id = state.editedEventId;

        //save in database
        await database.update({entity: 'events', id: event.id, item: event})

        //save in store
        commit('resetEditedEvent')
        commit('resetEditedEventId')
        commit('editEvent', event)

    },

    insertEvent: async ({state, commit}) => {

        const event = {}

        Object.assign(event, state.editedEvent)

        //save in database
        let qrCode = `https://picpic-guests.web.app/#/${user.uid}/`
        event.canvas = qrCode
        event.id = (await database.create({entity: 'events', event})).key
        event.canvas = event.canvas + event.id


        //save in store
        commit('resetEditedEvent')
        commit('setEventId', event.id)
        commit('setEventQr', qrCode)
        commit('insertEvent', event)


    },
    setInfoData: async ({},info) => {
      await database.setInfo({info})
    },
    setEditEventById: async ({state, commit}) => {

        let event = {};
        if (state.events.length && state.events.find(event => event.id === state.editedEventId)) {
            event = state.events.find(event => event.id === state.editedEventId);
        } else {
            event = await database.getItemById({entity: 'events', id: state.editedEventId})
        }
        commit('setEditedEvent', event);
    },

}
