const playList = {
    state: {
        playList: [],
        playListIndex: -1
    },
    mutations: {
        addToPlayList: (state, list) => state.playList = [...list],
        replacePlayList: (state, list) => state.playList = list,
        removeItem: (state, index) => state.playList = state.playList.splice(index, 1),
        removeAllItem: (state) => state.playList = [],
        changeActivesindex: (state, index) => {
            state.playListIndex = index < Object.keys(state.playList).length && index >= 0 ? index : state.playListIndex
        },
        addToListHead: (state, item) => {
            state.playList.splice(0, 0, item)
        }
    },
    getters: {}
}
export default playList