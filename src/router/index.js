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
    const isAuthenticated = getUserFromLocalStorage() ? true : false
    let condition = to.name !== 'Login' && to.name !== 'Registration' && to.name !== 'Forgot'
    if (to.name !== 'Login' && to.name !== 'Registration' && to.name !== 'Forgot' && !isAuthenticated) {
        console.log('is user  not login ')
        next({name: 'Login'})
    } else {
        if (to.name === 'Login' && isAuthenticated){
            debugger
            next({name: 'Home'})
        }
        next()
    }

    if (to.name !== 'Login' && to.name !== 'Registration' && to.name !== 'Forgot' && to.name !== 'Payment') {
        const isUserPay = await functions.callableFunction({}, 'payment-validatePayment')
        if (!isUserPay) {
            next({name: 'Payment'})
            console.log('is user pay ?', isUserPay)
        }
    } else next()

})
export default router
