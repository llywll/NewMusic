import Vue from 'vue'
import Router from 'vue-router'
// import loginMain from './../App'
import LoginWindow from '../pages/components/LoginWindow'
import RegisterWindow from '../pages/components/RegisterWindow'

Vue.use(Router)
export default new Router({
    name: '#app',
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
            },{
                path:'/RegisterWindow',
                name:'RegisterWindow',
                component:RegisterWindow
            }
            ]
        }
    ]
})
