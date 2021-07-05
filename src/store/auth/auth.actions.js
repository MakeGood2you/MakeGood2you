import 'firebase/storage';


export default {


    setUser: async ({commit, dispatch}, user) => {

        debugger
        if (user) {
            const newUser = dispatch('createUserObj', user)
            commit("setUser", newUser)
        } else commit("setUser", null)

    },
    createUserObj({commit}, user) {
        const obj = {}
        obj.uid = user.uid
        obj.email = user.email
        return obj
    }


}
