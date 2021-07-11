import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios


export default {

    get: async (options) => {
        const result = await axios.get(`${options.api}/${options.entity}`)
        return result.data
    },

    post: async (options) => {
        const result = await axios.post(`${options.api}/${options.entity}`, options.data)
        return result.data
    },

    remove: async (options) => {
        const result = await axios.delete(`${options.api}/${options.entity}`)
        return result.data
    },

    update: async (options) => {
        const result = await axios.put(`${options.api}/${options.entity}`)
        return result.data
    },


}