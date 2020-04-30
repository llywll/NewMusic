import http from 'axios'
const playing = {
    state: {
        playing: {},//正在播放歌曲信息
        pause: true,//是否播放
        lyricLine: 0,//歌词实时行
        playListIndex: -1, //播放列表的中此歌曲的索引位置
        errorType: -1, //错误码
        isRadio: {
            radioId: -1,
            isplay: false
        }
    },
    mutations: {
        chageplayingState: (state, playing) => {
            console.log(playing)
            if (playing !== null) {
                // if (playing.songMid == state.playing.songMid)
                //     console.log('已经在播放了')
                // else
                state.playing = playing
            } else state.playing = null
        },
        chageplayState: (state, playState = true) => state.pause = playState,//改变播放状态
        chagelyricLine: (state, line = 0) => state.lyricLine = line, //改变歌词实时行
        chagePlayListIndex: (state, index = 0) => state.playListIndex = index, //改变播放列表中正在播放的歌曲的索引
        chageErrorState: (state, errorType = -1) => state.errorType = errorType, //改变错误状态
        changeIsRadioState: (state, isRadioState = { //切换电台/普通播放模式
            radioId: -1,
            isplay: false
        }) => {
            if (isRadioState !== undefined && isRadioState !== null && isRadioState !== '') {
                state.isRadio = isRadioState
            }
        }
    },
    getters: {},
    actions: {
        chageplayingStateAsync: async (store, playing) => {
            console.log(playing)
            if (playing.p_ing !== undefined & playing.p_ing !== null) {
                if (playing.p_ing.songMid != store.state.playing.songMid) {
                    await http.get(`http://39.108.229.8:3200/getMusicVKey?songmid=${playing.p_ing.songMid}`)
                        .then(response => {
                            playing.p_ing.playLists = response.data.response.playLists
                            if (playing.p_ing.playLists[0].length - playing.p_ing.playLists[0].lastIndexOf('.com') <= 5)
                                store.commit('chageErrorState', 4)
                        }).catch(error => console.log(error))
                    //请求并解析歌词
                    await http.get(`http://39.108.229.8:3200/getLyric?songmid=${playing.p_ing.songMid}&isFormat=true`)
                        .then(res => {
                            let lyricArr = [];
                            for (let i = 0; i < res.data.response.lyric.lines.length; i++) {
                                lyricArr.push({
                                    time: parseInt(res.data.response.lyric.lines[i].time / 1000),
                                    text: res.data.response.lyric.lines[i].txt
                                });
                            }
                            if (lyricArr.length == 0) lyricArr.push({ time: 0, text: "该歌曲暂无歌词" })
                            playing.p_ing.lyric = lyricArr
                            console.log(playing)
                            store.commit('chagelyricLine')
                        })
                        .catch(err => console.log(err))
                }
                store.commit('chageplayingState', playing.p_ing)
                store.commit('chagePlayListIndex', playing.actIndex)
                store.commit('changeActivesindex', playing.actIndex)
            }
            else if (playing.p_ing === null) {
                console.log(playing)
                store.commit('chagelyricLine')
                store.commit('chageplayState', false)
                store.commit('chageplayingState', {})
                store.commit('chagePlayListIndex', -1)
                store.commit('changeActivesindex', -1)

            }

        },
        nextSongAsync: (store) => {
            if (store.state.isRadio.isplay) {
                let index = -1
                let t_list = ""
                console.log(store.state.playListIndex, store.rootState.playList.playList.length - 1)
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
                            console.log("请求新的电台数据", p_list)
                            store.commit('changeIsRadioState', {
                                radioId: store.state.isRadio.radioId,
                                isplay: true
                            })
                            store.commit("replacePlayList", p_list);
                            let tempList = p_list[actIndex];
                            store.dispatch("chageplayingStateAsync", {
                                p_ing: tempList,
                                actIndex: actIndex
                            });
                        })
                        .catch(err => console.log(err));
                } else {
                    t_list = store.rootState.playList.playList[store.state.playListIndex + 1]
                    index = store.state.playListIndex + 1
                }
                store.dispatch('chageplayingStateAsync', {
                    p_ing: t_list,
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
                    p_ing: t_list,
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


                    //标准歌词文件的解析方式
                    // .then(response => {
                    //     let lyricStr = response.data.response.lyric.split("\n");
                    //     let lyricArr = [];
                    //     if (!response.data.response.lyric.includes("[")) { lyricArr = lyricStr }
                    //     else {
                    //         for (let i = 0; i < lyricStr.length; i++) {
                    //             if (lyricStr[i].replace(/\s/g, '').length == 0) continue;
                    //             if (
                    //                 !lyricStr[i].includes("ti:") &&
                    //                 !lyricStr[i].includes("ar:") &&
                    //                 !lyricStr[i].includes("al:") &&
                    //                 !lyricStr[i].includes("by:") &&
                    //                 !lyricStr[i].includes("offset:")
                    //             ) {
                    //                 let regExp = lyricStr.length == 1 ? /\[(\d{2}):(\d{2}):(\d{2})\](.*)/g : /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/g;
                    //                 let result = regExp.exec(lyricStr[i]);
                    //                 if (result[4] === null) continue
                    //                 if (result[4] === "") continue

                    //                 let temp = parseInt(result[1] * 60) + parseInt(result[2])
                    //                 lyricArr.push({
                    //                     time: temp + "." + result[3],
                    //                     text: result[4]
                    //                 });
                    //             }

                    //         }

                    //     }
                    //     playing.lyric = lyricArr
                    //     store.commit('chagelyricLine')
                    // }).catch(error => console.log(error))