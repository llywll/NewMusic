const state = {
    state: {
        count: 0,
        isThePlaybackPageAlreadyOpen: false,
        cycleState: "",
    },
    mutations: {
        chageRement: state => state.count += 1,
        closePlayPage: state => state.isThePlaybackPageAlreadyOpen = false,
        openPlayPage: state => state.isThePlaybackPageAlreadyOpen = true

    },
    getters:{}
}
export default state