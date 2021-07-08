// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/auth/Register.vue'
// import welcome from "../views/welcome";
import leads from "../views/leads";
const routes = [
    {path: '/registration', name: 'registration', component: () => import(/* webpackChunkName: "about" */ '../views/auth/registration.vue')},
    {path: '/', name: 'Register', component: Register, meta: {authUserPayment: false}},
    {path: '/forgot', name: 'forgot', component: () => import(/* webpackChunkName: "about" */ '../views/forgot.vue'), meta: {authUserPayment: false}},

    {path: '/payment', name: 'payment', component: () => import(/* webpackChunkName: "about" */ '../views/payment.vue'), meta: {authUserPayment: false}},
    {path: '/welcome', name: 'welcome', component: () => import('../views/welcome.vue'),},

    {path: '/Home', name: 'Home', component: Home, meta: {authUserPayment: true}},
    {path: '/add-business-details', name: 'addBusinessDetails', component: () => import('../components/business/AddBusinessDetails.vue'), meta: {authUserPayment: true}},
    {path: '/leads', name: 'leads', component: leads, meta: {authUserPayment: true}},

    {path: '/event-page/:eid', name: 'EventPage', component: () => import(/* webpackChunkName: "about" */ '../views/EventPage.vue'), meta: {authUserPayment: true}},
    {path: '/event-page/:eid/pictureAdded', name: 'pictureAdded', component: () => import(/* webpackChunkName: "about" */ '../views/pictureAdded.vue'), meta: {authUserPayment: true}},
    {path: '/item/:id', name: 'Item', component: () => import(/* webpackChunkName: "about" */ '../views/Item.vue'), meta: {authUserPayment: true}},
]

export default routes
