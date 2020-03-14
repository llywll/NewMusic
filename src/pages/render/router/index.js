import Vue from 'vue'
import Router from 'vue-router'

import Main from '../pages/MainPage'
import PageContent from '../pages/components/PageContent'
import AlbumPage from '../pages/components/AlbumPage'


import SearchResultsPage from '../pages/components/SearchResultsPage'

import NotFoundComponent from '../pages/NotFoundComponent'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location)
    .catch(err => err)
}
const router = new Router({
  name: '#app',
  mode: 'history',
  routes: [
    {
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
      },
      {
        path: '*', component: NotFoundComponent
      }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log("路由检测to：",to)
  console.log("路由检测from：",from)
  next()
})
export default router
