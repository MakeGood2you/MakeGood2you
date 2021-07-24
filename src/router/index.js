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
    debugger
    if (isAuthenticated && !to.meta.authUserIsPayment && registerRoutes.includes(to.name)) {
        debugger
        if (!isPayState) {
            debugger
            const isUserPay = await functions.callableFunction({}, 'payment-validatePayment')
            console.info('is user pay ?', isPayState)
            return isUserPay ? next() : next({name: 'Payment'})
        }
    }
    if (isAuthenticated && !to.meta.authUserIsPayment) {
        debugger
        return next()
    } else {

        if (['Login', 'Registration', 'Forgot'].includes(to.name) && !isAuthenticated) {
            debugger
            return next()
        }
        if (to.meta.authUserIsPayment && isAuthenticated) {
            debugger
            if (!isPayState) {
                debugger
                const isUserPay = await functions.callableFunction({}, 'payment-validatePayment')
                console.info('is user pay ?', isPayState)
                return isUserPay ? next() : next({name: 'Payment'})
            }
            debugger
            return next()
        }
        debugger
        next({name: 'Login'})

    }
})
export default router
// if (isAuthenticated && !isPayState && to.meta.authUserIsPayment) {
//     next({name: 'Payment'})
// }
// debugger
// if (to.name !== 'Login' && to.name !== 'Registration' && to.name !== 'Forgot'  ) {
//     if (!isPayState && to.meta.authUserIsPayment) {
//         if (!isUserPay) {
//             debugger
//             next({name: 'Payment'})
//             console.log('is user pay ?', isPayState)
//         }
//     }
//     debugger
//     next({name: 'Login'})
//     console.log('is user  not login ')
// } else next()
