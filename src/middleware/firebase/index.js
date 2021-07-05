import firebase from 'firebase/app';
import firebaseMessaging from 'firebase/messaging'
import auth from 'firebase/auth';

firebase.initializeApp ({
    apiKey: "AIzaSyC0KwyR8ujADw3j7MyoWNWsIaaP_NlnphY",
    authDomain: "osher-project.firebaseapp.com",
    databaseURL: "https://osher-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "osher-project",
    storageBucket: "osher-project.appspot.com",
    messagingSenderId: "1026088270281",
    appId: "1:1026088270281:web:b1ed5527a0438c2dbe5018"
});


const messaging = firebase.messaging();

export default  {
 firebase,
 messaging,

}
