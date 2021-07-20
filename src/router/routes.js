// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/auth/Register.vue'
// import welcome from "../views/welcome";
import leads from "../views/leads";
const routes = [
    {path: '/registration', name: 'Registration', component: () => import('../views/auth/registration.vue'),
        meta: {authUserIsPayment: false}}, ,
    {path: '/', name: 'Login', component: Register,
        meta: {authUserIsPayment: false}},
    {path: '/forgot', name: 'Forgot', component: () => import('../views/forgot.vue'),
        meta: {authUserIsPayment: false}},

    {path: '/payment', name: 'Payment', component: () => import('../views/payment.vue'),
        meta: {authUserIsPayment: false}},
    {path: '/welcome', name: 'welcome', component: () => import('../views/welcome.vue'),},

    {path: '/home', name: 'Home', component: Home,
        meta: {authUserIsPayment: true}},
    {path: '/add-business-details', name: 'addBusinessDetails', component: () => import('../components/business/AddBusinessDetails.vue'),
        meta: {authUserIsPayment: true}},
    {path: '/settings', name: 'Settings', component: () => import('../views/app/UserSetting'),
        meta: {authUserIsPayment: true}},
    {path: '/leads', name: 'leads', component: leads,
        meta: {authUserPayment: true}},
    {path: '/help', name: 'Help',  component: () => import('../views/app/HelpAndSupport.vue'),
        meta: {authUserPayment: true}},

    {path: '/event-page/:eid', name: 'EventPage', component: () => import('../views/EventPage.vue'),
        meta: {authUserIsPayment: true}},
    {path: '/event-page/:eid/pictureAdded', name: 'pictureAdded', component: () => import('../views/pictureAdded.vue'),
        meta: {authUserIsPayment: true}},
    {path: '/event/:id', name: 'Event', component: () => import('../views/Event.vue'),
        meta: {authUserIsPayment: true}},
]

export default routes
