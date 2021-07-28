import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

firebase.initializeApp({
    apiKey: "AIzaSyC0KwyR8ujADw3j7MyoWNWsIaaP_NlnphY",
    authDomain: "osher-project.firebaseapp.com",
    databaseURL: "https://osher-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "osher-project",
    storageBucket: "osher-project.appspot.com",
    messagingSenderId: "1026088270281",
    appId: "1:1026088270281:web:b1ed5527a0438c2dbe5018"
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
    // messaging,

}
