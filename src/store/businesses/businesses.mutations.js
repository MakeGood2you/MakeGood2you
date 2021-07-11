export default {
    addDetails: (state, businessDetails) => {
        state.businessDetails = businessDetails
    },
    isUserPay: (state, bool) => {
        state.isPay = bool
    },
    setImage: (state, photoURL) => {
        state.currentImageProfile = photoURL
    },
}
