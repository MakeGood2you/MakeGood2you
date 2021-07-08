import Vue from 'vue'
import VueRouter from 'vue-router'
import {getUserFromLocalStorage} from "../middleware/utils";

import routes from './routes'
// import firebaseInstance from "src/middleware/firebase";

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
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = getUserFromLocalStorage() || false
//     if (to.name !== 'Login' || !isAuthenticated) {
//         console.log('is user  not login ')
//         next('/')
//         debugger
//     }
    // else if (to.name === 'Payment' && isAuthenticated) {
    //     debugger
    //     next()
        // } else {
        //     if (!isAuthenticated) {
        //         next({name: 'Login'})
        //
        //     } else {
        //         debugger
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
// })
export default router
