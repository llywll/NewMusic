import Vue from 'vue'
import Router from 'vue-router'

import LoginWindow from '../pages/components/LoginWindow'

Vue.use(Router)
export default new Router({
    name: '#app',
    mode: 'history',
    routes: [
        {
            path: '/',
            children: [{
                path: '/',
                redirect: '/LoginWindow'
            },
            {
                path: '/LoginWindow',
                name: 'LoginWindow',
                component: LoginWindow
            }
            ]
        }
    ]
})
