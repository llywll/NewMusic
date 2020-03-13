
import http from 'axios'
const playing = {
    state: {
        playing: {},
        pause: true,
        lyricLine: 0
    },
    mutations: {
        chageplayingState: (state, playing) => {
            if (playing.songMid == state.playing.songMid)
                console.log('已经在播放了')
            else
                state.playing = playing
        },
        chageplayState: (state, platState = true) => state.pause = platState,
        chagelyricLine: (state, line = 0) => state.lyricLine = line
    },
    getters: {},
    actions: {
        chageplayingStateAsync: async (store, playing) => {
            if (playing.songMid != store.state.playing.songMid) {
                await http.get('http://localhost:3200/getMusicVKey?songmid=' + playing.songMid)
                    .then(response => {
                        playing.playLists = response.data.response.playLists
                    }).catch(error => console.log(error))
                await http.get('http://localhost:3200/getLyric?songmid=' + playing.songMid)
                    .then(response => {
                        let lyricStr = response.data.response.lyric.split("\n");
                        let lyricArr = [];
                        for (let i = 0; i < lyricStr.length; i++) {
                            if (
                                !lyricStr[i].includes("ti:") &&
                                !lyricStr[i].includes("ar:") &&
                                !lyricStr[i].includes("al:") &&
                                !lyricStr[i].includes("by:") &&
                                !lyricStr[i].includes("offset:")
                            ) {
                                let regExp = "";
                                if (lyricStr.length == 1)
                                    regExp = /\[(\d{2}):(\d{2}):(\d{2})\](.*)/g;
                                else regExp = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/g;

                                let result = regExp.exec(lyricStr[i]);
                                if (result[4] === "") {
                                    continue
                                }
                                let temp = parseInt(result[1] * 60) + parseInt(result[2])
                                lyricArr.push({
                                    time: temp + "." + result[3],
                                    text: result[4]
                                });
                            }

                            playing.lyric = lyricArr
                            store.commit('chagelyricLine')
                        }
                    }).catch(error => console.log(error))
                store.commit('chageplayingState', playing)
            }
            else store.commit('chageplayingState', playing)
        },
        nextSongAsync: (store) => {
            let zero = 0
            let t_list = ""
            if (store.state.playing.playListIndex == Object.keys(store.rootState.playList.playList).length - 1) {
                t_list = store.rootState.playList.playList[zero]
                t_list.playListIndex = zero
            } else {
                t_list = store.rootState.playList.playList[store.state.playing.playListIndex + 1]
                t_list.playListIndex = store.state.playing.playListIndex + 1
            }
            console.log(t_list)
            store.dispatch('chageplayingStateAsync', t_list)

        },
        lastSongAsync: (store) => {
            let zero = 0
            let t_list = ""
            if (store.state.playing.playListIndex == zero) {
                t_list = store.rootState.playList.playList[Object.keys(store.rootState.playList).length - 1]
                t_list.playListIndex = Object.keys(store.rootState.playList.playList).length - 1
            } else {
                t_list = store.rootState.playList.playList[store.state.playing.playListIndex - 1]
                t_list.playListIndex = store.state.playing.playListIndex - 1

            }

            console.log(t_list)
            store.dispatch('chageplayingStateAsync', t_list)
        }
    }
}
export default playing