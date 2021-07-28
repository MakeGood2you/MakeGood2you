import authApi from '../../middleware/firebase/auth';
import db from "../../middleware/firebase/database/api";
import {getUserFromLocalStorage} from "../../middleware/utils";

const path = (uid) => `users/${uid}/data/`
const user = getUserFromLocalStorage()

export default {
//genric login functions
    login: async ({state, commit, dispatch}, provider) => {
        //check login provider
        let firebaseAuthUser = await dispatch('checkProviderUser', provider)
        if (typeof firebaseAuthUser === 'string') {
            console.error('there is not chosen provider')
            return firebaseAuthUser
        }
        debugger
        if (typeof firebaseAuthUser !== 'object') return firebaseAuthUser
        // set the user in s`tate and localstorage
        commit('setUser', firebaseAuthUser)
        localStorage.setItem('user', JSON.stringify(firebaseAuthUser))

        //chek if is accept terms
        const uid = firebaseAuthUser.uid
        const isAcceptTerms = await dispatch('checkTerm', uid)
        console.log('is Accept Terms ?', isAcceptTerms)
        if (isAcceptTerms) {
            await dispatch('businesses/isUserPayValidate', uid, {root: true})
            commit('setUser', firebaseAuthUser)
            commit('setIsAcceptTerms', isAcceptTerms)
            localStorage.setItem('user', JSON.stringify(firebaseAuthUser))
        } else {
            commit('setPropertyTrueOrFalse', 'isFixed')
            // open pop up to confirm the terms
            // TODO : CHNACH THE VARIBLE IN COMPONNENT TO POINTER TO STATE
        }
    },

    register: async ({commit, state, dispatch}, options) => {
        if (!options.isAcceptTerms) return console.error('not accepted terms')
        const firebaseAuthUser = await authApi.registerWithPassAndEmail(options.user)
        debugger
        if (typeof firebaseAuthUser === "string")  return firebaseAuthUser
        if (!firebaseAuthUser) console.error('not user')
        commit('setUser', firebaseAuthUser)

        await dispatch('setTermService', firebaseAuthUser.uid)
        localStorage.setItem('user', JSON.stringify(firebaseAuthUser))
//      TODO: chek if user alredy exist and let give err to the user
        return firebaseAuthUser
    },

    firebaseLogout: async ({commit}) => {
        await authApi.signOut()
        localStorage.setItem('user', null)
        commit('setUser', null);
    },

    checkProviderUser: async ({commit, state}, provider) => {
        let firebaseAuthUser
        if (provider) {
            if (provider.email && provider.password) {
                firebaseAuthUser = await authApi
                    .loginWithMailAndPass(provider)
                // TODO: Check if user is already exist
                return firebaseAuthUser

            } else if (provider === 'facebook' || provider === 'google') {
                firebaseAuthUser = await authApi.loginProvider(provider)
                return firebaseAuthUser
            }
        }
        return false
    },

    checkTerm: async ({commit}, uid) => {
        const entity = `${path(uid)}/terms/confirmed`
        const term = await db.get(entity)
        return term
    },

    setTermService: async ({state, commit}, uid) => {
        uid = window.user.uid
        const entity = `${path(uid)}/terms/confirmed`
       // const  await db.get(entity, true)

        // commit('setPropertyTrueOrFalse', 'isFixed')
        console.log(entity)
        await db.set(entity, true)
    },
    updatePassword: async ({state, commit}, newPassword) => {
        const result = await authApi.updatePassword(newPassword)
        console.log(result)
        return result
    }

}
