export default {
    setUser: (state, user) => {
        state.user = user
    },

    setPropertyTrueOrFalse: (state, name) => {
        state[name] = !state[name]
    },

    isUserExist: (state, bol) => {
        state.isUserExist = bol
    },
    setIsAcceptTerms: (state, bol) => {
        state.isAcceptTerms = bol
    },
    setIsUserExist: (state, bol) => {
        state.isUserExist = bol
    }
}
