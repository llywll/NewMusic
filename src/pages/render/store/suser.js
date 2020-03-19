
const suser = {
    state: {
        suser: {
            info: {
                userName: "吃橘子的猫",
                desc: "星海里的笙箫",
                sex: 'women',
                birthday: "1997/07/27",
                headImgLink: "https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3869001843,1891590380&fm=85&app=63&f=GIF?w=121&h=75&s=C0071F74791477EFC6C688C3030060BB"
            },
            songlist: [
                {
                    name: "今天",
                    desc: "该用户很懒，啥都没写",
                    songs: [
                        {
                            title: "一个人",
                            mid: "",
                            singger: [{
                                title: "蔡依林"
                            }],
                            album: {
                                title: "特务j",
                                albumMid: ""
                            },
                            mv: {}
                        }
                    ]
                }

            ],
            collectionSong: [{
                name: "",
                albumId: "",
                source: "y.qq.com"
            }
            ]
        }

    },
    mutations: {
        setUser: (state, suser = {
            info: {
                userName: "吃橘子的猫",
                desc: "星海里的笙箫",
                sex: 'women',
                birthday: "1997/07/27",
                headImgLink: ""
            },
            songlist: [
                {
                    name: "今天",
                    desc: "该用户很懒，啥都没写",
                    songs: [
                        {
                            title: "一个人",
                            mid: "",
                            singger: [{
                                title: "蔡依林"
                            }],
                            album: {
                                title: "特务j",
                                albumMid: ""
                            },
                            mv: {}
                        }
                    ]
                }

            ],
            collectionSong: [{
                name: "",
                albumId: "",
                source: "y.qq.com"
            }
            ]
        }) => {
            console.log(suser)
            state.suser = suser
        },
        destruction: (state) => state.suser = {
            info: {
                userName: "吃橘子的猫",
                desc: "星海里的笙箫",
                sex: 'women',
                birthday: "1997/07/27",
                headImgLink: ""
            },
            songlist: [
                {
                    name: "今天",
                    desc: "该用户很懒，啥都没写",
                    songs: [
                        {
                            title: "一个人",
                            mid: "",
                            singger: [{
                                title: "蔡依林"
                            }],
                            album: {
                                title: "特务j",
                                albumMid: ""
                            },
                            mv: {}
                        }
                    ]
                }

            ],
            collectionSong: [{
                name: "",
                albumId: "",
                source: "y.qq.com"
            }
            ]
        }
    },
    actions: {
        loginIn: (store, suser) => {
           store.commit('setUser',{
               info:{
                userName: suser.nName,
                desc: suser.nDesc,
                sex: suser.nSex,
                birthday: suser.nBirthday,
                headImgLink: suser.nHeadportraitUrl
               }
           })
        }
    },
    getters: {
        suser(state) {
            return state.suser
        }
    }
}
export default suser