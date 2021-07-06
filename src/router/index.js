import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import welcome from "../views/welcome";
import leads from "@/views/leads";

Vue.use(VueRouter)

const routes = [
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/leads',
        name: 'leads',
        component: leads
    },
    {
        path: '/welcome',
        name: 'welcome',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/welcome.vue')
    },
    {
        path: '/',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Register
    },
    {
        path: '/event-page/:eid',
        name: 'EventPage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/EventPage.vue')
    },

    {
        path: '/event-page/:eid/pictureAdded',
        name: 'pictureAdded',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/pictureAdded.vue'),

    },

    {
        path: '/register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
    },
    {
        path: '/item/:id',
        name: 'Item',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Item.vue')
    },
    {
        path: '/payment',
        name: 'payment',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/payment.vue')
    },
    {
        path: '/registration',
        name: 'registration',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/registration.vue')
    },
    {
        path: '/forgot',
        name: 'forgot',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/forgot.vue')
    },

]

const router = new VueRouter({
    routes
})

export default router
