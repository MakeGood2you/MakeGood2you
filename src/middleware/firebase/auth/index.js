import firebaseInstance from '../../firebase'

export default {
    loginProvider,
    loginWithMailAndPass,
    registerWithPassAndEmail,
    signOut,updatePassword
}

async function loginProvider(provider) {
    const googleAuthProvider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
    const FacebookAuthProvider = new firebaseInstance.firebase.auth.FacebookAuthProvider();
    provider === 'facebook' ? provider = FacebookAuthProvider : provider = googleAuthProvider
    return await firebaseInstance.authentication()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            return {
                uid: user.uid,
                email: user.email,
                isNewUser: result.additionalUserInfo.isNewUser
            }
            // if (result.additionalUserInfo.isNewUser) {
            // }

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.business.AuthCredential type that was used.
            var credential = error.credential;
            console.error(errorCode)
            console.error(errorMessage)
            console.error(email)
            console.error(credential)
            // ...
        });
}

function loginWithMailAndPass(options) {
    return firebaseInstance.authentication().signInWithEmailAndPassword(options.email, options.password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            return {
                uid: user.uid,
                email: user.email
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode)
            console.error(errorMessage)
            return errorMessage
        });
}

function registerWithPassAndEmail(user) {
    return firebaseInstance.firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(async (result) => {
            // Signed in
            var user = result.user;
            // ...
            window.user = result.user;
            return {
                uid: user.uid,
                email: user.email,
                isNewUser: result.additionalUserInfo.isNewUser
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode)
            console.error(errorMessage)
            // ..
            return errorMessage
        });
}

function signOut() {
    const self = this
    return firebaseInstance.firebase.auth().signOut().then( () => {
        // Sign-out successful.
         self.setUser(null)
    }).catch((error) => {
        // An error happened.
    });
}

export async function updatePassword(newPassword) {
    const user = firebaseInstance.authentication().currentUser;
    // const newPassword = getASecureRandomPassword();

    user.updatePassword(newPassword).then((res) => {
        // Update successful.
        console.log(res)
        return ' Update successful.'
    }).catch((error) => {
        console.log(error)
        // An error ocurred
        // ...
    });
}