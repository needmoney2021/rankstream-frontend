import {createRouter, createWebHistory} from 'vue-router'
import landings from './landings/landings'

const routes = [
    ...landings,
    {
        path: '/docs',
        name: 'Docs',
        component: () => import('../pages/docs/index.vue')
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('../pages/signup/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
