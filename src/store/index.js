import Vue from 'vue'
import Vuex from 'vuex'
import events from './events'
import auth from './auth'
import app from './app'
import businesses from './businesses'

Vue.use(Vuex)

export default new Vuex.Store({
    strict:process.env.NODE_ENV !== 'production',
    modules: {
        events,
        auth,
        app,
        businesses
    }
})

