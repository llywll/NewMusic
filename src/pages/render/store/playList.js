const playList = {
    state: {
        playList: []
    },
    mutations: {
        addToPlayList: (state, list) => state.playList = [...list],
        replacePlayList: (state, list) => state.playList = list,
        removeItem: (state, index) => state.playList = state.playList.splice(index,1),
        removeAllItem: (state) => state.playList = []
    },
    getters: {}
}
export default playList