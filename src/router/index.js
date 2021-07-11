import Vue from 'vue'
import VueRouter from 'vue-router'
import {getUserFromLocalStorage} from "../middleware/utils";

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
router.beforeEach(async (to, from, next) => {
    const isAuthenticated = getUserFromLocalStorage() || false
    if (to.name !== 'Login' && to.name !== 'Registration' && to.name !== 'Forgot' && !isAuthenticated) {
        console.log('is user  not login ')
        next({name: 'Login'})
    } else next()
    const isUserPay = await functions.callableFunction({}, 'payment-validatePayment')
    if (to.name !== 'Login' && to.name !== 'Registration' &&
        to.name !== 'Forgot' && to.name !== 'Payment' && !isUserPay) {
        console.log('is user pay ?', isUserPay)
        next({name: 'Payment'})
    } else next()

    // else if (to.name === 'Payment' && isAuthenticated) {
    //     next()
    // } else {
    //     if (!isAuthenticated) {
    //         next({name: 'Login'})
    //
    //     } else {
    //         return functions.callableFunction({isAuthenticated}, 'payment-validatePayment').then(isUserPay => {
    //             console.log('is user pay', isUserPay)
    //             if (to.meta.authUserIsPayment === false && isUserPay === false) {
    //                 next({name: 'Payment'})
    //             } else {
    //                 next()
    //             }
    //         }).catch(err => {
    //             console.log(err)
    //             if (isAuthenticated) {
    //                 next({name: 'Login'})
    //             }
    //         })
    //     }
    // }
})
export default router
