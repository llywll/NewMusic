
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
            console.log(state.collectionSonglist)
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
        changeCollectionSonglist: (store, list) => {
            if (list !== null && list != undefined && list !== "") {
                let ctr = store.state.collectionSonglist !== undefined &&
                    store.state.collectionSonglist !== null &&
                    store.state.collectionSonglist !== "" ?
                    store.state.collectionSonglist : []
                for (let i = 0; i < Object.keys(ctr).length; i++) {
                    if (list.lId === ctr[i].lId) {
                        console.log("已存在，请勿重复添加")
                        return;
                    }
                }
                ctr = [...ctr, list]
                store.commit('setCollectionSonglist', ctr)
            }
            // store.commit('setCollectionSonglist', list)
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