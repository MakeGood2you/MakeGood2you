import firebaseInstance from '../';


function create(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).push(options.event);
}

function remove(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.id}`).remove();
}

function update(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.id}`).update(options.item);
}

function getItemById(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.id}`).once('value')
        .then(result => {
            return result.val()
        })
}

async function setOpen(options) {
        return await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.id}/isOpen`).set(options.params)
}

async function checkOpen(options) {
    return await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.id}/isOpen`).once('value').then((res)=>{
        return res.val()
    })
}


export default {
    create,
    remove,
    getItemById,
    setOpen,
    checkOpen,
    update,
}
