import Vue from 'vue'
import VueRouter from 'vue-router'
import {getUserFromLocalStorage} from "../middleware/utils";
import store from '../store';
import businesses from '../store/businesses';

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
    const isAuthenticated = getUserFromLocalStorage() ? true : false
    let isPayState = businesses.state.isPay

    if (to.name === 'Login' || to.name === 'Registration' || to.name === 'Forgot' && isAuthenticated && isPayState) {

        next({name: 'Home'})
    } else {
        if (to.name !== 'Login' && to.name !== 'Registration' && to.name !== 'Forgot') {
            if (!isAuthenticated) {
                next({name: 'Login'})
                console.log('is user  not login ')
            } else {
                debugger
                if (to.name !== 'Payment' && !isPayState) {
                    const isUserPay = await functions.callableFunction({}, 'payment-validatePayment')
                    debugger
                    if (!isUserPay) {
                        debugger
                        next({name: 'Payment'})
                        console.log('is user pay ?', isPayState)
                    }
                }
            }

        }
        next()
    }
})
export default router
