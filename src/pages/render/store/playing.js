import http from 'axios'
const playing = {
    state: {
        playing: {},
        pause: true,
        lyricLine: 0,
        playListIndex: -1,
        errorType: -1,
        isRadio: {
            radioId: -1,
            isplay: false
        }
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
        changeIsRadioState: (state, isRadioState = {
            radioId: -1,
            isplay: false
        }) =>{
           if(isRadioState!==undefined&&isRadioState!==null&&isRadioState!==''){
            console.log("有人改动了我",isRadioState)
            state.isRadio = isRadioState
           } 
        } 
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
            if (store.state.isRadio.isplay) {
                let index = -1
                let t_list = ""
                console.log(store.state.playListIndex,store.rootState.playList.playList.length -1)
                if (store.state.playListIndex == Object.keys(store.rootState.playList.playList).length - 1) {
                    http.get(`http://39.108.229.8:3300/radio?id=${store.state.isRadio.radioId}&raw=1`)
                        .then(res => {
                            console.log(res.data.songlist.data.tracks);
                            let p_list = [];
                            let actIndex = 0;
                            for (let i = 0; i < res.data.songlist.data.tracks.length; i++) {
                                p_list.push({
                                    title: res.data.songlist.data.tracks[i].title,
                                    singer: res.data.songlist.data.tracks[i].singer[0].title,
                                    songMid: res.data.songlist.data.tracks[i].mid,
                                    interval: res.data.songlist.data.tracks[i].interval,
                                    albumMid: res.data.songlist.data.tracks[i].album.id
                                });
                            }
                            console.log("请求新的电台数据",p_list)
                            store.commit('changeIsRadioState', {
                                radioId: store.state.isRadio.radioId,
                                isplay: true
                              })
                            store.commit("replacePlayList", p_list);
                            let tempList = p_list[actIndex];
                            store.dispatch("chageplayingStateAsync", {
                                tempList: tempList,
                                actIndex: actIndex
                            });
                        })
                        .catch(err => console.log(err));
                } else {
                    t_list = store.rootState.playList.playList[store.state.playListIndex + 1]
                    index = store.state.playListIndex + 1
                }
                store.dispatch('chageplayingStateAsync', {
                    tempList: t_list,
                    actIndex: index
                })
            } else {
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

            }

        },
        lastSongAsync: async (store) => {
            if (!store.state.isRadio.isplay) {
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
}
export default playing