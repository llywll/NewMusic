const state = {
    state: {
        count: 0,
        isThePlaybackPageAlreadyOpen: false,
        cycleState: "",
        loginWindowIsShow: false,
    },
    mutations: {
        chageRement: state => state.count += 1,
        closePlayPage: state => state.isThePlaybackPageAlreadyOpen = false,
        openPlayPage: state => state.isThePlaybackPageAlreadyOpen = true,
        changeLoginWindwState: (state, loginState = false) => state.loginWindowIsShow = loginState
    },
    getters: {}
}
export default state