import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import firebaseInstance from './middleware/firebase'
import notify from 'vue-notification'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);

// import langHeb from 'quasar/lang/he'
import {
  Quasar,
  Notify
} from 'quasar'
Vue.use(
    Quasar, {
      // lang: langHeb

        config: {
            notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */}
        },
      plugins: {
        Notify
      }
    })
Vue.config.productionTip = false
firebaseInstance.firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        const isUserPay = await store.dispatch('businesses/isUserPayValidate')
        window.user = user;
        console.log(isUserPay, ' main js is uuser pay ? ')
    }
    await new Vue({
        router,
        notify,
        store,
        render: h => h(App)
    }).$mount('#app')
})

