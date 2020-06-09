import Vue from 'vue'
import Router from 'vue-router'

import NewWindow from '../pages/components/NewWindow'

Vue.use(Router)
export default new Router({
    name: '#app',
    mode: 'history',
    routes: [
        {
            path: '/',
            children: [{
                path: '/',
                redirect: '/NewWindow'
            },
            {
                path: '/NewWindow',
                name: 'NewWindow',
                component: NewWindow
            }
            ]
        }
    ]
})
