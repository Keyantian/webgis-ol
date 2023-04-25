import VueRouter from 'vue-router'

import initMap from '../components/maps/map.vue'
import login from '../components/Login'

export default new VueRouter({
    routes: [
        {
            path:'/',
            redirect:'/login'
        },
        {
            name: 'map',
            path: '/map',
            component: initMap
        },
        {
            name:'login',
            path:'/login',
            component:login,
        }
    ]
})