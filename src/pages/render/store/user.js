import http from 'axios'
const state = {
    user: {
        info: {
            userName: "吃橘子的猫",
            desc: "星海里的笙箫",
            sex: 'women',
            sunday: "1997/07/27",
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
    },
    mutations: {
        setUser: (state, user) => state.user = user,
        destruction: (state) => state.user = {
            info: {
                userName: "吃橘子的猫",
                desc: "星海里的笙箫",
                sex: 'women',
                sunday: "1997/07/27",
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
        loginIn: (state, loginInfo) => {
            http.post(`http://localhost:9649`, {
                userName: loginInfo.userName,
                password: loginInfo.password
            }).then(res =>{
                console.log(res,state)
            }).catch(err => console.log(err))
        }
    },
}
export default state