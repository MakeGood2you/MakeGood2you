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
    console.log('is user pay router Guard?', isPayState)
    if (to.meta.authUserIsPayment && isAuthenticated && !registerRoutes.includes(to.name) && isPayState) {
        return next()
    }
    if (!to.meta.authUserIsPayment && !isAuthenticated && registerRoutes.includes(to.name) ) {
        return next()
    }

    if (isAuthenticated && !to.meta.authUserIsPayment && !registerRoutes.includes(to.name)) {
        return next()
    } else {
        if (registerRoutes.includes(to.name) && isAuthenticated && isPayState) {
            debugger
            return next({name: 'Home'})
        }
        if (to.meta.authUserIsPayment && isAuthenticated) {
        debugger
            if (!isPayState) {
                const isUserPay = await functions.callableFunction({}, 'payment-validatePayment')
                console.info('is user pay ?', isUserPay)
                return isUserPay ? next() : next({name: 'Payment'})
            }
            debugger
            return next()
        }
        // if (!isAuthenticated)
        return  next({name: 'Login'})
    }
})
export default router
