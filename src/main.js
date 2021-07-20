import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import firebaseInstance from './middleware/firebase'
import notify from 'vue-notification'

import {Loading, Quasar} from 'quasar'

Vue.use(
    Quasar, {
    //   config: {
    //     loading: {Loading,}
    //   },
    //   plugins: {
    //     Loading,
    //   }
    })
Vue.config.productionTip = false
firebaseInstance.firebase.auth().onAuthStateChanged((user )=>{
  window.user=user;

  new Vue({
    router,
    notify,
    store,
    render: h => h(App)
  }).$mount('#app')
})

