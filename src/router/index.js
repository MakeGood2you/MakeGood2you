import Vue from 'vue'
import VueRouter from 'vue-router'

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
    routes
})

export default router
