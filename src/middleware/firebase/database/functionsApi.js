import firebaseInstance from '../'
export default {
    validatePayment
}

async function validatePayment(options) {
    debugger
    const checkPayment = await firebaseInstance.firebase
        .app()
        .functions()
        .httpsCallable("validatePayment");
    const result = await checkPayment(options);
    debugger
    return result
}