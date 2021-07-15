import firebaseInstance from '../';
export default {
    getStorageRef
}
async function getStorageRef(entity) {// (entity,file) options
    return firebaseInstance.firebase
        .storage()
        .ref(entity)
}