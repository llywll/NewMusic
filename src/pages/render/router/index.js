import Vue from 'vue'

import Router from 'vue-router'

import Main from '../pages/MainPage'

import PageContent from '../pages/components/PageContent'

import SongSheetPage from '../pages/components/SongSheetPage'

import AlbumPage from '../pages/components/AlbumPage'

import songlistPage from '../pages/components/SongListPage'

import SearchResultsPage from '../pages/components/SearchResultsPage'

import playHistoryPage from './../pages/components/PlayHistoryPage'

import TopLists from './../pages/components/TopLists'

import RadioLists from './../pages/components/RadioLists'

import LocalFilePage from './../pages/components/LocalFilePage'

import DownloadMusicPage from './../pages/components/DownloadMusicPage'

import SongSquarePage from './../pages/components/SongSquarePage'

import SingerInfoPage from './../pages/components/SingerInfoPage'

import NotFoundComponent from '../pages/NotFoundComponent'

import store from './../store/store'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location)
        .catch(err => err)
}
const router = new Router({
    name: '#app',
    // mode: 'history',
    routes: [{
        path: '/',
        component: Main,
        children: [{
            path: '/',
            redirect: '/PageContent'
        },
        {
            path: '/PageContent',
            name: 'PageContent',
            component: PageContent,
            meta: {
                isUseCache: false,
                keepAlive: true
            }
        }, {
            path: '/SonglistPage/:list_id',
            name: 'SonglistPage',
            component: songlistPage,
            props: { default: true, sidebar: false }
        },
        {
            path: '/SongSheetPage/:sheet_id',
            name: 'SongSheetPage',
            component: SongSheetPage,
            props: { default: true, sidebar: false }
        },
        {
            path: '/AlbumPage/:album_id',
            name: 'AlbumPage',
            component: AlbumPage,
            props: { default: true, sidebar: false }
        }, {
            path: '/searchResultsPage',
            name: 'SearchResultsPage',
            component: SearchResultsPage,
            props: { default: true, sidebar: false }
        }, {
            path: '/playHistoryPage',
            name: 'playHistoryPage',
            component: playHistoryPage,
        },
        {
            path: '/TopLists',
            name: 'TopLists',
            component: TopLists
        },
        {
            path: '/RadioLists',
            name: 'RadioLists',
            component: RadioLists
        },
        {
            path: 'LocalFilePage',
            name: 'LocalFilePage',
            component: LocalFilePage
        },
        {
            path: 'DownloadMusicPage',
            name: 'DownloadMusicPage',
            component: DownloadMusicPage
        },
        {
            path: 'SongSquarePage',
            name: 'SongSquarePage',
            component: SongSquarePage
        },
        
        {
            path: 'SingerInfoPage/:singerId',
            name: 'SingerInfoPage',
            component: SingerInfoPage,
            props: { default: true, sidebar: false }
        },
        {
            path: '*',
            component: NotFoundComponent
        }
        ]
    }]
})
router.beforeEach((to, from, next) => {
    console.log("路由检测to：", to)
    if (to.name === "SonglistPage" &&
        to.params.list_id !== null &&
        to.params.list_id !== undefined &&
        to.params.list_id !== "" &&
        to.params.list_id !== from.params.list_id) {
        console.log("???")
        store.commit("changeSongId", to.params.list_id)
    }
    console.log("路由检测from：", from)
    next()
})
export default router