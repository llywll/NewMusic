import http from 'axios'
const playing = {
    state: {
        playing: {},
        pause: true,
        lyricLine: 0,
        playListIndex: -1,
        errorType: -1
    },
    mutations: {
        chageplayingState: (state, playing) => {
            if (playing.songMid == state.playing.songMid)
                console.log('已经在播放了')
            else
                state.playing = playing
        },
        chageplayState: (state, platState = true) => state.pause = platState,
        chagelyricLine: (state, line = 0) => state.lyricLine = line,
        chagePlayListIndex: (state, index = 0) => {
            state.playListIndex = index
        },
        chageErrorState: (state, errorType = -1) => state.errorType = errorType,

    },
    getters: {},
    actions: {
        chageplayingStateAsync: async (store, playingObj) => {
            let playing = playingObj.tempList
            let actIndex = playingObj.actIndex
            if (playing.songMid != store.state.playing.songMid) {
                await http.get('http://39.108.229.8:3200/getMusicVKey?songmid=' + playing.songMid)
                    .then(response => {
                        playing.playLists = response.data.response.playLists
                        if (playing.playLists[0].length - playing.playLists[0].lastIndexOf('.com') <= 5)
                            store.commit('chageErrorState', 4)
                    }).catch(error => console.log(error))
                await http.get('http://39.108.229.8:3200/getLyric?songmid=' + playing.songMid)
                    .then(response => {
                        let lyricStr = response.data.response.lyric.split("\n");
                        let lyricArr = [];
                        if (!response.data.response.lyric.includes("[")) { lyricArr = lyricStr }
                        else {
                            for (let i = 0; i < lyricStr.length; i++) {
                                if (lyricStr[i].replace(/\s/g, '').length == 0) continue;
                                if (
                                    !lyricStr[i].includes("ti:") &&
                                    !lyricStr[i].includes("ar:") &&
                                    !lyricStr[i].includes("al:") &&
                                    !lyricStr[i].includes("by:") &&
                                    !lyricStr[i].includes("offset:")
                                ) {
                                    let regExp = lyricStr.length == 1 ? /\[(\d{2}):(\d{2}):(\d{2})\](.*)/g : /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/g;
                                    let result = regExp.exec(lyricStr[i]);
                                    if (result[4] === null) continue
                                    if (result[4] === "") continue

                                    let temp = parseInt(result[1] * 60) + parseInt(result[2])
                                    lyricArr.push({
                                        time: temp + "." + result[3],
                                        text: result[4]
                                    });
                                }

                            }

                        }
                        playing.lyric = lyricArr
                        store.commit('chagelyricLine')
                    }).catch(error => console.log(error))
            }
            store.commit('chageplayingState', playing)
            store.commit('chagePlayListIndex', actIndex)
            store.commit('changeActivesindex', actIndex)
        },
        nextSongAsync: (store) => {
            let index = -1
            let t_list = ""
            if (store.state.playListIndex == Object.keys(store.rootState.playList.playList).length - 1) {
                t_list = store.rootState.playList.playList[0]
                index = 0
            } else {
                t_list = store.rootState.playList.playList[store.state.playListIndex + 1]
                index = store.state.playListIndex + 1
            }
            store.dispatch('chageplayingStateAsync', {
                tempList: t_list,
                actIndex: index
            })

        },
        lastSongAsync: async (store) => {
            let index = 0
            if (store.state.playListIndex == 0) {
                index = Object.keys(store.rootState.playList.playList).length - 1
            } else {
                index = store.state.playListIndex - 1
            }
            store.dispatch('chageplayingStateAsync', {
                tempList: store.rootState.playList.playList[index],
                actIndex: index
            })
        }
    }
}
export default playing