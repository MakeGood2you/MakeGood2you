import firebaseInstance from '../';
export default {
    setFileByRef
}
async function setFileByRef(options) {// (entity,file) options
    debugger
    return firebaseInstance.firebase
        .storage()
        .ref(options.entity).put(options.file)
}