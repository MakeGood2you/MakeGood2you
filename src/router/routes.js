// import VueRouter from 'vue-router'
import Login from '../views/auth/Register.vue'
import leads from "../views/leads";
const routes = [
    {path: '/registration', name: 'Registration', component: () => import('../views/auth/registration.vue'),
        meta: {authUserIsPayment: false},props: true }, ,
    {path: '/', name: 'Login', component: Login,
        meta: {authUserIsPayment: false}},
    {path: '/forgot', name: 'Forgot', component: () => import('../views/auth/forgot.vue'),
        meta: {authUserIsPayment: false}},

    {path: '/payment', name: 'Payment', component: () => import('../views/payment.vue'),
        meta: {authUserIsPayment: false}},
    {path: '/welcome', name: 'welcome', component: () => import('../views/welcome.vue'),
        meta: {authUserIsPayment: false}},


    {path: '/home', name: 'Home', component: () => import('../views/Home'),
        meta: {authUserIsPayment: true}},
    {path: '/add-business-details', name: 'addBusinessDetails', component: () => import('../components/business/AddBusinessDetails.vue'),
        meta: {authUserIsPayment: true}},
    {path: '/settings', name: 'Settings', component: () => import('../views/app/UserSetting'),
        meta: {authUserIsPayment: true}},
    {path: '/leads', name: 'leads',  component: () => import('../views/leads'),
        meta: {authUserIsPayment: true}},
    {path: '/help', name: 'Help',  component: () => import('../views/app/HelpAndSupport.vue'),
        meta: {authUserIsPayment: true}},

    {path: '/event-page/:eid', name: 'EventPage', component: () => import('../views/EventPage.vue'),
        meta: {authUserIsPayment: true}},
    {path: '/event-page/:eid/pictureAdded', name: 'pictureAdded', component: () => import('../views/pictureAdded.vue'),
        meta: {authUserIsPayment: true}},
    {path: '/event/:id', name: 'Event', component: () => import('../views/Event.vue'),
        meta: {authUserIsPayment: true}},
]

export default routes
