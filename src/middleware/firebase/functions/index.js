import firebaseInstance from '../index'

export default {
    callableFunction
}

async function callableFunction(body, funcName) {
    const checkPayment = await firebaseInstance.firebase
        .app()
        .functions()
        .httpsCallable(funcName);// options.body.name /// Function api Name
    const result = await checkPayment(body);// options.body
    return result.data
}


// functions Names:
// validatePayment