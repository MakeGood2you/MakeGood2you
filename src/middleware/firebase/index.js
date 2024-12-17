import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
});

const authentication = () => {
    return firebase.auth()
}

authentication().onAuthStateChanged(async function (user) {
    if (user) {
        window.user = user;
        console.log(user)
    } else {
        // No user is signed in.
        console.log(user, ' no user')
    }
});
export default {
    authentication,
    firebase,
}
