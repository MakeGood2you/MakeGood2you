import Vue from 'vue'
import VueRouter from 'vue-router'
import {getUserFromLocalStorage} from "../middleware/utils";
// import store from '../store';
import businesses from '../store/businesses';
import {mapActions} from "vuex";
import routes from './routes'
import functions from "../middleware/firebase/functions/index";

Vue.use(VueRouter)


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */


const router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes
})
// to.name === 'Login' || to.name === 'Registration' || to.name === 'Forgot'
router.beforeEach(async (to, from, next) => {
    const registerRoutes = ['Login', 'Registration', 'Forgot']
    const isAuthenticated = getUserFromLocalStorage()
    let isPayState = businesses.state.isPay
    console.log('is user pay ?', isPayState)
    if (to.meta.authUserIsPayment && isAuthenticated && !registerRoutes.includes(to.name) && isPayState) {
        return next()
    } else {
        if (isAuthenticated && to.name === 'Payment') {
            debugger
            return next()
        }
        debugger
        return next({name: 'Home'})

    }
})
export default router
// if (isAuthenticated && !to.meta.authUserIsPayment && registerRoutes.includes(to.name)) {
//     if (!isPayState) {
//         debugger
//         const isUserPay = await functions.callableFunction({}, 'payment-validatePayment')
//         console.info('is user pay ?', isUserPay)
//         return isUserPay ? next() : next({name: 'Payment'})
//     }
// }
// if (isAuthenticated && to.name === 'Payment') {
//     debugger
//     return next()
// } else {
//
//     if (['Login', 'Registration', 'Forgot'].includes(to.name) && !isAuthenticated) {
//         return next()
//     }
//     if (to.meta.authUserIsPayment && isAuthenticated) {
//         if (!isPayState) {
//             debugger
//             const isUserPay = await functions.callableFunction({}, 'payment-validatePayment')
//             console.info('is user pay ?', isUserPay)
//             return isUserPay ? next() : next({name: 'Payment'})
//         }
//         return next()
//     }
//     next({name: 'Login'})