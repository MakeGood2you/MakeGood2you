import firebaseInstance from '../';

async function setTerm(uid) {
    debugger
    await firebaseInstance.firebase.database()
        .ref(`users/${uid}/data/terms/confirmed`)
        .set(true)
}

async function setPackage(options) {
    debugger
   return await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/package/selected`).set(`${options.paymentMethod}`)
}

async function checkTermService(uid) {
    const check = await firebaseInstance.firebase.database().ref(`users/${uid}/data/terms/confirmed`).once('value').then((res) => {
        return res.val()
    });
    return check
}

async function checkPackage() {
    const pack = await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/package/selected`).once(`value`).then((res) => {
        return res.val()
    })
    return pack
}

function checkLastDay(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/package/validation`).once('value').then((res) => {
        var validation = res.val()
        let date = new Date();
        let ye = date.toLocaleString('en', {year: 'numeric'});
        let mo = date.toLocaleString('en', {month: '2-digit'});
        let da = date.toLocaleString('en', {day: '2-digit'});
        var todayDay = `${ye}-${mo}-${da}`

        if (validation === null) {

            let date = new Date();

            console.log(date.setDate(date.getDate() + options.valid));

            let ye = date.toLocaleString('en', {year: 'numeric'});
            let mo = date.toLocaleString('en', {month: '2-digit'});
            let da = date.toLocaleString('en', {day: '2-digit'});
            var validationDate = `${ye}-${mo}-${da}`
            console.log(validationDate)

            return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/package/validation`).set(validationDate)
        }
        if (validation > todayDay) {
            return true
        }
        if (validation <= todayDay) {
            return false
        }
    });
}

function checkLastDayForAuth() {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/package/validation`).once('value').then((res) => {
        var validation = res.val()
        let date = new Date();
        let ye = date.toLocaleString('en', {year: 'numeric'});
        let mo = date.toLocaleString('en', {month: '2-digit'});
        let da = date.toLocaleString('en', {day: '2-digit'});
        var todayDay = `${ye}-${mo}-${da}`

        if (validation === null) {
            return false
        }
        if (validation > todayDay) {
            return true
        }
        if (validation <= todayDay) {
            firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/package/validation`).remove().then(() => {
                return false
            })
        }
    });
}

function isUserPay() {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/package/validation`).once('value').then((res) => {
       return res.val()


    });
}

function read(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).once('value')
        .then(res => {
            const arr = []
            const map = res.val();
            for (const key in map) {
                const event = map[key];
                event.id = key;
                arr.push(event)
            }
            return arr
        })
}

function create(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).push(options.event);
}

function setDataLink(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.eventId}/canvas`).set(options.qrCode);
}

function setInfo(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/businessInfo`).set(options.info);
}

function pushPhotos(options) {
    return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.eventId}/photos`).once('value').then((res) => {
        var photoNameExist = res.val()
        var x = false
        if (photoNameExist === null) {
            return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.eventId}/photos`).push(options.photoName);
        } else {
            for (var photo in photoNameExist) {
                if (options.photoName === photoNameExist[photo]) {
                    x = true
                }
            }
            if (x === false) {
                return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.eventId}/photos`).push(options.photoName);
            }
        }
    })
}

async function getPhotos(options) {
    var info = await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.eventId}/photos/`).once('value').then((res) => {
        return res.val()
    })
    return info
}

async function getLeadsDetails() {
    const info = await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/leads/`).once('value').then((res) => {
        return res.val()
    })
    return info
}
async function deleteLeadInDB(options) {
     await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/leads/${options.params}`).remove();
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

async function setParams(options) {
    return await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/package/paymentDetails`).set(options.details)
}

async function setOpen(options) {
        return await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.id}/isOpen`).set(options.params)
}

async function checkOpen(options) {
    return await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}/${options.id}/isOpen`).once('value').then((res)=>{
        return res.val()
    })
}

async function checkPayment() {
    return await firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/package/paymentDetails`).once('value').then((res=>{
        if (res.val()===null){
            return false
        }else {
            return true
        }
    }))
}


export default {
    setTerm,
    setPackage,
    read,
    create,
    setDataLink,
    remove,
    getItemById,
    setOpen,
    checkOpen,
    update,
    setParams,
    checkLastDay,
    checkTermService,
    checkPackage,
    checkLastDayForAuth,
    setInfo,
    getLeadsDetails,
    deleteLeadInDB,
    pushPhotos,
    getPhotos,
    checkPayment
}
