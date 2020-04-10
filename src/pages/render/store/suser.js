import httpV from './../../../util/ajax'
const suser = {
    state: {
        suser: {
            isLogin: false,
            info: {
                userName: "请登录",
                desc: "星海里的笙箫",
                sex: 'women',
                birthday: "1997/07/27",
                headImgLink: ''
            }
        },
        collectionSonglist: [
            // {
            //     lId: "0",
            //     lListname: "今时今日",
            //     lDesc: "该用户很懒，啥都没写",
            //     lCreator: "我",
            //     songs: []
            // }
        ],

        autoLogin: false
    },
    mutations: {
        setUser: (state, suser = {
            info: {
                userName: "请登录",
                desc: "星海里的笙箫",
                sex: 'women',
                birthday: "1997/07/27",
                headImgLink: ""
            }
        }) => {
            console.log(suser)
            state.suser = suser
        },
        destructionUser: (state) => {
            state.suser = {
                isLogin: false,
                info: {
                    userName: "请登录",
                    desc: "星海里的笙箫",
                    sex: 'women',
                    birthday: "1997/07/27",
                    headImgLink: ""
                }
            }
        },
        setCollectionSonglist: (state, list = {}) => {
            state.collectionSonglist = list
            console.log("suser:", state.collectionSonglist)
        },
        setAutoLogin: (state, val = false) => {
            state.autoLogin = val
        }
    },
    actions: {
        loginIn: (store, suser) => {
            store.commit('setUser', {
                isLogin: true,
                info: {
                    userName: suser.nName,
                    desc: suser.nDesc,
                    sex: suser.nSex,
                    birthday: suser.nBirthday,
                    headImgLink: suser.nHeadportraitUrl
                }
            })
        },
        changeCollectionSonglist: (store) => {
            httpV.get("http://localhost:9649/songList/getSongList")
                .then(res => {
                    console.log(res.data);
                    if (res.data.state == "success") {
                        store.commit('setCollectionSonglist', res.data.data[0])

                    }
                })
                .catch(err => console.log(err));
            // store.commit('setCollectionSonglist', list)
        },
        upSTSonglist: async (store, list) => {
            console.log(store)
            let tempList = store.state.collectionSonglist
            for (let i = 0; i < tempList.length; i++) {
                if (tempList[i].lId == list.lId) tempList[i].songs = list.songs
            }

            store.commit('setCollectionSonglist', tempList)
        }
    },
    getters: {
        suser(state) {
            return state.suser
        },
        collectionSonglist(state) {
            return state.suser
        }
    }
}
export default suser