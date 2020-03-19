
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
            {
                lId: "0",
                lListname: "今天有个龟儿子",
                lDesc: "该用户很懒，啥都没写",
                lCreator: "我"
            }
        ],
        autoLogin: false
    },
    mutations: {
        setUser: (state, suser = {
            info: {
                userName: "吃橘子的猫",
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
            store.commit('setCollectionSonglist', list)
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