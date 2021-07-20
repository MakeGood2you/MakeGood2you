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
    let isUserPay = businesses.state.isPay

    // let condition = to.name !== 'Login' && to.name !== 'Registration' && to.name !== 'Forgot'
    if (to.name === 'Login' || to.name === 'Registration' || to.name === 'Forgot' && isAuthenticated) {
        debugger
        next({name: 'Home'})
    } else {
        if (to.name !== 'Login' && to.name !== 'Registration' && to.name !== 'Forgot' && !isAuthenticated) {
            debugger
            console.log('is user  not login ')
            next({name: 'Login'})
        }

        if (to.name === 'Payment' && isUserPay) {
            debugger
            next({name: 'Home'})
        }

        if (to.name !== 'Login' && to.name !== 'Registration' && to.name !== 'Forgot' && to.name !== 'Payment') {
            debugger
            if (!isUserPay) {
                const isCheck = await functions.callableFunction({}, 'payment-validatePayment')
                if (!isCheck) {
                    debugger
                    next({name: 'Payment'})
                    console.log('is user pay ?', isUserPay)
                }
            }
        }
        next()

    }

})
export default router
